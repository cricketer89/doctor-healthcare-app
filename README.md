# 🏥 Doctor Healthcare Management System

A complete healthcare management platform built with React, Node.js, and MongoDB.

## 🏗️ Architecture

```
doctor-healthcare-app/
├── frontend/          # Patient-facing React app
├── admin/            # Admin & Doctor dashboard React app  
├── backend/          # Node.js API server
├── package.json      # Monorepo configuration
└── README.md         # This file
```

## ✨ Features

- **Patient Portal**: Book appointments, view doctors, manage profile
- **Admin Dashboard**: Manage doctors, appointments, system overview
- **Doctor Dashboard**: View appointments, update profile, patient management
- **Real-time Updates**: Live appointment status updates
- **Payment Integration**: Razorpay payment gateway
- **File Uploads**: Cloudinary integration for images

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account
- Cloudinary account

### Development Setup

1. **Clone and install:**
   ```bash
   git clone https://github.com/yourusername/doctor-healthcare-app.git
   cd doctor-healthcare-app
   npm run install-all
   ```

2. **Environment setup:**
   ```bash
   # Copy environment files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   cp admin/.env.example admin/.env
   ```

3. **Start all services:**
   ```bash
   npm run dev:all
   ```

### Individual Services

```bash
# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend

# Admin only
npm run dev:admin
```

## 🌐 Deployment

### Production URLs
- **Frontend**: https://doctor-frontend.vercel.app
- **Admin**: https://doctor-admin.vercel.app  
- **Backend**: https://doctor-backend.onrender.com

### Deploy Steps
1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Deploy admin to Vercel

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🛠️ Tech Stack

### Frontend & Admin
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router DOM

### Backend  
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary
- Razorpay

## 📱 Demo Accounts

### Admin Login
- Email: `anshulraj6205474281@gmail.com`
- Password: `anshulraj098`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you have any questions or issues, please create an issue in the GitHub repository.