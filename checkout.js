// Checkout page functionality
let cart = [];
let serviceCharges = 99;
let promoDiscount = 0;

// Initialize checkout page
document.addEventListener('DOMContentLoaded', function() {
    loadCartData();
    setMinDate();
    setupPaymentMethodToggle();
    setupFormValidation();
});

// Load cart data from localStorage
function loadCartData() {
    const savedCart = localStorage.getItem('homeease_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        displayOrderSummary();
    } else {
        // Redirect to services if no cart data
        window.location.href = 'services.html';
    }
}

// Display order summary
function displayOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const subtotal = document.getElementById('subtotal');
    const serviceChargesEl = document.getElementById('serviceCharges');
    const finalTotal = document.getElementById('finalTotal');
    
    // Display cart items
    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="empty-cart">No items in cart</p>';
        return;
    }
    
    orderItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <h4>${item.name}</h4>
            </div>
            <div class="order-item-price">₹${item.price}</div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotalAmount + serviceCharges - promoDiscount;
    
    subtotal.textContent = `₹${subtotalAmount}`;
    serviceChargesEl.textContent = `₹${serviceCharges}`;
    finalTotal.textContent = `₹${total}`;
}

// Set minimum date to today
function setMinDate() {
    const dateInput = document.getElementById('bookingDate');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const minDate = tomorrow.toISOString().split('T')[0];
    dateInput.min = minDate;
    dateInput.value = minDate; // Set default to tomorrow
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    const cardDetails = document.getElementById('cardDetails');
    const upiDetails = document.getElementById('upiDetails');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Hide all payment details
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'none';
            
            // Show relevant payment details
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else if (this.value === 'upi') {
                upiDetails.style.display = 'block';
            }
        });
    });
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoInput');
    const promoCode = promoInput.value.trim().toUpperCase();
    
    // Sample promo codes
    const promoCodes = {
        'FIRST10': 10, // 10% discount
        'SAVE50': 50,  // ₹50 off
        'WELCOME': 15  // 15% discount
    };
    
    if (promoCodes[promoCode]) {
        let discount = promoCodes[promoCode];
        const subtotalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        
        // Calculate discount
        if (discount <= 25) { // Percentage discount
            promoDiscount = Math.round((subtotalAmount * discount) / 100);
        } else { // Fixed amount discount
            promoDiscount = discount;
        }
        
        displayOrderSummary();
        showNotification(`Promo code applied! You saved ₹${promoDiscount}`, 'success');
        promoInput.disabled = true;
        
        // Add discount row to totals
        const orderTotals = document.querySelector('.order-totals');
        const discountRow = document.createElement('div');
        discountRow.className = 'total-row discount-row';
        discountRow.innerHTML = `
            <span>Discount (${promoCode})</span>
            <span style="color: #4CAF50;">-₹${promoDiscount}</span>
        `;
        orderTotals.insertBefore(discountRow, orderTotals.querySelector('.total-final'));
        
    } else {
        showNotification('Invalid promo code', 'error');
    }
}

// Setup form validation
function setupFormValidation() {
    const inputs = document.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const fieldGroup = field.closest('.form-group');
    
    clearValidation({ target: field });
    
    if (!field.value.trim()) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Specific validations
    switch (field.type) {
        case 'email':
            if (!isValidEmail(field.value)) {
                showFieldError(field, 'Please enter a valid email');
                return false;
            }
            break;
        case 'tel':
            if (!isValidPhone(field.value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
            break;
        case 'text':
            if (field.id === 'pincode' && !isValidPincode(field.value)) {
                showFieldError(field, 'Please enter a valid pincode');
                return false;
            }
            break;
    }
    
    fieldGroup.classList.add('success');
    return true;
}

// Clear field validation
function clearValidation(e) {
    const field = e.target;
    const fieldGroup = field.closest('.form-group');
    const existingError = fieldGroup.querySelector('.validation-message');
    
    if (existingError) {
        existingError.remove();
    }
    
    fieldGroup.classList.remove('error', 'success');
}

// Show field error
function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');
    fieldGroup.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-message';
    errorElement.textContent = message;
    fieldGroup.appendChild(errorElement);
}

// Validation helpers
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
}

