# Doctor Project Deployment Guide

This guide will help you deploy the complete Doctor project (Frontend + Admin + Backend) to production.

## Architecture Overview
- **Backend**: Node.js API (Deploy to Render/Railway)
- **Frontend**: React App (Deploy to Vercel)
- **Admin Dashboard**: React App (Deploy to Vercel)
- **Database**: MongoDB Atlas (Already configured)

## Prerequisites
1. GitHub account
2. Vercel account
3. Render account (or Railway/Heroku)
4. All environment variables ready

---

## Step 1: Deploy Backend to Render

### 1.1 Prepare Backend for Deployment

1. Ensure your backend has all necessary environment variables
2. Update the start script (already done)
3. Create a new GitHub repository for the backend

### 1.2 Deploy to Render

1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository (backend folder)
5. Configure the service:
   - **Name**: `doctor-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

### 1.3 Add Environment Variables in Render

Add these environment variables in Render dashboard:
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

### 1.4 Get Backend URL
After deployment, you'll get a URL like: `https://doctor-backend-xyz.onrender.com`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Update Frontend Environment Variables

Update the `.env` file in frontend folder:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
VITE_RAZORPAY_KEY_SECRET=dp2mANOWVbcTR2vwLZIG7mvx
```

### 2.2 Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. In the frontend folder, run: `vercel`
3. Follow the prompts:
   - Link to existing project: No
   - Project name: `doctor-frontend`
   - Which directory: `./` (current)
   - Modify settings: No

### 2.3 Configure Environment Variables in Vercel

1. Go to [vercel.com](https://vercel.com) dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_BACKEND_URL`: Your backend URL
   - `VITE_RAZORPAY_KEY_ID`: rzp_test_R8YWFAcxoHLuq7

---

## Step 3: Deploy Admin Dashboard to Vercel

### 3.1 Update Admin Environment Variables

Update the `.env` file in admin folder:
```
VITE_BACKEND_URL=https://your-backend-url.onrender.com
VITE_RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
VITE_RAZORPAY_KEY_SECRET=dp2mANOWVbcTR2vwLZIG7mvx
```

### 3.2 Deploy Admin to Vercel

1. In the admin folder, run: `vercel`
2. Follow the prompts:
   - Link to existing project: No
   - Project name: `doctor-admin`
   - Which directory: `./` (current)
   - Modify settings: No

### 3.3 Configure Environment Variables in Vercel

Same process as frontend - add the environment variables in Vercel dashboard.

---

## Step 4: Update Frontend to Point to Production Admin

Update the Admin Panel link in your frontend navbar to point to your deployed admin URL.

---

## Step 5: Test the Deployment

1. **Backend**: Test API endpoints
2. **Frontend**: Test user registration, login, appointment booking
3. **Admin**: Test admin login, doctor management, appointment management

---

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend CORS is configured for your frontend domains
2. **Environment Variables**: Double-check all env vars are set correctly
3. **Build Errors**: Check Node.js version compatibility

### Backend CORS Configuration

Make sure your backend includes CORS for production domains:
```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'https://your-admin-domain.vercel.app'
  ]
}))
```

---

## Final URLs

After deployment, you'll have:
- **Frontend**: `https://doctor-frontend.vercel.app`
- **Admin**: `https://doctor-admin.vercel.app` 
- **Backend**: `https://doctor-backend.onrender.com`

---

## Security Notes

1. Never expose sensitive environment variables in client-side code
2. Use environment variables for all sensitive data
3. Consider using different database for production
4. Enable HTTPS in production (Vercel provides this automatically)