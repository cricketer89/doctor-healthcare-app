#!/bin/bash

echo "🚀 Doctor Healthcare App - Monorepo Deployment"
echo "=============================================="

# Check prerequisites
command -v git >/dev/null 2>&1 || { echo "❌ Git required but not installed." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm required but not installed." >&2; exit 1; }

echo "✅ Prerequisites check passed"

# Install all dependencies
echo "📦 Installing all dependencies..."
npm run install-all

# Get backend URL
echo ""
read -p "Enter your deployed backend URL (e.g., https://doctor-backend.onrender.com): " backend_url

if [ -z "$backend_url" ]; then
    echo "❌ Backend URL is required"
    exit 1
fi

# Update environment files
echo "🔧 Updating environment configurations..."

# Update frontend .env
cat > frontend/.env << EOF
VITE_BACKEND_URL=$backend_url
VITE_RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
EOF

# Update admin .env  
cat > admin/.env << EOF
VITE_BACKEND_URL=$backend_url
VITE_RAZORPAY_KEY_ID=rzp_test_R8YWFAcxoHLuq7
EOF

echo "✅ Environment files updated"

# Build projects locally to test
echo "🔨 Testing builds..."

echo "Building frontend..."
npm run build:frontend

echo "Building admin..."
npm run build:admin

echo "✅ Local builds successful"

# Deploy with Vercel CLI if available
if command -v vercel >/dev/null 2>&1; then
    echo ""
    read -p "Deploy frontend now? (y/n): " deploy_frontend
    if [ "$deploy_frontend" = "y" ]; then
        echo "🚀 Deploying frontend..."
        vercel --config vercel-frontend.json --prod
    fi
    
    echo ""
    read -p "Deploy admin now? (y/n): " deploy_admin
    if [ "$deploy_admin" = "y" ]; then
        echo "🚀 Deploying admin..."
        vercel --config vercel-admin.json --prod
    fi
else
    echo "⚠️  Vercel CLI not found. Install with: npm i -g vercel"
    echo "💡 Or deploy manually through Vercel dashboard"
fi

# Commit changes
echo ""
read -p "Commit environment changes? (y/n): " commit_changes
if [ "$commit_changes" = "y" ]; then
    git add .
    git commit -m "Update environment variables for production"
    git push
    echo "✅ Changes committed and pushed"
fi

echo ""
echo "🎉 Monorepo deployment process completed!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Update backend CORS with your actual Vercel URLs"
echo "2. Test all functionality"
echo "3. Monitor deployment logs"
echo ""
echo "Your monorepo structure:"
echo "📁 Repository: Single repo with all components"
echo "🌐 Frontend: Deploy from /frontend folder"
echo "🔧 Admin: Deploy from /admin folder"  
echo "⚙️  Backend: Deploy from /backend folder"