# 🚀 Deployment Guide - Life Coach Landing Page

## Overview
- **Frontend**: Netlify (Free)
- **Backend**: Railway or Render (Free)
- **Database**: MongoDB Atlas (Free 512MB)
- **Custom Domain**: Your domain → Netlify

---

## 📦 Step 1: Prepare Your Code

### Download the Codebase
The complete codebase is available at:
```
/app/life-coach-landing-complete.zip
```

Extract it to your local machine.

---

## 🎨 Step 2: Deploy Frontend to Netlify

### Option A: Deploy via Netlify UI (Easiest)

1. **Sign up/Login to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with GitHub, GitLab, or Email

2. **Create New Site**
   - Click "Add new site" → "Deploy manually"
   - Or "Import from Git" if you have GitHub repo

3. **Manual Deploy (Drag & Drop)**
   ```bash
   cd frontend
   yarn install
   yarn build
   ```
   - Drag the `build` folder to Netlify

4. **Or Git Deploy**
   - Push code to GitHub
   - Connect repository to Netlify
   - Build settings:
     - Build command: `yarn build`
     - Publish directory: `build`
     - Base directory: `frontend`

5. **Add Environment Variables**
   In Netlify Dashboard → Site settings → Environment variables:
   ```env
   REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   REACT_APP_CALCOM_USERNAME=shivanshu
   REACT_APP_GOOGLE_CALENDAR_LINK=your-calendar-link
   REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
   ```

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy from frontend directory
cd frontend
yarn build
netlify deploy --prod --dir=build
```

---

## 🔧 Step 3: Deploy Backend to Railway (Free $5/month credit)

### Setup Railway

1. **Sign up at [railway.app](https://railway.app)**
   - Free $5/month credit (no credit card required)
   - Deploy backend for free

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

3. **Add Backend Service**
   ```bash
   # Push backend code to GitHub
   cd backend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo
   git push -u origin main
   ```

4. **Connect to Railway**
   - In Railway, select your GitHub repo
   - Railway will auto-detect Python app
   - Or use "Empty Project" and deploy manually

5. **Add Environment Variables in Railway**
   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
   DB_NAME=emergentdb
   CORS_ORIGINS=https://your-site.netlify.app
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxx
   FROM_EMAIL=noreply@mindclarity.coach
   NOTIFICATION_EMAIL=lifecs.in@gmail.com
   CALCOM_USERNAME=shivanshu
   GOOGLE_CALENDAR_LINK=your-calendar-link
   ```

6. **Add Start Command (if needed)**
   Railway Settings → Deploy:
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```

7. **Get Backend URL**
   - Railway will provide URL like: `https://your-app.railway.app`
   - Copy this URL

---

## 🗄️ Step 4: Setup MongoDB Atlas (Free)

1. **Sign up at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)**

2. **Create Free Cluster**
   - Choose AWS/GCP/Azure
   - Select free tier (M0 Sandbox - 512MB)
   - Choose region closest to you

3. **Create Database User**
   - Database Access → Add New User
   - Username: `admin`
   - Password: Generate secure password
   - Save credentials

4. **Whitelist IP Address**
   - Network Access → Add IP Address
   - Add `0.0.0.0/0` (allow from anywhere) for Railway/Render

5. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```
   - Replace `<password>` with your password
   - Replace `dbname` with `emergentdb`

6. **Add to Railway Environment Variables**
   ```env
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/emergentdb?retryWrites=true&w=majority
   ```

---

## 🌐 Step 5: Connect Your Custom Domain to Netlify

### Add Domain to Netlify

1. **In Netlify Dashboard**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain: `yourdomain.com`

2. **Configure DNS (Two Options)**

   **Option A: Use Netlify DNS (Recommended)**
   - Netlify will provide nameservers
   - Go to your domain registrar (GoDaddy, Namecheap, etc.)
   - Update nameservers to Netlify's:
     ```
     dns1.p01.nsone.net
     dns2.p01.nsone.net
     dns3.p01.nsone.net
     dns4.p01.nsone.net
     ```
   - Wait 24-48 hours for DNS propagation

   **Option B: Keep Your DNS Provider**
   - Add these records in your DNS provider:
   
   **For apex domain (yourdomain.com):**
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```
   
   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

3. **Enable HTTPS**
   - Netlify automatically provisions SSL certificate
   - Wait a few minutes for HTTPS to activate
   - Your site will be available at `https://yourdomain.com`

---

## 📧 Step 6: Setup SendGrid (Free 100 emails/day)

