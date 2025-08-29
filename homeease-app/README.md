# HomeEase - Home Services Web Application

A modern, full-stack web application for booking home services with a clean UI and responsive design.

## 🚀 Features

### User Features
- **Modern Homepage** with hero section and service highlights
- **Service Discovery** with category filtering and search
- **User Authentication** with JWT-based login/register
- **Shopping Cart** functionality with persistent storage
- **Booking System** with date/time scheduling
- **User Profile** with booking history and settings
- **Responsive Design** optimized for all devices

### Technical Features
- **Full-Stack Architecture** with React frontend and Express.js backend
- **MongoDB Database** for data persistence
- **JWT Authentication** for secure user sessions
- **RESTful API** design with proper error handling
- **Modern UI/UX** with Tailwind CSS and Framer Motion animations
- **Context API** for state management
- **Persistent Cart** with localStorage

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **Axios** - HTTP client
- **React Hot Toast** - Elegant notifications

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Express Validator** - Request validation
- **Helmet** - Security middleware
- **Rate Limiting** - API protection

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HomeEase/homeease-app
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env with your configurations

# Seed the database
npm run seed

# Start the backend server
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Start the frontend development server
npm start
```

### 4. MongoDB Setup
Make sure MongoDB is running:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api

## 📱 Pages & Routes

### Public Routes
- **/** - Homepage with hero section and service overview
- **/services** - Service catalog with filtering and search
- **/login** - User authentication
- **/register** - New user registration

### Protected Routes
- **/checkout** - Shopping cart and booking process
- **/booking-confirmation** - Booking success page
- **/profile** - User dashboard with bookings and settings

## 🔧 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/homeease
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000

# Optional configurations
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🎨 Design Features

### UI/UX Highlights
- **Clean & Modern Design** with consistent color scheme
- **Mobile-First Responsive** design approach
- **Smooth Animations** using Framer Motion
- **Intuitive Navigation** with clear call-to-actions
- **Accessible Components** following WCAG guidelines
- **Loading States** and error handling

### Color Scheme
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Accent**: Yellow (#FCD34D)
- **Success**: Green (#10B981)
- **Error**: Red (#EF4444)

## 🔒 Authentication & Security

- **JWT-based Authentication** with secure token storage
- **Password Hashing** using bcryptjs
- **Protected Routes** with authentication middleware
- **Input Validation** on both client and server
- **CORS Configuration** for secure cross-origin requests
- **Rate Limiting** to prevent abuse

## 📊 Database Schema

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  role: String (customer/provider),
  address: String,
  isEmailVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}
```

### Service Schema
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  duration: Number,
  provider: ObjectId (ref: User),
  image: String,
  tags: [String],
  rating: Number,
  isActive: Boolean
}
```

### Booking Schema
```javascript
{
  user: ObjectId (ref: User),
  service: ObjectId (ref: Service),
  scheduledDate: Date,
  status: String,
  address: String,
  phone: String,
  notes: String,
  totalAmount: Number,
  rating: Number,
  review: String
}
```

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `GET /api/services/category/:category` - Get services by category
- `GET /api/services/search?q=query` - Search services

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PUT /api/bookings/:id/status` - Update booking status
- `POST /api/bookings/:id/review` - Add booking review

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 🧪 Demo Credentials

### Customer Account
- **Email**: customer@homeease.com
- **Password**: password123

### Service Provider Account
- **Email**: provider@homeease.com
- **Password**: password123

## 🛣️ Future Enhancements

### Planned Features
- **Real-time Chat** between customers and providers
- **Payment Integration** with Stripe/Razorpay
- **Push Notifications** for booking updates
- **Rating & Review System** for services
- **Advanced Booking Management** for providers
- **Social Login** with Google/Facebook
- **Email Notifications** for booking confirmations
- **Admin Dashboard** for platform management

### Technical Improvements
- **PWA Support** for mobile app-like experience
- **Image Upload** for services and profiles
- **Search Optimization** with Elasticsearch
- **Performance Monitoring** with logging
- **CI/CD Pipeline** with automated testing
- **Docker Containerization** for easy deployment

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, email support@homeease.com or join our Slack channel.

---

**Built with ❤️ by the HomeEase Team**
