# Vercel Backend Deployment Troubleshooting

## Current Error: 500 INTERNAL_SERVER_ERROR

This error typically occurs due to missing environment variables or configuration issues.

## Fix Steps:

### 1. Required Environment Variables in Vercel Dashboard

Go to your Vercel project settings > Environment Variables and add these **REQUIRED** variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/homeease?retryWrites=true&w=majority
JWT_SECRET=your_secure_jwt_secret_at_least_32_characters_long
NODE_ENV=production
```

### 2. Optional Environment Variables (but recommended):

```
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=SecurePassword123!
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
ADMIN_PHONE=1234567890
```

### 3. Build Commands for Vercel:

**Backend:**
- Build Command: `echo 'No build required'` (or leave empty)
- Output Directory: Leave empty
- Install Command: `npm install`
- Development Command: `npm run dev`

**Frontend:**
- Build Command: `npm run build`
- Output Directory: `build`
- Install Command: `npm install`
- Development Command: `npm start`

### 4. MongoDB Setup:

Make sure your MongoDB Atlas:
- Cluster is running
- Database user has read/write permissions
- IP whitelist includes `0.0.0.0/0` (for Vercel)
- Connection string is correct

### 5. Deployment Order:

1. Deploy backend first with all environment variables
2. Get the backend URL from Vercel
3. Update frontend .env with the backend URL
4. Deploy frontend

## Testing the Fix:

After setting environment variables, redeploy and test:
- `https://your-backend.vercel.app/api/health` should return status OK
- Check Vercel function logs for specific errors

## Common Issues:

1. **Missing MONGODB_URI**: Most common cause of 500 error
2. **Invalid JWT_SECRET**: Must be at least 32 characters
3. **Wrong MongoDB connection string**: Check username/password/cluster URL
4. **IP restrictions**: MongoDB must allow Vercel IPs (use 0.0.0.0/0)

## Next Steps:

1. Set the environment variables in Vercel dashboard
2. Redeploy the backend
3. Test the health endpoint
4. Update frontend with the working backend URL
