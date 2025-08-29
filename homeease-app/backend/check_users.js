const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/homeease')
  .then(async () => {
    console.log('Connected to MongoDB');
    const users = await User.find({}, 'email userType firstName lastName').limit(10);
    console.log('Sample users:');
    users.forEach(user => {
      console.log(`${user.email} - ${user.userType} (${user.firstName} ${user.lastName})`);
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
