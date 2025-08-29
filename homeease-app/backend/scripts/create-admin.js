const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@homeease.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user (password will be hashed by pre-save middleware)
    const admin = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@homeease.com',
      password: 'password123',
      phone: '9999999999',
      userType: 'admin',
      approvalStatus: 'approved'
    });

    await admin.save();
    console.log('Admin user created successfully');

    // Create some test pending providers
    const pendingProvider1 = new User({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.provider@test.com',
      password: 'password123',
      phone: '9876543210',
      userType: 'provider',
      approvalStatus: 'pending'
    });

    const pendingProvider2 = new User({
      firstName: 'Sarah',
      lastName: 'Wilson',
      email: 'sarah.provider@test.com',
      password: 'password123',
      phone: '9876543211',
      userType: 'provider',
      approvalStatus: 'pending'
    });

    await pendingProvider1.save();
    await pendingProvider2.save();
    console.log('Test pending providers created');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdmin();
