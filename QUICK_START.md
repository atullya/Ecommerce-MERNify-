# Quick Start Guide - Vercel Deployment

## Summary of Configuration Files Created

Your project is now ready for Vercel deployment. Here's what has been configured:

### ✅ Files Created/Modified:

1. **vercel.json** - Main deployment configuration
   - Defines build and install commands
   - Configures serverless API routes
   - Sets up environment variables

2. **Server/api/index.js** - Vercel serverless function handler
   - Exports Express app for Vercel Functions

3. **DEPLOYMENT_GUIDE.md** - Comprehensive step-by-step guide
   - Prerequisites and setup instructions
   - Vercel dashboard configuration
   - Troubleshooting tips

4. **DEPLOYMENT_CHECKLIST.md** - Pre and post-deployment checklist
   - Verification items
   - Environment variables reference

5. **.env.example files**
   - `Server/.env.example` - Updated with all required variables
   - `Client/.env.example` - Client configuration template

6. **.gitignore** - Root level git ignore file
   - Ensures .env files aren't committed

7. **setup.sh & setup.bat** - Local development setup scripts
   - Automated setup for development

8. **Client/src/lib/api.ts** - API helper utilities
   - `getApiUrl()` - For API endpoints
   - `getImageUrl()` - For image paths

9. **Client/src/App.tsx** - Updated to use environment variables
   - Uses `VITE_API_BASE_URL` environment variable

---

## 🚀 Deployment Steps (Quick Version)

### Step 1: Fix Hardcoded URLs in Client

Before deployment, search and replace all `http://localhost:3000` URLs:

**Files to update:**

- `Client/src/Admin/Add.tsx`
- `Client/src/Admin/OrderHistory.tsx`
- `Client/src/Esewa/Khalit.tsx`
- `Client/src/Esewa/PaymentSuccess.tsx`
- `Client/src/pages/Cart/CartPage.tsx`
- `Client/src/pages/Home/Home.tsx`
- `Client/src/pages/Collection/Collection.tsx`
- `Client/src/Admin/List.tsx`

**Pattern to follow:**

```typescript
// Import the helper
import { getApiUrl, getImageUrl } from "@/lib/api";

// Replace API calls
// Old: "http://localhost:3000/api/cart/add"
// New:
getApiUrl("/api/cart/add");

// Replace image URLs
// Old: `http://localhost:3000/${product.image[0]}`
// New:
getImageUrl(product.image[0]);
```

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### Step 3: Create Vercel Project

1. Go to https://vercel.com/dashboard
2. Click "New Project"
3. Import your GitHub repository
4. Select "Other" as framework preset
5. Click "Deploy"

### Step 4: Set Environment Variables in Vercel

After deployment starts, go to **Settings → Environment Variables**:

```
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=your-random-secret-key
KHALTI_SECRET_KEY=your-khalti-secret
FRONTEND_URL=https://your-project.vercel.app
NODE_ENV=production
```

### Step 5: Wait for Deployment

- Build should complete in 2-5 minutes
- Monitor logs for any errors
- Once complete, your app will be live

### Step 6: Test Live App

- Visit your Vercel URL
- Test login/register
- Test product browsing and cart
- Test checkout with Khalti
- Check admin panel

---

## 📋 Environment Variables Reference

### MongoDB URI

Get from MongoDB Atlas:

- Format: `mongodb+srv://username:password@cluster.mongodb.net/database`
- Replace username, password, and cluster name

### JWT Secret

Generate a random secure string:

```bash
# On Linux/Mac:
openssl rand -base64 32

# Or use any random string with 32+ characters
```

### Khalti Keys

From Khalti Dashboard:

- **Public Key**: Used in frontend for payment widget
- **Secret Key**: Used in backend for payment verification

### Frontend URL

Your Vercel deployment URL:

- Example: `https://ecommerce-app.vercel.app`
- Used for CORS and redirect URLs

---

## 🔧 Troubleshooting Quick Links

### Build Fails

- Check `vercel logs <project-name>`
- Verify all dependencies in package.json
- Ensure vercel.json is valid JSON

### API Returns 404

- Verify FRONTEND_URL matches your Vercel domain
- Check Express routes are correct
- Ensure /api/\* rewrite is working

### Database Connection Error

- Verify MONGO_URI is correct
- Add Vercel IP to MongoDB whitelist
- Check database user permissions

### CORS Errors

- Make sure FRONTEND_URL is set correctly
- Verify origin matches exactly in CORS configuration
- Check `app.js` CORS middleware

### Images Not Loading

- Use `getImageUrl()` helper for all image paths
- Verify uploads folder exists in Server
- Check image paths don't have double backslashes

---

## 📚 Additional Resources

- **vercel.json Reference**: https://vercel.com/docs/projects/project-configuration
- **Node.js Runtime**: https://vercel.com/docs/functions/nodejs
- **Deployment Best Practices**: https://vercel.com/guides
- **Express Guide**: https://expressjs.com/
- **MongoDB Atlas**: https://docs.mongodb.com/atlas/

---

## ⚡ Pro Tips

1. **Use Preview Deployments**: Every PR creates a preview URL for testing
2. **Enable Auto Deployments**: Automatic deployment on every push
3. **Set up Monitoring**: Use Vercel Analytics to track performance
4. **Database Backups**: Enable automated backups in MongoDB Atlas
5. **Use Environment Files**: Keep .env files for different environments (dev, staging, prod)

---

## 🎯 Next Milestones

After initial deployment:

- [ ] Set up custom domain
- [ ] Enable auto-deploy from GitHub
- [ ] Configure staging environment
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Implement database indexing
- [ ] Add caching strategies
- [ ] Set up CI/CD pipeline
- [ ] Document API endpoints

---

## ❓ Need Help?

1. Check **DEPLOYMENT_GUIDE.md** for detailed instructions
2. Review **DEPLOYMENT_CHECKLIST.md** for verification
3. Check Vercel logs: `vercel logs <project-name>`
4. Visit Vercel documentation: https://vercel.com/docs
5. Check MongoDB Atlas documentation for database issues

---

**Happy Deploying! 🎉**
