// Test data structure for ReviewModal
const sampleBooking = {
  "_id": "68b13ad077d66e272e9ce698",
  "bookingId": "HE1756445392220AXJD4",
  "status": "completed",
  "totalAmount": 599,
  "provider": {
    "_id": "68b10ef9ca2abf6c6418081b",
    "firstName": "Vansh",
    "lastName": "Patel",
    "email": "vanshp9824@gmail.com",
    "phone": "9054255770",
    "name": "Vansh Patel",
    "id": "68b10ef9ca2abf6c6418081b"
  },
  "services": [
    {
      "service": {
        "_id": "68b131ea7371ec2d1cc80896",
        "name": "Wiring",
        "category": "electrical",
        "price": 500
      },
      "quantity": 1,
      "price": 500,
      "_id": "68b13ad077d66e272e9ce699"
    }
  ]
};

// Test the data extraction logic from ReviewModal
function testReviewDataExtraction(booking) {
  console.log("Testing review data extraction...");
  
  // Validate booking data
  if (!booking || !booking.services || booking.services.length === 0) {
    console.error("❌ Invalid booking data");
    return;
  }

  // Get the first service from booking
  const serviceItem = booking.services[0];
  if (!serviceItem) {
    console.error("❌ No service found in booking");
    return;
  }

  // Extract service ID - handle different data structures
  let serviceId;
  if (serviceItem.service) {
    serviceId = typeof serviceItem.service === 'object' 
      ? serviceItem.service._id 
      : serviceItem.service;
  } else {
    console.error("❌ Service information not available");
    return;
  }

  // Extract provider ID - handle different data structures  
  let providerId;
  if (booking.provider) {
    providerId = typeof booking.provider === 'object' 
      ? booking.provider._id 
      : booking.provider;
  } else {
    console.error("❌ Provider information not available");
    return;
  }

  console.log("✅ Review data extraction successful:");
  console.log({
    bookingId: booking._id,
    serviceId,
    providerId,
    serviceName: serviceItem.service?.name,
    providerName: booking.provider?.name || `${booking.provider?.firstName} ${booking.provider?.lastName}`
  });
}

testReviewDataExtraction(sampleBooking);
