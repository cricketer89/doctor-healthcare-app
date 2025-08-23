# 🚀 Deployment Checklist

## Phase 1: Backend (Render) ⏳
- [ ] Go to render.com
- [ ] Connect GitHub repository: `anshul098yu/doctor-healthcare-app`
- [ ] Set Root Directory: `backend`
- [ ] Add all environment variables
- [ ] Deploy and get URL
- [ ] Test backend URL (should show "API WORKING Fine")

## Phase 2: Update Environment Variables
- [ ] Copy backend URL from Render
- [ ] Update frontend/.env with backend URL
- [ ] Update admin/.env with backend URL  
- [ ] Commit and push changes

## Phase 3: Frontend (Vercel) ⏳
- [ ] Go to vercel.com
- [ ] Import repository: `anshul098yu/doctor-healthcare-app`
- [ ] Set Root Directory: `frontend`
- [ ] Add environment variables
- [ ] Deploy and get frontend URL

## Phase 4: Admin (Vercel) ⏳
- [ ] Create new project in Vercel
- [ ] Import same repository
- [ ] Set Root Directory: `admin`
- [ ] Add environment variables
- [ ] Deploy and get admin URL

## Phase 5: Final Configuration
- [ ] Update backend CORS with actual Vercel URLs
- [ ] Test all functionality
- [ ] Update frontend Admin Panel link

## Expected URLs:
- Backend: `https://doctor-backend-xyz.onrender.com`
- Frontend: `https://doctor-frontend-xyz.vercel.app`
- Admin: `https://doctor-admin-xyz.vercel.app`

## Demo Credentials:
- Admin Login: `anshulraj6205474281@gmail.com` / `anshulraj098`