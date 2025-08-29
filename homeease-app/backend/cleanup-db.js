const mongoose = require('mongoose');
const User = require('./models/User');
const Service = require('./models/Service');
const Booking = require('./models/Booking');
require('dotenv').config();

const cleanupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get counts before cleanup
    const userCount = await User.countDocuments();
    const serviceCount = await Service.countDocuments();
    const bookingCount = await Booking.countDocuments();

    console.log('\n📊 Current Database State:');
    console.log(`👥 Users: ${userCount}`);
    console.log(`🛠️ Services: ${serviceCount}`);
    console.log(`📅 Bookings: ${bookingCount}`);

    // Confirm cleanup
    console.log('\n🚨 WARNING: This will delete ALL data from the database!');
    console.log('This includes:');
    console.log('- All user accounts (customers and providers)');
    console.log('- All services');
    console.log('- All bookings');
    console.log('- All authentication tokens will become invalid');

    // Delete all data
    console.log('\n🧹 Starting database cleanup...');

    // Delete all bookings first (references services and users)
    const deletedBookings = await Booking.deleteMany({});
    console.log(`🗑️ Deleted ${deletedBookings.deletedCount} bookings`);

    // Delete all services
    const deletedServices = await Service.deleteMany({});
    console.log(`🗑️ Deleted ${deletedServices.deletedCount} services`);

    // Delete all users
    const deletedUsers = await User.deleteMany({});
    console.log(`🗑️ Deleted ${deletedUsers.deletedCount} users`);

    // Verify cleanup
    const remainingUsers = await User.countDocuments();
    const remainingServices = await Service.countDocuments();
    const remainingBookings = await Booking.countDocuments();

    console.log('\n✅ Database cleanup completed!');
    console.log('\n📊 Final Database State:');
    console.log(`👥 Users: ${remainingUsers}`);
    console.log(`🛠️ Services: ${remainingServices}`);
    console.log(`📅 Bookings: ${remainingBookings}`);

    if (remainingUsers === 0 && remainingServices === 0 && remainingBookings === 0) {
      console.log('\n🎉 All data successfully removed from database!');
      console.log('💡 You can now start fresh with new user registrations and services.');
    } else {
      console.log('\n⚠️ Some data may still remain in the database.');
    }

  } catch (error) {
    console.error('❌ Error during database cleanup:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the cleanup
cleanupDatabase();
