const mongoose = require('mongoose');
const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
require('dotenv').config();

async function clearUsersAndProviders() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Delete all users except admin
    const usersDeleted = await User.deleteMany({ 
      userType: { $in: ['user', 'provider'] } 
    });
    console.log(`🗑️  Deleted ${usersDeleted.deletedCount} users and providers`);

    // Delete all services
    const servicesDeleted = await Service.deleteMany({});
    console.log(`🗑️  Deleted ${servicesDeleted.deletedCount} services`);

    // Delete all bookings
    const bookingsDeleted = await Booking.deleteMany({});
    console.log(`🗑️  Deleted ${bookingsDeleted.deletedCount} bookings`);

    // Verify admin still exists
    const adminCount = await User.countDocuments({ userType: 'admin' });
    console.log(`👑 Admin users remaining: ${adminCount}`);

    console.log('\n✨ Database cleanup completed successfully!');
    console.log('🔒 Admin user preserved');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

clearUsersAndProviders();
