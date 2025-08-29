const mongoose = require('mongoose');
const Service = require('../models/Service');
const User = require('../models/User');
require('dotenv').config();

async function createTestService() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Create a test provider first
    const testProvider = new User({
      firstName: 'Test',
      lastName: 'Provider',
      email: 'testprovider@example.com',
      password: 'password123',
      phone: '9876543210',
      userType: 'provider',
      approvalStatus: 'approved'
    });

    await testProvider.save();
    console.log('✅ Test provider created');

    // Create a test service
    const testService = new Service({
      name: 'Basic Plumbing Repair',
      description: 'Fix leaky taps, unclog drains, and basic plumbing repairs',
      category: 'plumbing',
      price: 299,
      duration: 60,
      provider: testProvider._id,
      isActive: true,
      image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    });

    await testService.save();
    console.log('✅ Test service created');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

createTestService();
