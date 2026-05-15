# Life Coach Landing Page - Product Requirements Document

## Original Problem Statement
Build a landing page for life coach Shivanshu Goel similar to https://lp.drysr.in/yogendrasingh/, focusing on "Overthinking to Thinking Right" coaching for people aged 18-30.

## Core Requirements
- **Service Focus**: Overthinking stop / Thinking right coaching
- **Target Audience**: People up to age 30 (18-30 years)
- **Design Style**: Professional, calming, conversion-optimized landing page
- **Key Sections**: Hero, About, Services, Testimonials, FAQ, Contact Form

## User Personas
1. **Young Professional (22-28)**: Career-focused individual struggling with decision paralysis and overthinking
2. **College Graduate (18-24)**: Recent graduate facing uncertainty and mental chaos about future
3. **Entrepreneur (25-30)**: Self-starter dealing with analysis paralysis and stress

## Tech Stack
- **Frontend**: React, Tailwind CSS, Shadcn UI components
- **Styling**: Emerald/Teal color scheme (mental wellness theme)
- **Images**: User-provided photos + curated stock images

## What's Been Implemented (December 6, 2025)

### ✅ Completed Features - Initial Release
1. **Header/Navigation**
   - Fixed header with smooth scroll navigation
   - Mobile-responsive hamburger menu
   - Clear CTA button ("Get Started")
   - Added "Book" menu item

2. **Hero Section**
   - Compelling headline: "Stop Overthinking. Start Living."
   - Coach's professional photo from river setting
   - Calendar booking CTA button with modal
   - Social proof badges (500+ Lives Changed, 4.9/5 Rating)
   - Certification badge overlay on image

3. **Stats Section**
   - 4 key metrics: Lives Transformed, Success Rate, Years Experience, Rating
   - Dark background for contrast

4. **About Section**
   - "Meet Your Coach" with personal introduction
   - 4-image gallery grid showing coach in various settings
   - Certified Expert and Proven Results badges
   - Personal story and methodology explanation

5. **Book Section** ⭐ NEW
   - "Quiet the Chaos" - Amazon Bestseller showcase
   - Amazon Bestseller badge with rotation effect
   - Book title, subtitle, and description
   - 4 purchase buttons with external links:
     - Buy on Amazon (amber button)
     - Buy on Flipkart (blue button)
     - Google Store (green button)
     - Google eBook (teal button)
   - All links open in new tab with proper icons

6. **Services Section**
   - 5 coaching programs with distinct cards:
     - Overthinking Reset (emerald)
     - Strategic Thinking (teal)
     - Mental Resilience (cyan)
     - Self-Awareness Journey (amber)
     - Time Mastery (emerald)
   - Each card has icon, description, and 3 feature bullets
   - Hover effects with scale and border color changes

7. **Testimonials Section**
   - 3 testimonial cards on dark background
   - 5-star ratings, client quotes, names, and job titles
   - Avatar initials with gradient backgrounds

8. **FAQ Section**
   - Shadcn Accordion component with 6 questions
   - Smooth expand/collapse animations
   - Covers: program structure, results timeline, unique approach, coaching vs therapy, satisfaction guarantee, package details

9. **Contact/CTA Section**
   - Full gradient background (emerald to cyan)
   - Contact information with updated phone: **+91 72988 88880**
   - Lead capture form (name, email, phone, message)
   - Dual submit buttons: "Submit Inquiry" + "Book Calendar"
   - Form validation and toast notifications
   - "100% confidential" trust message

10. **Calendar Booking System** ⭐ NEW
    - Modal popup with emerald gradient header
    - Calendar icon and clear messaging
    - Two action buttons:
      - WhatsApp to Book (green) - Opens WhatsApp with pre-filled message
      - Call Now (emerald) - Direct phone call
    - Contact info displayed: Phone & Email
    - Smooth open/close animations
    - Backdrop blur effect

11. **WhatsApp Click-to-Chat Button** ⭐ NEW
    - Floating button fixed at bottom-right
    - Green WhatsApp brand color
    - Animated bounce effect to grab attention
    - Opens WhatsApp with pre-filled message
    - Always visible while scrolling
    - Message: "Hi Shivanshu, I would like to know more about your coaching programs"

12. **Footer**
    - Brand info, quick links, contact details
    - Updated phone number: +91 72988 88880
    - Copyright notice
    - Professional closing message

### Design Elements Applied
- ✅ Emerald/teal color palette (mental wellness theme)
- ✅ No purple/pink gradients (following guidelines)
- ✅ Proper spacing and whitespace
- ✅ Lucide React icons (no emoji icons)
- ✅ Shadcn UI components for consistency
- ✅ Smooth scroll behavior
- ✅ Hover animations and transitions
- ✅ Mobile-responsive design
- ✅ Professional typography

### Image Assets
- Coach hero photo (river/nature setting)
- 4 additional coach photos for About section gallery
- All HEIC files converted to JPEG for web compatibility

### Contact Information
- **Phone/WhatsApp**: +91 72988 88880
- **Email**: lifecs.in@gmail.com

### Book Links
- **Amazon**: https://www.amazon.in/s?k=Quiet+the+Chaos+Shivanshu+Goel
- **Flipkart**: https://www.flipkart.com/quiet-chaos-understanding-empowering-women-dealing-overthinking/p/itm474d2082927d1
- **Google Store**: https://tr.ee/X-jeM87Umb
- **Google eBook**: https://tr.ee/9Iz5nDGoY0

## Prioritized Backlog

### P0 Features (Critical - Not Yet Built)
- Backend API for form submissions
- Email notification system
- Contact form data storage in MongoDB

### P1 Features (High Priority)
- ~~Calendar booking integration~~ ✅ COMPLETED (WhatsApp/Call booking modal)
- ~~WhatsApp click-to-chat button~~ ✅ COMPLETED (Floating button)
- Google Analytics tracking
- SEO optimization (meta tags, structured data)
- Real calendar integration (Cal.com or Calendly embed)

### P2 Features (Nice to Have)
- Blog section for mental wellness tips
- Video testimonials
- Live chat widget
- Social media feed integration
- Downloadable resources/lead magnets

## Next Action Items
1. ✅ Phone number updated to +91 72988 88880
2. ✅ Calendar booking modal added (WhatsApp + Call options)
3. ✅ WhatsApp floating button implemented
4. ✅ Book section added with "Quiet the Chaos" Amazon bestseller
5. ✅ Purchase links added (Amazon, Flipkart, Google Store x2)
6. Consider backend development for form handling and email notifications
7. Add real calendar embed (Cal.com/Calendly) for direct booking
8. Implement analytics tracking
9. Optimize for SEO with meta tags

## Notes
- All content is currently using placeholder/mock data
- Contact information needs to be updated with real details
- Form submissions show toast notification but don't persist data yet
- All images are stored in `/app/frontend/public/images/`
