# Deployment Checklist - Ecommerce MERN App

## Pre-Deployment Checklist

### Code & Configuration

- [ ] All hardcoded `localhost` URLs replaced with environment variables
- [ ] `.env.example` files created and committed
- [ ] `.env` files are in `.gitignore`
- [ ] All dependencies are in `package.json`
- [ ] No console.log statements in production code
- [ ] Error handling is implemented
- [ ] CORS is properly configured

### Database

- [ ] MongoDB Atlas cluster is created
- [ ] Database user credentials are secure
- [ ] IP whitelist is configured (at least allow Vercel IPs)
- [ ] Connection string is tested locally
- [ ] Database backups are enabled

### Authentication & Security

- [ ] JWT_SECRET is strong and random
- [ ] Passwords are hashed with bcrypt
- [ ] Sensitive routes have proper middleware protection
- [ ] HTTPS is enforced (Vercel does this automatically)
- [ ] Cookie settings are secure (HttpOnly, Secure flags)

### API & Integrations

- [ ] Khalti API keys are obtained and secured
- [ ] Payment endpoints are tested
- [ ] File upload handling is secure
- [ ] Image upload size limits are set
- [ ] API rate limiting is configured (optional)

### Frontend

- [ ] Build completes without errors locally
- [ ] No TypeScript errors
- [ ] All API endpoints use BASE_URL
- [ ] Images use proper paths
- [ ] Responsive design is tested
- [ ] Environment variables are documented

### Testing

- [ ] App runs locally without errors
- [ ] All major flows tested (login, browse, add to cart, checkout)
- [ ] Admin panel functionality tested
- [ ] Payment flow tested in Khalti sandbox
- [ ] Error scenarios handled gracefully

## Deployment Steps

### 1. GitHub Push

- [ ] Commit all changes with meaningful messages
- [ ] Push to main branch
- [ ] Verify all files are on GitHub

### 2. Vercel Configuration

- [ ] Create Vercel project from GitHub repo
- [ ] Set all environment variables
- [ ] Verify build settings use vercel.json
- [ ] Start initial deployment

### 3. Post-Deployment Verification

- [ ] App loads without errors
- [ ] Frontend renders correctly
- [ ] API endpoints respond correctly
- [ ] Database connections work
- [ ] Login/Register functionality works
- [ ] Payment integration works
- [ ] File uploads work
- [ ] Images load correctly

### 4. Monitoring

- [ ] Check Vercel logs for errors
- [ ] Monitor MongoDB connection status
- [ ] Test API response times
- [ ] Monitor error rates

## Quick Reference - Environment Variables

### Production (Vercel)

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=random_secret_key
KHALTI_SECRET_KEY=your_key
FRONTEND_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Development (Local)

```
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=dev_secret
KHALTI_SECRET_KEY=sandbox_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

## Files Modified/Created for Deployment

- ✅ `vercel.json` - Deployment configuration
- ✅ `DEPLOYMENT_GUIDE.md` - Detailed guide
- ✅ `DEPLOYMENT_CHECKLIST.md` - This file
- ✅ `Server/api/index.js` - Serverless function handler
- ✅ `.env.example` - Environment template (root)
- ✅ `Server/.env.example` - Server env template
- ✅ `Client/.env.example` - Client env template
- ✅ `.gitignore` - Root-level git ignore
- ✅ `Client/src/lib/api.ts` - API helper utilities

## Files to Update (Hardcoded URLs)

See DEPLOYMENT_GUIDE.md section "Step 5: Fix Hardcoded API URLs" for detailed changes needed in:

- Client/src/Admin/Add.tsx
- Client/src/Admin/OrderHistory.tsx
- Client/src/Esewa/Khalit.tsx
- Client/src/Esewa/PaymentSuccess.tsx
- Client/src/pages/Cart/CartPage.tsx
- Client/src/pages/Home/Home.tsx
- Client/src/pages/Collection/Collection.tsx
- Client/src/Admin/List.tsx

## Support & Troubleshooting

1. Check Vercel logs: `vercel logs <project-name>`
2. Check MongoDB Atlas metrics
3. Review DEPLOYMENT_GUIDE.md Troubleshooting section
4. Check environment variables are set correctly
5. Verify CORS configuration

## Next Steps After Deployment

1. Set up custom domain (optional)
2. Enable auto-deployment from GitHub
3. Set up monitoring/alerts
4. Configure CI/CD pipeline
5. Document API endpoints for team
6. Set up staging environment
