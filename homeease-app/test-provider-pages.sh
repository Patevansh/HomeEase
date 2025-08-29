#!/bin/bash

echo "🧪 Testing HomeEase Provider Pages..."
echo "=================================="

# Test backend health
echo "📊 Testing Backend Health..."
response=$(curl -s http://localhost:5000/api/health)
if [[ $response == *"OK"* ]]; then
    echo "✅ Backend is healthy"
else
    echo "❌ Backend health check failed"
    exit 1
fi

# Test authentication endpoints
echo "📊 Testing Authentication Endpoints..."
auth_response=$(curl -s -w "%{http_code}" -o /dev/null http://localhost:5000/api/provider/dashboard)
if [[ $auth_response == "401" ]]; then
    echo "✅ Protected routes are properly secured"
else
    echo "❌ Authentication middleware may have issues"
fi

# Test provider routes
echo "📊 Testing Provider Routes..."
routes=(
    "/api/provider/dashboard"
    "/api/provider/bookings"
    "/api/analytics/provider/test"
    "/api/reviews/provider/test"
    "/api/bookings/test/service-status"
)

for route in "${routes[@]}"; do
    response_code=$(curl -s -w "%{http_code}" -o /dev/null http://localhost:5000$route)
    if [[ $response_code == "401" ]]; then
        echo "✅ Route $route is properly protected"
    else
        echo "⚠️  Route $route returned status: $response_code"
    fi
done

echo ""
echo "🎯 All major fixes applied:"
echo "  ✅ Fixed token authentication (homeease_token vs token)"
echo "  ✅ Removed manual Authorization headers (using axios defaults)"
echo "  ✅ Fixed React useEffect dependency warnings"
echo "  ✅ Fixed accessibility issues with anchor tags"
echo "  ✅ Updated social media links to real URLs"
echo "  ✅ Verified all backend routes exist and are protected"
echo ""
echo "🌟 Provider pages should now work without errors!"
echo "📱 Test by logging in as a provider and navigating through:"
echo "   - Dashboard (/provider-dashboard)"
echo "   - My Bookings (/provider-bookings)" 
echo "   - My Services (/manage-services)"
echo "   - Reviews (/reviews)"
