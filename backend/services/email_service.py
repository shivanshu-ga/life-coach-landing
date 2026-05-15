import os
import logging
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content

logger = logging.getLogger(__name__)


class EmailService:
    def __init__(self):
        self.api_key = os.environ.get('SENDGRID_API_KEY')
        self.from_email = os.environ.get('FROM_EMAIL', 'noreply@mindclarity.coach')
        self.to_email = os.environ.get('NOTIFICATION_EMAIL', 'lifecs.in@gmail.com')
        
    def send_contact_notification(self, name: str, email: str, phone: str, message: str) -> bool:
        """Send email notification when a new contact form is submitted"""
        
        if not self.api_key or self.api_key == 'your_sendgrid_api_key_here':
            logger.warning("SendGrid API key not configured. Email notification skipped.")
            logger.info(f"Would have sent email for: {name} ({email})")
            return False
            
        try:
            # Email to coach
            coach_message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(self.to_email),
                subject=f'New Contact Form Submission from {name}',
                html_content=f'''
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <h2 style="color: #059669; border-bottom: 3px solid #059669; padding-bottom: 10px;">
                                New Contact Form Submission
                            </h2>
                            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>Name:</strong> {name}</p>
                                <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                                <p><strong>Phone:</strong> <a href="tel:{phone}">{phone}</a></p>
                                <p><strong>Message:</strong></p>
                                <p style="background-color: white; padding: 15px; border-left: 4px solid #059669; margin: 10px 0;">
                                    {message}
                                </p>
                            </div>
                            <div style="margin-top: 30px; padding: 15px; background-color: #e0f2fe; border-radius: 8px;">
                                <p style="margin: 0; color: #0369a1;">
                                    <strong>Quick Actions:</strong><br>
                                    📧 <a href="mailto:{email}">Reply via Email</a><br>
                                    📞 <a href="tel:{phone}">Call Now</a><br>
                                    💬 <a href="https://wa.me/{phone.replace('+', '').replace(' ', '')}">WhatsApp</a>
                                </p>
                            </div>
                            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 12px; text-align: center;">
                                This is an automated notification from your Life Coaching website.<br>
                                Respond promptly to convert this lead into a client!
                            </p>
                        </div>
                    </body>
                </html>
                '''
            )
            
            # Send email
            sg = SendGridAPIClient(self.api_key)
            response = sg.send(coach_message)
            
            if response.status_code in [200, 201, 202]:
                logger.info(f"Email notification sent successfully for {name}")
                return True
            else:
                logger.error(f"Failed to send email. Status code: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending email notification: {str(e)}")
            return False
    
    def send_thank_you_email(self, name: str, email: str) -> bool:
        """Send thank you email to the person who submitted the form"""
        
        if not self.api_key or self.api_key == 'your_sendgrid_api_key_here':
            logger.warning("SendGrid API key not configured. Thank you email skipped.")
            return False
            
        try:
            thank_you_message = Mail(
                from_email=Email(self.from_email),
                to_emails=To(email),
                subject='Thank You for Reaching Out - Shivanshu Goel',
                html_content=f'''
                <html>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #059669 0%, #14b8a6 100%); border-radius: 8px 8px 0 0;">
                                <h1 style="color: white; margin: 0;">Thank You, {name}!</h1>
                            </div>
                            <div style="padding: 30px; background-color: #f9fafb; border-radius: 0 0 8px 8px;">
                                <p style="font-size: 16px;">
                                    Thank you for reaching out! I'm excited to help you on your journey from overthinking to clarity.
                                </p>
                                <p style="font-size: 16px;">
                                    I've received your message and will get back to you within 24 hours. 
                                </p>
                                <div style="background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0891b2;">
                                    <p style="margin: 0; color: #0369a1;">
                                        <strong>In the meantime:</strong><br><br>
                                        📚 Check out my Amazon bestseller <strong>"Quiet the Chaos"</strong><br>
                                        💬 Feel free to WhatsApp me at <a href="https://wa.me/917298888880">+91 72988 88880</a><br>
                                        📅 Or book a call directly through our calendar
                                    </p>
                                </div>
                                <p style="font-size: 16px;">
                                    Looking forward to connecting with you!
                                </p>
                                <p style="font-size: 16px; margin-top: 30px;">
                                    Warm regards,<br>
                                    <strong style="color: #059669; font-size: 18px;">Shivanshu Goel</strong><br>
                                    <span style="color: #6b7280;">Life Coach | Author | Mind Transformation Expert</span>
                                </p>
                            </div>
                            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
                                <p>📞 +91 72988 88880 | 📧 lifecs.in@gmail.com</p>
                            </div>
                        </div>
                    </body>
                </html>
                '''
            )
            
            sg = SendGridAPIClient(self.api_key)
            response = sg.send(thank_you_message)
            
            if response.status_code in [200, 201, 202]:
                logger.info(f"Thank you email sent to {email}")
                return True
            else:
                logger.error(f"Failed to send thank you email. Status code: {response.status_code}")
                return False
                
        except Exception as e:
            logger.error(f"Error sending thank you email: {str(e)}")
            return False


# Singleton instance
email_service = EmailService()
