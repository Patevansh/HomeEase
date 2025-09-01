# HomeEase Vercel Deployment Guide

## Prerequisites
1. Vercel account
2. MongoDB Atlas database
3. Google OAuth credentials (optional)
4. Facebook OAuth credentials (optional)

## Backend Deployment

### 1. Deploy Backend to Vercel
1. Create a new Vercel project for the backend
2. Connect your GitHub repository
3. Set the root directory to `backend`
4. Configure environment variables in Vercel dashboard:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster-url/database?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
JWT_EXPIRE=7d
FRONTEND_URL=https://your-frontend-app.vercel.app
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PHONE=9999999999
ADMIN_PASSWORD=SecureAdminPassword123!
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### 2. Update OAuth Redirect URIs
Update your Google and Facebook OAuth apps with the new redirect URIs:
- Google: `https://your-backend-api.vercel.app/api/auth/google/callback`
- Facebook: `https://your-backend-api.vercel.app/api/auth/facebook/callback`

## Frontend Deployment

### 1. Update Frontend Environment Variables
Update the `/frontend/.env` file with your deployed backend URL:

```
REACT_APP_API_URL=https://your-backend-api.vercel.app/api
REACT_APP_GOOGLE_AUTH_URL=https://your-backend-api.vercel.app/api/auth/google
REACT_APP_FACEBOOK_AUTH_URL=https://your-backend-api.vercel.app/api/auth/facebook
REACT_APP_APP_NAME=HomeEase
REACT_APP_APP_VERSION=1.0.0
```

### 2. Build and Deploy Frontend
1. Build the frontend: `cd frontend && npm run build`
2. Create a new Vercel project for the frontend
3. Connect your GitHub repository
4. Set the root directory to `frontend`
5. Set the build command to `npm run build`
6. Set the output directory to `build`

## Post-Deployment Steps

### 1. Update CORS Settings
The backend automatically includes your frontend URL in CORS settings through the `FRONTEND_URL` environment variable.

### 2. Database Setup
Your MongoDB database will be automatically initialized with:
- Default admin user
- Required collections
- Indexes

### 3. Test the Deployment
1. Visit your frontend URL
2. Try logging in with the admin credentials
3. Test OAuth login flows
4. Test the main application features

## Environment Variables Reference

### Backend Required Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `FRONTEND_URL`: Your frontend domain

### Backend Optional Variables
- `ADMIN_*`: Default admin user settings
- `GOOGLE_*`: Google OAuth credentials
- `FACEBOOK_*`: Facebook OAuth credentials
- `EMAIL_*`: Email service configuration
- `STRIPE_*`: Payment processing

### Frontend Required Variables
- `REACT_APP_API_URL`: Backend base URL (without /api suffix)

### Frontend Optional Variables
- `REACT_APP_GOOGLE_AUTH_URL`: Google OAuth URL
- `REACT_APP_FACEBOOK_AUTH_URL`: Facebook OAuth URL

## Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure `FRONTEND_URL` is set correctly in backend. Localhost is always allowed for testing.
2. **Double /api in URLs**: Ensure `REACT_APP_API_URL` doesn't include `/api` suffix
3. **OAuth Not Working**: Check redirect URIs in OAuth provider settings
4. **Database Connection**: Verify MongoDB Atlas connection string
5. **Environment Variables**: Ensure all required variables are set in Vercel

### Logs
- Backend logs: Available in Vercel dashboard under Functions tab
- Frontend logs: Available in browser console

## Security Notes
1. Never commit real environment variables to Git
2. Use strong passwords for production
3. Enable MongoDB Atlas IP whitelist
4. Regularly rotate JWT secrets and API keys
5. Use HTTPS for all production URLs