function isValidPincode(pincode) {
    return /^\d{6}$/.test(pincode);
}

// Confirm booking
function confirmBooking() {
    if (!validateAllFields()) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.classList.add('loading');
    checkoutBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate booking ID
        const bookingId = '#HE' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Show confirmation modal
        showConfirmationModal(bookingId);
        
        // Clear cart
        localStorage.removeItem('homeease_cart');
        
        checkoutBtn.classList.remove('loading');
        checkoutBtn.disabled = false;
        
    }, 2000);
}

// Validate all fields
function validateAllFields() {
    const requiredFields = document.querySelectorAll('input[required], select[required]');
    let allValid = true;
    
    requiredFields.forEach(field => {
        const isValid = validateField({ target: field });
        if (!isValid) allValid = false;
    });
    
    return allValid;
}

// Show confirmation modal
function showConfirmationModal(bookingId) {
    const modal = document.getElementById('confirmationModal');
    const bookingIdElement = document.getElementById('bookingId');
    
    bookingIdElement.textContent = bookingId;
    modal.style.display = 'block';
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

// Modal actions
function goToHome() {
    window.location.href = 'index.html';
}

function bookMoreServices() {
    window.location.href = 'services.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('confirmationModal');
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Format phone number input
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) value = value.substr(0, 10);
            e.target.value = value;
        });
    }
    
    // Format pincode input
    const pincodeInput = document.getElementById('pincode');
    if (pincodeInput) {
        pincodeInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 6) value = value.substr(0, 6);
            e.target.value = value;
        });
    }
});

// Auto-fill user data if logged in (placeholder for future implementation)
function autoFillUserData() {
    // This would typically fetch user data from authentication state
    // For now, it's just a placeholder
    const userData = localStorage.getItem('homeease_user');
    if (userData) {
        const user = JSON.parse(userData);
        
        if (user.firstName) document.getElementById('firstName').value = user.firstName;
        if (user.lastName) document.getElementById('lastName').value = user.lastName;
        if (user.email) document.getElementById('email').value = user.email;
        if (user.phone) document.getElementById('phone').value = user.phone;
    }
}

// Call auto-fill on page load
document.addEventListener('DOMContentLoaded', autoFillUserData);

// Save booking data for future reference
function saveBookingData(bookingId) {
    const bookingData = {
        id: bookingId,
        date: new Date().toISOString(),
        services: cart,
        customerInfo: {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value
        },
        address: {
            street: document.getElementById('address').value,
            city: document.getElementById('city').value,
            pincode: document.getElementById('pincode').value,
            landmark: document.getElementById('landmark').value
        },
        schedule: {
            date: document.getElementById('bookingDate').value,
            time: document.getElementById('bookingTime').value
        },
        payment: document.querySelector('input[name="payment"]:checked').value,
        total: cart.reduce((sum, item) => sum + item.price, 0) + serviceCharges - promoDiscount,
        status: 'confirmed'
    };
    
    // Save to localStorage (in a real app, this would go to a database)
    const existingBookings = JSON.parse(localStorage.getItem('homeease_bookings') || '[]');
    existingBookings.push(bookingData);
    localStorage.setItem('homeease_bookings', JSON.stringify(existingBookings));
    
    return bookingData;
}

// Update confirmBooking function to save data
const originalConfirmBooking = confirmBooking;
confirmBooking = function() {
    if (!validateAllFields()) {
        showNotification('Please fill in all required fields correctly', 'error');
        return;
    }
    
    const checkoutBtn = document.querySelector('.checkout-btn');
    checkoutBtn.classList.add('loading');
    checkoutBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Generate booking ID
        const bookingId = '#HE' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Save booking data
        saveBookingData(bookingId);
        
        // Show confirmation modal
        showConfirmationModal(bookingId);
        
        // Clear cart
        localStorage.removeItem('homeease_cart');
        
        checkoutBtn.classList.remove('loading');
        checkoutBtn.disabled = false;
        
    }, 2000);
};
