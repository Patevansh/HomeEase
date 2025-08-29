// Test ReviewModal provider extraction logic
const sampleBookingWithProvider = {
  "_id": "68b13ad077d66e272e9ce698",
  "bookingId": "HE1756445392220AXJD4", 
  "provider": {
    "_id": "68b10ef9ca2abf6c6418081b",
    "firstName": "Vansh",
    "lastName": "Patel"
  },
  "services": [
    {
      "service": {
        "_id": "68b131ea7371ec2d1cc80896",
        "name": "Wiring",
        "provider": {
          "_id": "68b10ef9ca2abf6c6418081b",
          "firstName": "Vansh",
          "lastName": "Patel"
        }
      }
    }
  ]
};

const sampleBookingWithoutProvider = {
  "_id": "test123",
  "bookingId": "HE123456",
  "services": [
    {
      "service": {
        "_id": "service123",
        "name": "Test Service",
        "provider": {
          "_id": "provider123",
          "firstName": "John",
          "lastName": "Doe"
        }
      }
    }
  ]
};

function testProviderExtraction(booking, testName) {
  console.log(`\n=== Testing: ${testName} ===`);
  
  const serviceItem = booking.services[0];
  let providerId;
  
  if (booking.provider) {
    providerId = typeof booking.provider === 'object' 
      ? booking.provider._id 
      : booking.provider;
    console.log("✅ Provider found at booking level:", providerId);
  } else if (serviceItem.service && serviceItem.service.provider) {
    providerId = typeof serviceItem.service.provider === 'object'
      ? serviceItem.service.provider._id
      : serviceItem.service.provider;
    console.log("✅ Provider found at service level:", providerId);
  } else {
    console.log("❌ Provider information not available");
    return;
  }
  
  console.log("Provider ID extracted:", providerId);
}

testProviderExtraction(sampleBookingWithProvider, "Booking with provider at booking level");
testProviderExtraction(sampleBookingWithoutProvider, "Booking with provider only at service level");
