# 🏠 HomeEase - Home Services Platform

![HomeEase Logo](https://img.shields.io/badge/HomeEase-Home%20Services%20Platform-blue?style=for-the-badge)

A comprehensive home services platform that connects homeowners with trusted service providers for various household needs like cleaning, plumbing, electrical work, and more.

## 🌟 Features

### 👥 Multi-Role System
- **Customers**: Book services, manage bookings, leave reviews
- **Service Providers**: Manage services, handle bookings, track earnings
- **Admin**: Complete platform management and analytics

### 🔐 Authentication & Security
- **JWT-based Authentication** with secure token management
- **Google OAuth Integration** for seamless login
- **Facebook OAuth Integration** for social authentication
- **Auto Admin Creation** - Admin account created automatically if not exists
- **Role-based Access Control** with protected routes
- **Password Security** with bcrypt hashing

### 📅 Booking System
- **Real-time Service Booking** with availability checking
- **Multi-step Booking Process** with service selection and scheduling
- **Booking Status Management** (pending, confirmed, in-progress, completed, cancelled)
- **Email Notifications** for booking updates (configurable)
- **Booking History** for all user types

### 💰 Payment Integration
- **Stripe Payment Gateway** integration
- **Secure Payment Processing** with webhook support
- **Payment History** and transaction tracking
- **Revenue Analytics** for providers and admin

### ⭐ Review & Rating System
- **Customer Reviews** with star ratings
- **Provider Rating Display** on service listings
- **Review Management** for admin moderation
- **Rating Analytics** and insights

### 📊 Analytics Dashboard
- **Admin Analytics**: 
  - Total revenue from completed bookings
  - Provider performance statistics
  - Top performing services
  - Recent booking activity
  - User growth metrics
- **Provider Analytics**:
  - Personal earnings tracking
  - Service performance
  - Customer feedback analysis

### 🔧 Service Management
- **Dynamic Service Creation** by providers
- **Service Categories** and pricing management
- **Service Status Control** (active/inactive)
- **Image Upload** for service showcasing
- **Service Search** and filtering

### 🌐 Modern UI/UX
- **Responsive Design** with Tailwind CSS
- **Smooth Animations** with Framer Motion
- **Interactive Components** with React
- **Toast Notifications** for user feedback
- **Loading States** and error handling

## 🚀 Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Passport.js** for OAuth strategies
- **Bcrypt** for password hashing
- **Express Validator** for input validation
- **Helmet** for security headers
- **Rate Limiting** for API protection
- **CORS** for cross-origin requests

### Frontend
- **React 18** with functional components
- **React Router DOM** for navigation
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Hot Toast** for notifications
- **React Hook Form** for form management
- **Axios** for API calls
- **React Query** for data fetching
- **Date-fns** for date manipulation

### Database
- **MongoDB** as primary database
- **Mongoose** for object modeling
- **Aggregation Pipelines** for analytics
- **Indexing** for performance optimization

### DevOps & Tools
- **Git** for version control
- **npm** for package management
- **Nodemon** for development
- **Jest** for testing
- **dotenv** for environment management

## 📁 Project Structure

```
HomeEase/
├── homeease-app/
│   ├── backend/                 # Express.js Backend
│   │   ├── config/             # Configuration files
│   │   │   └── passport.js     # OAuth strategies
│   │   ├── models/             # MongoDB models
│   │   │   ├── User.js         # User schema
│   │   │   ├── Service.js      # Service schema
│   │   │   ├── Booking.js      # Booking schema
│   │   │   └── Review.js       # Review schema
│   │   ├── routes/             # API routes
│   │   │   ├── auth.js         # Authentication routes
│   │   │   ├── users.js        # User management
│   │   │   ├── services.js     # Service operations
│   │   │   ├── bookings.js     # Booking management
│   │   │   ├── reviews.js      # Review system
│   │   │   ├── admin.js        # Admin operations
│   │   │   ├── provider.js     # Provider operations
│   │   │   └── analytics.js    # Analytics endpoints
│   │   ├── middleware/         # Custom middleware
│   │   ├── utils/              # Utility functions
│   │   ├── server.js           # Main server file
│   │   ├── package.json        # Backend dependencies
│   │   └── .env                # Environment variables
│   │
│   └── frontend/               # React Frontend
│       ├── public/             # Static assets
│       ├── src/
│       │   ├── components/     # Reusable components
│       │   │   ├── layout/     # Layout components
│       │   │   ├── auth/       # Authentication components
│       │   │   ├── booking/    # Booking components
│       │   │   └── common/     # Common UI components
│       │   ├── pages/          # Page components
│       │   │   ├── Home.js     # Landing page
│       │   │   ├── Login.js    # Login page
│       │   │   ├── Register.js # Registration
│       │   │   ├── Services.js # Service listing
│       │   │   ├── Checkout.js # Booking checkout
│       │   │   ├── AdminDashboard.js
│       │   │   ├── ProviderDashboard.js
│       │   │   └── UserBookings.js
│       │   ├── contexts/       # React contexts
│       │   │   └── AuthContext.js
│       │   ├── utils/          # Utility functions
│       │   ├── App.js          # Main App component
│       │   └── index.js        # Entry point
│       ├── package.json        # Frontend dependencies
│       └── tailwind.config.js  # Tailwind configuration
│
├── OAUTH_SETUP.md              # OAuth setup guide
└── README.md                   # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HomeEase/homeease-app
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update environment variables in .env:
# - MONGODB_URI
# - JWT_SECRET
# - OAuth credentials (optional)
# - Email settings (optional)
# - Stripe keys (optional)

# Start MongoDB service
# On Linux: sudo systemctl start mongod
# On macOS: brew services start mongodb-community
# On Windows: net start MongoDB

# Start the backend server
npm start

# For development with auto-restart
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017/homeease

## 🔑 Default Admin Account

The system automatically creates an admin account on first startup:

- **Email**: admin@homeease.com
- **Password**: admin123
- **Role**: Admin

⚠️ **Important**: Change the default admin credentials in production!

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/facebook` - Facebook OAuth login
- `GET /api/auth/oauth-status` - Check OAuth configuration

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service (provider only)
- `PUT /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/:id` - Update booking status
- `GET /api/bookings/provider` - Get provider bookings

### Reviews
- `GET /api/reviews` - Get reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Admin
- `GET /api/admin/analytics` - Get platform analytics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id` - Update user status
- `GET /api/admin/providers/pending` - Get pending providers

## 🔧 Configuration

### Environment Variables (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/homeease

# JWT
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d

# Server
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Admin Auto-Creation
ADMIN_FIRST_NAME=Admin
ADMIN_LAST_NAME=User
ADMIN_EMAIL=admin@homeease.com
ADMIN_PHONE=9999999999
ADMIN_PASSWORD=admin123

# OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Stripe (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🚀 Deployment

### Backend Deployment
1. Set NODE_ENV=production in .env
2. Configure production MongoDB URI
3. Set secure JWT_SECRET
4. Configure OAuth for production domains
5. Deploy to your preferred platform (Heroku, AWS, etc.)

### Frontend Deployment
1. Update API endpoints for production
2. Build the project: `npm run build`
3. Deploy build folder to static hosting (Netlify, Vercel, etc.)

## 🔐 Security Features

- **JWT Authentication** with secure token storage
- **Password Hashing** with bcrypt (10 rounds)
- **Rate Limiting** to prevent API abuse
- **CORS Configuration** for secure cross-origin requests
- **Helmet.js** for security headers
- **Input Validation** with express-validator
- **SQL Injection Prevention** with MongoDB ODM
- **XSS Protection** through proper data sanitization

## 📈 Analytics Features

### Admin Analytics
- **Revenue Tracking**: Total revenue from completed bookings
- **Provider Statistics**: Active providers, top performers
- **Service Analytics**: Most popular services, revenue by service
- **User Metrics**: Total users, growth trends
- **Booking Insights**: Booking status distribution, recent activity

### Provider Analytics
- **Earnings Dashboard**: Personal revenue tracking
- **Booking Management**: Service-wise booking analysis
- **Performance Metrics**: Customer ratings and feedback
- **Service Analytics**: Individual service performance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Email: support@homeease.com
- Documentation: Check the `/docs` folder for detailed guides

## 🔄 Version History

- **v1.0.0** - Initial release with core features
  - User authentication and registration
  - Service booking system
  - Review and rating system
  - Admin dashboard
  - Provider management
  - OAuth integration
  - Payment processing
  - Analytics dashboard

## 🛣️ Roadmap

### Upcoming Features
- [ ] Mobile app development
- [ ] Advanced search and filtering
- [ ] Real-time chat system
- [ ] Push notifications
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] API rate limiting by user
- [ ] Caching layer implementation
- [ ] Database optimization
- [ ] Microservices architecture

---

**Made with ❤️ by the HomeEase Team**
- Service categories with intuitive icons
- Responsive design for all devices

### 🔧 Services Page
- Categorized services (Plumbing, Electrical, Cleaning)
- Service cards with images, descriptions, and pricing
- Shopping cart functionality
- Real-time search and filtering
- Add/remove services with visual feedback

### 🛒 Checkout Process
- Comprehensive booking form
- Date and time selection
- Customer information collection
- Service address details
- Multiple payment options (COD, Card, UPI)
- Promo code functionality
- Order summary with pricing breakdown

### 🔐 Authentication
- User type selection (Customer/Service Provider)
- Login and signup forms
- Social media integration (Google/Facebook)
- Clean modal-based authentication flow

### 📱 Modern UI/UX
- Clean, minimalistic design
- Smooth animations and transitions
- Color-coded status indicators
- Intuitive navigation
- Mobile-first responsive design

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with modern design principles
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)
- **Storage**: LocalStorage for cart and user data

## Project Structure

```
HomeEase/
├── index.html          # Homepage
├── services.html       # Services listing page
├── checkout.html       # Checkout and booking page
├── styles.css          # Main stylesheet
├── services.css        # Services page specific styles
├── checkout.css        # Checkout page specific styles
├── script.js           # Main JavaScript functionality
├── services.js         # Services page functionality
├── checkout.js         # Checkout page functionality
└── README.md           # Project documentation
```

## Getting Started

1. **Clone or download the project files**
2. **Open `index.html` in a web browser**
3. **Navigate through the application:**
   - Browse services on the homepage
   - Click "Services" to view detailed service listings
   - Add services to cart
   - Proceed to checkout
   - Complete the booking process

## Key Features Implementation

### Search Functionality
- Real-time search across service names and descriptions
- Visual feedback with opacity changes
- Works on both homepage and services page

### Shopping Cart
- Persistent cart using localStorage
- Real-time updates and totals
- Visual feedback for added items
- Sidebar cart with remove functionality

### Booking Process
- Multi-step form with validation
- Date/time selection with constraints
- Payment method selection
- Promo code system
- Booking confirmation with unique ID

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Touch-friendly interface
- Optimized for various screen sizes

## Sample Promo Codes

- `FIRST10` - 10% discount
- `SAVE50` - ₹50 off
- `WELCOME` - 15% discount

## Future Enhancements

- User dashboard for managing bookings
- Service provider dashboard
- Real-time chat support
- Payment gateway integration
- Booking history and tracking
- Rating and review system
- Location-based service availability

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Development Notes

- Uses modern CSS features (Grid, Flexbox, Custom Properties)
- Vanilla JavaScript for better performance
- No external frameworks for minimal dependencies
- Progressive enhancement approach
- Semantic HTML structure for accessibility

---

Built with ❤️ for making home services accessible and easy to book.
