# Quick Deployment Guide

## 🚀 Fast Track Deployment

### Step 1: Deploy Backend (5 minutes)

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub** (you'll need to push backend to a repo first)
4. **Configure:**
   - Name: `doctor-backend`
   - Build: `npm install`
   - Start: `npm start`
5. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://Anshulraj:anshulraj098@cluster0.pznbufb.mongodb.net
   CLOUDINARY_NAME=dvn3gtrmr
   CLOUDINARY_API_KEY=857712952713157
   CLOUDINARY_SECRET_KEY=ZcndoTlLOBSDiAERNXwN8OfAx-g
   ADMIN_EMAIL=anshulraj6205474281@gmail.com
   ADMIN_PASSWORD=anshulraj098
   JWT_SECRET=anshulraj
   RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
   RAZORPAY_KEY_SECRET=dp2mANOWVbcTR2vwLZIG7mvx
   PORT=4000
   ```
6. **Deploy** and get your URL (e.g., `https://doctor-backend-xyz.onrender.com`)

### Step 2: Deploy Frontend (3 minutes)

1. **Update frontend/.env:**
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   VITE_RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
   ```
2. **Go to [vercel.com](https://vercel.com)** and sign up with GitHub
3. **Import Project** from GitHub (frontend folder)
4. **Add Environment Variables** in Vercel dashboard
5. **Deploy**

### Step 3: Deploy Admin (3 minutes)

1. **Update admin/.env:** (same as frontend)
2. **Import Project** from GitHub (admin folder) 
3. **Add Environment Variables**
4. **Deploy**

### Step 4: Final Configuration

1. **Update backend CORS** with your Vercel URLs
2. **Update frontend navbar** Admin Panel link with your admin URL
3. **Test everything**

## 🛠️ Alternative: GitHub + Vercel Auto-Deploy

1. **Push each folder to separate GitHub repositories:**
   - `doctor-backend`
   - `doctor-frontend` 
   - `doctor-admin`

2. **Connect repositories to hosting services:**
   - Backend → Render
   - Frontend → Vercel
   - Admin → Vercel

3. **Auto-deploy on every push!**

---

**Need help?** Follow the detailed `DEPLOYMENT_GUIDE.md` for troubleshooting.