1. **Sign up at [sendgrid.com](https://sendgrid.com)**
   - Free tier: 100 emails/day

2. **Create API Key**
   - Settings → API Keys
   - Create API Key with "Full Access"
   - Copy the key: `SG.xxxxxxxxxxxxxxx`

3. **Verify Sender Identity**
   - Settings → Sender Authentication
   - Verify single sender email: `lifecs.in@gmail.com`
   - Or verify your domain (better for production)

4. **Add to Railway Environment Variables**
   ```env
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxx
   ```

---

## 🔗 Step 7: Update Frontend with Backend URL

1. **In Netlify Dashboard**
   - Site settings → Environment variables
   - Update `REACT_APP_BACKEND_URL` with Railway URL:
   ```env
   REACT_APP_BACKEND_URL=https://your-app.railway.app
   ```

2. **Trigger Redeploy**
   - Deploys → Trigger deploy
   - Or push new commit to GitHub

---

## ✅ Verification Checklist

### Test Frontend
- [ ] Visit your custom domain
- [ ] Check all sections load correctly
- [ ] Test navigation menu
- [ ] Verify book purchase links work
- [ ] Check WhatsApp button opens correctly

### Test Backend Integration
- [ ] Submit contact form
- [ ] Check if you receive email notification
- [ ] Verify form submission appears in MongoDB
- [ ] Test calendar booking modal
- [ ] Check browser console for errors

### Test Emails
- [ ] Submit test form
- [ ] Check coach receives notification email
- [ ] Check user receives thank you email
- [ ] Verify emails look professional (not in spam)

---

## 🆓 Alternative Free Hosting Options

### Frontend Alternatives
1. **Vercel** (Recommended)
   - Better performance than Netlify
   - Free hobby tier
   - Automatic deployments from Git
   - [vercel.com](https://vercel.com)

2. **GitHub Pages**
   - Free for public repos
   - Custom domain support
   - [pages.github.com](https://pages.github.com)

3. **Cloudflare Pages**
   - Fastest CDN
   - Unlimited bandwidth
   - [pages.cloudflare.com](https://pages.cloudflare.com)

### Backend Alternatives

1. **Render** (Good alternative to Railway)
   - Free tier: 750 hours/month
   - Auto-sleeps after 15 min inactivity
   - [render.com](https://render.com)
   
   Deploy to Render:
   ```bash
   # Add render.yaml to backend folder
   ```
   
2. **Fly.io**
   - Free tier with 3 VMs
   - Better for Python apps
   - [fly.io](https://fly.io)

---

## 🐛 Troubleshooting

### Issue: "Form submission failed"
**Solution:**
- Check CORS settings in backend
- Verify REACT_APP_BACKEND_URL in Netlify
- Check Railway logs for errors

### Issue: "Email not received"
**Solution:**
- Verify SendGrid API key
- Check email in spam folder
- Verify sender authentication in SendGrid
- Check Railway logs for email errors

### Issue: "Database connection failed"
**Solution:**
- Verify MongoDB connection string
- Check IP whitelist (0.0.0.0/0)
- Ensure database user has correct permissions

### Issue: "Site loads but backend doesn't work"
**Solution:**
- Backend might be sleeping (free tier)
- Wait 30 seconds and try again
- Check Railway/Render logs

### Issue: "Custom domain not working"
**Solution:**
- Wait 24-48 hours for DNS propagation
- Check DNS records with: `dig yourdomain.com`
- Clear browser cache
- Try incognito mode

---

## 💰 Cost Breakdown

| Service | Free Tier | Limits |
|---------|-----------|--------|
| Netlify | Forever | 100GB bandwidth/month |
| Railway | $5 credit/month | ~500 hours |
| Render | Forever | 750 hours/month, sleeps after 15min |
| MongoDB Atlas | Forever | 512MB storage |
| SendGrid | Forever | 100 emails/day |
| Domain | ~$10-15/year | One-time annual cost |

**Total Monthly Cost: $0** (except domain ~$1/month)

---

## 📞 Need Help?

If you encounter any issues:
1. Check logs in Railway/Render dashboard
2. Check browser console for frontend errors
3. Test backend API directly: `https://your-app.railway.app/api/`
4. Contact me at: lifecs.in@gmail.com

---

## 🎉 Post-Deployment Tasks

Tomorrow morning, update these:
- [ ] SendGrid API key
- [ ] Cal.com username
- [ ] Google Calendar link
- [ ] Google Analytics ID
- [ ] Test email notifications
- [ ] Share site with friends for feedback!

---

## 📚 Additional Resources

- [Netlify Docs](https://docs.netlify.com)
- [Railway Docs](https://docs.railway.app)
- [MongoDB Atlas Setup](https://docs.atlas.mongodb.com/getting-started)
- [SendGrid API Guide](https://docs.sendgrid.com/api-reference)

**Your site will be live at:**
- `https://yourdomain.com` (custom domain)
- `https://your-site.netlify.app` (Netlify subdomain)
- `https://your-app.railway.app/api/` (Backend API)

Good luck with the deployment! 🚀
