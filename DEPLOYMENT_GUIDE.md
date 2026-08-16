# Vercel Deployment Guide - Ecommerce MERN App

This guide walks you through deploying your MERN (MongoDB, Express, React, Node.js) application to Vercel.

## Prerequisites

- GitHub account with your repository
- Vercel account (create at https://vercel.com)
- MongoDB Atlas account for cloud database (https://www.mongodb.com/cloud/atlas)
- Khalti payment gateway account (for payment processing)

## Step 1: Prepare Your Repository

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Vercel deployment"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/your-username/your-repo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.2 Update Environment Variables

**For Client (Client/.env.local):**

```
VITE_API_BASE_URL=http://localhost:3000
VITE_KHALTI_PUBLIC_KEY=your_khalti_public_key
```

**For Server (Server/.env):**

```
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
PORT=3000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
KHALTI_SECRET_KEY=your_khalti_secret_key
FRONTEND_URL=http://localhost:5173
```

## Step 2: Set Up MongoDB Atlas

### 2.1 Create a Free MongoDB Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new project
4. Create a new cluster (select Free tier)
5. Set up database user credentials
6. Whitelist your IP address
7. Get your connection string

### 2.2 Connection String Format

```
mongodb+srv://username:password@cluster-name.mongodb.net/ecommerce?retryWrites=true&w=majority
```

Replace `username`, `password`, and `cluster-name` with your actual values.

## Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Select "Import Git Repository"
4. Choose your GitHub repository
5. Click "Import"

### 3.2 Configure Project Settings

1. **Framework Preset**: Select "Other"
2. **Build Command**: Leave as default (uses vercel.json)
3. **Output Directory**: Leave empty
4. **Install Command**: Leave as default

Click "Deploy" to proceed to environment variables configuration.

### 3.3 Set Environment Variables

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

**Production Environment:**

```
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-generate-random-string
KHALTI_SECRET_KEY=your_khalti_secret_key
FRONTEND_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

**Preview/Development Environment:**

```
MONGO_URI=mongodb+srv://username:password@cluster-name.mongodb.net/ecommerce?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
KHALTI_SECRET_KEY=your_khalti_secret_key
FRONTEND_URL=https://your-preview-domain.vercel.app
NODE_ENV=development
```

### 3.4 Complete Deployment

1. Click "Deploy"
2. Wait for build to complete (usually 2-5 minutes)
3. Once deployed, your app will be live at `https://your-project-name.vercel.app`

## Step 4: Update Client Environment Variables

After deployment, update your Client environment with the production API URL:

**Client/.env.production:**

```
VITE_API_BASE_URL=https://your-project-name.vercel.app/api
```

## Step 5: Fix Hardcoded API URLs

Your project has several hardcoded `localhost:3000` URLs that need to be replaced:

### Files to Update:

1. **Client/src/Admin/Add.tsx** (line ~73)

   ```typescript
   // Change from:
   "http://localhost:3000/api/admin/upload";
   // To:
   import { API_BASE_URL } from "@/lib/api";
   `${API_BASE_URL}/api/admin/upload`;
   ```

2. **Client/src/Admin/OrderHistory.tsx** (multiple locations)

   ```typescript
   // Replace all hardcoded URLs with:
   import { getApiUrl } from "@/lib/api";
   getApiUrl("/api/admin/seeProductPlaced");
   ```

3. **Client/src/Esewa/Khalit.tsx** (line ~37)

   ```typescript
   import { getApiUrl } from "@/lib/api";
   getApiUrl("/api/initiate-payment");
   ```

4. **Client/src/Esewa/PaymentSuccess.tsx** (line ~32)

   ```typescript
   import { getApiUrl } from "@/lib/api";
   getApiUrl("/api/payment/payment-success");
   ```

5. **Client/src/pages/Cart/CartPage.tsx** (multiple locations)
   ```typescript
   import { getApiUrl } from "@/lib/api";
   getApiUrl("/api/cart/" + userId);
   ```

For image URLs, use the `getImageUrl` helper:

```typescript
import { getImageUrl } from "@/lib/api";
getImageUrl(product.image[0]);
```

## Step 6: Test Your Deployment

1. Navigate to your Vercel URL
2. Test login/registration
3. Test product viewing and cart functionality
4. Test payment processing with Khalti
5. Check admin panel functionality
6. Monitor logs in Vercel Dashboard

## Step 7: Enable GitHub Integration (Optional)

1. In Vercel Dashboard → Settings → Git
2. Enable "Automatic Deployments"
3. Every push to `main` branch will trigger automatic deployment

## Troubleshooting

### Issue: Build fails with Module not found

**Solution**: Ensure all dependencies are listed in both `Server/package.json` and `Client/package.json`

### Issue: API calls return 404

**Solution**: Check that your API endpoints match the routes defined in your Express server. Verify CORS is properly configured with your Vercel domain.

### Issue: MongoDB Connection Error

**Solution**:

- Check your MONGO_URI is correct
- Add Vercel's IP to MongoDB Atlas whitelist: https://www.mongodb.com/docs/atlas/security/ip-access-list/
- Or whitelist all IPs (0.0.0.0/0) for testing

### Issue: Static files (images) not loading

**Solution**: Update all image URLs to use absolute paths with `getImageUrl()` helper or ensure uploads folder is properly served.

### Issue: CORS errors

**Solution**: Make sure `FRONTEND_URL` in environment variables matches your Vercel domain exactly.

## Performance Optimization

### For Client:

- Enable caching headers in vercel.json
- Optimize images
- Use Code splitting in React

### For Server:

- Add database indexing for frequently queried fields
- Use pagination for list endpoints
- Consider Redis caching for frequently accessed data

## Monitoring

1. Check Vercel Analytics in Dashboard
2. Monitor API response times
3. Set up error tracking (optional: Sentry)
4. Review MongoDB Atlas metrics for database performance

## Rollback Instructions

If something goes wrong:

1. Go to Vercel Dashboard → Deployments
2. Find the previous successful deployment
3. Click the three dots menu
4. Select "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Node.js Runtime](https://vercel.com/docs/functions/nodejs)
- [MongoDB Atlas Documentation](https://docs.mongodb.com/atlas/)
- [Express.js Guide](https://expressjs.com/)
