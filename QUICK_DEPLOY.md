# ⚡ Quick Deploy Guide - 5 Minutes Setup

## 🎯 Goal
Get your website live on your custom domain in 5 minutes!

---

## 📋 Prerequisites
- [ ] Your custom domain (from GoDaddy, Namecheap, etc.)
- [ ] GitHub account
- [ ] The codebase zip file

---

## 🚀 Step-by-Step (5 Minutes)

### 1️⃣ Push Code to GitHub (1 min)

```bash
# Extract the zip file
unzip life-coach-landing-complete.zip
cd life-coach-landing-complete

# Initialize git and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/life-coach-landing.git
git push -u origin main
```

### 2️⃣ Deploy Frontend to Netlify (2 min)

1. Go to [netlify.com](https://netlify.com) → Sign up with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your GitHub repo
4. Configure:
   - Base directory: `frontend`
   - Build command: `yarn build`
   - Publish directory: `frontend/build`
5. Click "Deploy site"

**Add Environment Variables:**
- Site settings → Environment variables → Add:
```
REACT_APP_BACKEND_URL = https://your-app.railway.app (add after step 3)
REACT_APP_CALCOM_USERNAME = shivanshu
REACT_APP_GA_TRACKING_ID = G-XXXXXXXXXX (add tomorrow)
```

### 3️⃣ Deploy Backend to Railway (2 min)

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo → Select `backend` folder
4. **Add Environment Variables:**
   - Click "Variables" tab:
   ```
   MONGO_URL = mongodb+srv://... (get from MongoDB Atlas)
   DB_NAME = emergentdb
   CORS_ORIGINS = https://your-site.netlify.app
   SENDGRID_API_KEY = SG.xxx (add tomorrow)
   FROM_EMAIL = noreply@mindclarity.coach
   NOTIFICATION_EMAIL = shivanshu.ga@gmail.com
   ```
5. Copy Railway URL (e.g., `https://your-app.railway.app`)
6. **Update Netlify:** Add Railway URL to `REACT_APP_BACKEND_URL`

### 4️⃣ Setup MongoDB Atlas (FREE) - Optional but Recommended

**Quick Setup:**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Sign up → Create free cluster (M0)
3. Create user: `admin` / `password123` (change later!)
4. Network: Add `0.0.0.0/0`
5. Get connection string → Add to Railway `MONGO_URL`

**Or use local MongoDB for testing:**
```
MONGO_URL = mongodb://localhost:27017
```

### 5️⃣ Connect Your Domain to Netlify (1 min)

1. In Netlify: Domain settings → Add custom domain
2. Enter your domain: `yourdomain.com`
3. In your domain registrar (GoDaddy/Namecheap):
   - Add A record: `@` → `75.2.60.5`
   - Add CNAME: `www` → `your-site.netlify.app`
4. Wait 10-30 minutes for DNS propagation

---

## ✅ Your Site is Live!

Visit: `https://yourdomain.com` 🎉

**Test these:**
- ✅ Homepage loads
- ✅ WhatsApp button works
- ✅ Book purchase links work
- ✅ Contact form (backend needed)
- ✅ Calendar modal opens

---

## 🔥 Tomorrow Morning Tasks (10 min)

### 1. Setup SendGrid (Free emails)
```bash
1. Sign up: sendgrid.com
2. Get API key
3. Add to Railway: SENDGRID_API_KEY=SG.xxx
4. Test form submission
```

### 2. Setup Cal.com (Free calendar)
```bash
1. Sign up: cal.com
2. Create booking page
3. Update: REACT_APP_CALCOM_USERNAME=your-username
4. Redeploy Netlify
```

### 3. Setup Google Analytics
```bash
1. Create GA4 property: analytics.google.com
2. Get tracking ID: G-XXXXXXXXXX
3. Update: REACT_APP_GA_TRACKING_ID=G-XXX
4. Redeploy Netlify
```

---

## 🐛 Common Issues

**Issue: "Backend not working"**
```bash
Solution: Railway backend might be sleeping (free tier)
- Wait 30 seconds and retry
- Or upgrade to $5/month plan
```

**Issue: "Domain not working"**
```bash
Solution: DNS takes time
- Wait 30 minutes
- Clear browser cache
- Try incognito mode
```

**Issue: "Form submission failed"**
```bash
Solution: Check CORS
- Railway: CORS_ORIGINS=https://yourdomain.com
- Redeploy backend
```

---

## 💡 Pro Tips

1. **Free Alternative to Railway:** Use Render.com (750 hours/month)
2. **Faster DNS:** Use Cloudflare for DNS (free)
3. **Better Performance:** Upgrade to Netlify Pro ($19/month) later
4. **Email Alternative:** Use SMTP2GO (free 1000 emails/month)

---

## 📞 Need Help?

**Stuck? Common Solutions:**
- Check Netlify build logs
- Check Railway deployment logs
- Test backend directly: `https://your-app.railway.app/api/`
- Clear browser cache and retry

**Still stuck?**
- WhatsApp: +91 72988 88880
- Email: shivanshu.ga@gmail.com

---

## 🎉 Congratulations!

Your professional life coaching website is now LIVE! 

**Share it:**
- 📱 WhatsApp friends
- 📘 Post on Facebook
- 💼 Update LinkedIn
- 📧 Email to clients

**Next Steps:**
- Add your Cal.com calendar
- Setup email notifications
- Add Google Analytics
- Start getting bookings! 💰

---

**Estimated Time:**
- Deployment: 5 minutes ⚡
- Tomorrow morning setup: 10 minutes
- **Total: 15 minutes from zero to hero!** 🚀
