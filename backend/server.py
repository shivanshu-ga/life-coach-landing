from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

# Import models and services
from models.contact import ContactSubmission, ContactCreate
from services.email_service import email_service


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks


# Contact Form Endpoints
@api_router.post("/contact", response_model=ContactSubmission)
async def create_contact_submission(contact: ContactCreate):
    """Create a new contact form submission"""
    try:
        # Create contact submission object
        submission = ContactSubmission(**contact.model_dump())
        
        # Store in database
        doc = submission.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.contact_submissions.insert_one(doc)
        
        # Send email notifications (async, non-blocking)
        try:
            # Send notification to coach
            email_service.send_contact_notification(
                name=contact.name,
                email=contact.email,
                phone=contact.phone,
                message=contact.message
            )
            
            # Send thank you email to user
            email_service.send_thank_you_email(
                name=contact.name,
                email=contact.email
            )
        except Exception as e:
            logging.error(f"Error sending emails: {str(e)}")
            # Don't fail the request if email fails
        
        return submission
        
    except Exception as e:
        logging.error(f"Error creating contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")


@api_router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions(limit: int = 100, status: str = None):
    """Get all contact form submissions"""
    try:
        query = {}
        if status:
            query["status"] = status
            
        submissions = await db.contact_submissions.find(query, {"_id": 0}).sort("created_at", -1).limit(limit).to_list(limit)
        
        # Convert ISO strings back to datetime
        for sub in submissions:
            if isinstance(sub.get('created_at'), str):
                sub['created_at'] = datetime.fromisoformat(sub['created_at'])
        
        return submissions
        
    except Exception as e:
        logging.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submissions")


@api_router.get("/contact/{submission_id}", response_model=ContactSubmission)
async def get_contact_submission(submission_id: str):
    """Get a specific contact submission by ID"""
    try:
        submission = await db.contact_submissions.find_one({"id": submission_id}, {"_id": 0})
        if not submission:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        
        if isinstance(submission.get('created_at'), str):
            submission['created_at'] = datetime.fromisoformat(submission['created_at'])
            
        return ContactSubmission(**submission)
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error fetching contact submission: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contact submission")


@api_router.patch("/contact/{submission_id}/status")
async def update_contact_status(submission_id: str, status: str):
    """Update the status of a contact submission"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Contact submission not found")
            
        return {"message": "Status updated successfully", "status": status}
        
    except HTTPException:
        raise
    except Exception as e:
        logging.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update contact status")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()