from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional
import uuid


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    status: str = "new"  # new, contacted, closed
    
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+91 98765 43210",
                "message": "I'm interested in learning more about overthinking coaching."
            }
        }


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str
