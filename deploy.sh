#!/bin/bash

echo "🚀 Doctor Project Deployment Script"
echo "=================================="

# Check if required tools are installed
command -v git >/dev/null 2>&1 || { echo "❌ Git is required but not installed. Aborting." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed. Aborting." >&2; exit 1; }

echo "✅ Prerequisites check passed"

# Function to deploy to Vercel
deploy_to_vercel() {
    local project_name=$1
    local directory=$2
    
    echo "📦 Deploying $project_name to Vercel..."
    cd $directory
    
    # Install dependencies if not already installed
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing dependencies..."
        npm install
    fi
    
    # Build the project
    echo "🔨 Building project..."
    npm run build
    
    # Deploy with Vercel CLI
    if command -v vercel >/dev/null 2>&1; then
        echo "🚀 Deploying to Vercel..."
        vercel --prod
    else
        echo "⚠️  Vercel CLI not found. Please install it: npm i -g vercel"
        echo "💡 Or deploy manually by pushing to GitHub and connecting to Vercel"
    fi
    
    cd ..
}

# Main deployment process
echo "🎯 Starting deployment process..."

# Step 1: Backend deployment reminder
echo ""
echo "📋 STEP 1: Deploy Backend First"
echo "==============================="
echo "1. Create a new repository on GitHub for the backend"
echo "2. Push backend code to GitHub"
echo "3. Go to render.com and deploy from GitHub"
echo "4. Add all environment variables"
echo "5. Get your backend URL"
echo ""
read -p "Have you deployed the backend and got the URL? (y/n): " backend_ready

if [ "$backend_ready" != "y" ]; then
    echo "⏸️  Please deploy the backend first, then run this script again."
    exit 1
fi

# Get backend URL
read -p "Enter your backend URL (e.g., https://doctor-backend.onrender.com): " backend_url

# Update environment files
echo "🔧 Updating environment configurations..."

# Update frontend .env
echo "VITE_BACKEND_URL=$backend_url" > frontend/.env.production
echo "VITE_RAZORPAY_KEY_ID=\"rzp_test_R8YWFAcxoHLuq7\"" >> frontend/.env.production

# Update admin .env
echo "VITE_BACKEND_URL=$backend_url" > admin/.env.production
echo "VITE_RAZORPAY_KEY_ID=\"rzp_test_R8YWFAcxoHLuq7\"" >> admin/.env.production

echo "✅ Environment files updated"

# Step 2: Deploy Frontend
echo ""
echo "📋 STEP 2: Deploy Frontend"
echo "=========================="
deploy_to_vercel "Frontend" "frontend"

# Step 3: Deploy Admin
echo ""
echo "📋 STEP 3: Deploy Admin Dashboard"
echo "================================="
deploy_to_vercel "Admin Dashboard" "admin"

echo ""
echo "🎉 Deployment script completed!"
echo "================================"
echo ""
echo "Next steps:"
echo "1. Update CORS in backend with your actual Vercel URLs"
echo "2. Test all functionality"
echo "3. Update the Admin Panel link in frontend navbar"
echo ""
echo "Your applications should now be live! 🌐"