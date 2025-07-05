# MongoDB Setup Guide for Product Review Hub

## Quick Setup (5 minutes)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free" 
3. Create account with email
4. Choose "Free" plan (M0)

### Step 2: Create Database
1. Click "Build a Database"
2. Choose "FREE" tier
3. Select provider (AWS/Google Cloud/Azure) - any is fine
4. Click "Create"

### Step 3: Set Up Database Access
1. Click "Database Access" in left menu
2. Click "Add New Database User"
3. Username: `reviewhub`
4. Password: `reviewhub123` (or your choice)
5. Role: "Read and write to any database"
6. Click "Add User"

### Step 4: Set Up Network Access
1. Click "Network Access" in left menu
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left menu
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string

### Step 6: Update Your .env File
Replace the connection string in `server/.env`:

```env
MONGODB_URI=mongodb+srv://reviewhub:reviewhub123@cluster0.xxxxx.mongodb.net/review-hub?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
```

**Important**: Replace `cluster0.xxxxx.mongodb.net` with your actual cluster URL.

### Step 7: Add Products to Database
```bash
cd server
node setupMongoAtlas.js
```

### Step 8: Start Your Application
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

## What You'll See
- ✅ 12 Real products with images
- ✅ Search functionality
- ✅ User registration/login
- ✅ Add reviews to products
- ✅ Responsive design

## Troubleshooting
- If connection fails, check your IP is allowed in Network Access
- If products don't show, run `node setupMongoAtlas.js` again
- Make sure both backend and frontend are running

## Success!
Your Product Review Hub will now show all products and you can add reviews! 🎉 