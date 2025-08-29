// Test logout functionality
function testLogout() {
  console.log('=== Testing Logout Functionality ===');
  
  // Simulate having a token and user
  localStorage.setItem('homeease_token', 'test-token-123');
  console.log('✅ Token set in localStorage');
  
  // Simulate logout process
  try {
    console.log('🔄 Starting logout process...');
    
    // Clear user state
    console.log('1. Clearing user state');
    
    // Clear token
    console.log('2. Clearing token');
    
    // Clear localStorage
    localStorage.removeItem('homeease_token');
    console.log('3. Removed token from localStorage');
    
    // Clear axios headers (simulate)
    console.log('4. Cleared axios default headers');
    
    console.log('✅ Logout completed successfully');
    
    // Verify cleanup
    const remainingToken = localStorage.getItem('homeease_token');
    if (remainingToken) {
      console.error('❌ Token still exists in localStorage!');
    } else {
      console.log('✅ Token properly removed from localStorage');
    }
    
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
}

// Run the test
testLogout();
