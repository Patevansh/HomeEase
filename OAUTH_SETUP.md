# OAuth Setup Guide for HomeEase

## Google OAuth Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select an existing one
3. **Enable Google+ API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. **Create OAuth credentials**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Name: "HomeEase OAuth"
   - Authorized redirect URIs: `http://localhost:5000/api/auth/google/callback`
5. **Copy the Client ID and Client Secret**

## Facebook OAuth Setup

1. **Go to Facebook Developers**: https://developers.facebook.com/
2. **Create a new app**:
   - Click "Create App"
   - Choose "Consumer" as app type
   - App name: "HomeEase"
3. **Add Facebook Login product**:
   - Go to "Add a Product" and select "Facebook Login"
   - Choose "Web"
4. **Configure OAuth redirect URIs**:
   - Go to "Facebook Login" > "Settings"
   - Valid OAuth Redirect URIs: `http://localhost:5000/api/auth/facebook/callback`
5. **Get App ID and App Secret**:
   - Go to "Settings" > "Basic"
   - Copy App ID and App Secret

## Update .env file

Replace the placeholder values in `/backend/.env`:

```env
# OAuth Configuration
GOOGLE_CLIENT_ID=your_actual_google_client_id_here
GOOGLE_CLIENT_SECRET=your_actual_google_client_secret_here
FACEBOOK_APP_ID=your_actual_facebook_app_id_here
FACEBOOK_APP_SECRET=your_actual_facebook_app_secret_here
```

## Testing

After updating the credentials:
1. Restart the backend server: `npm start`
2. Go to http://localhost:3000/login
3. Click "Google" or "Facebook" buttons
4. You should be redirected to the respective OAuth provider

## Troubleshooting

- Make sure redirect URIs match exactly
- Check that the APIs are enabled in Google Cloud Console
- Verify the app is in development mode for Facebook (allows test users)
- Check browser developer tools for any CORS or network errors
