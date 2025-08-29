// Global variables
let currentAuthMode = 'login';
let selectedUserType = null;

// Mobile menu functionality
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
}

// Smooth scrolling
function scrollToServices() {
    document.getElementById('services').scrollIntoView({
        behavior: 'smooth'
    });
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const serviceCards = document.querySelectorAll('.service-card');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        serviceCards.forEach(card => {
            const serviceTitle = card.querySelector('h3').textContent.toLowerCase();
            const serviceDesc = card.querySelector('p').textContent.toLowerCase();
            
            if (serviceTitle.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = searchTerm ? '0.3' : '1';
            }
        });
        
        // Show all services if search is empty
        if (!searchTerm) {
            serviceCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
        }
    });
});

// Service selection
function selectService(serviceType) {
    console.log('Selected service:', serviceType);
    
    // Redirect to services page
    window.location.href = 'services.html';
}

// Auth modal functions
function openAuthModal(mode = 'login') {
    currentAuthMode = mode;
    const modal = document.getElementById('authModal');
    modal.style.display = 'block';
    
    // Show user type selection first for signup, login directly for login
    if (mode === 'signup') {
        showUserTypeSelection();
    } else {
        showLogin();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
    
    // Reset steps
    hideAllAuthSteps();
    selectedUserType = null;
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

function hideAllAuthSteps() {
    const steps = document.querySelectorAll('.auth-step');
    steps.forEach(step => step.style.display = 'none');
}

function showUserTypeSelection() {
    hideAllAuthSteps();
    document.getElementById('userTypeStep').style.display = 'block';
}

function selectUserType(type) {
    selectedUserType = type;
    
    if (currentAuthMode === 'signup') {
        showSignup();
    } else {
        showLogin();
    }
}

function showLogin() {
    hideAllAuthSteps();
    document.getElementById('loginStep').style.display = 'block';
}

function showSignup() {
    hideAllAuthSteps();
    document.getElementById('signupStep').style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeAuthModal();
    }
}

// Form submissions
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.querySelector('#loginStep .auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Signup form
    const signupForm = document.querySelector('#signupStep .auth-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSignup();
        });
    }
});

function handleLogin() {
    const email = document.querySelector('#loginStep input[type="email"]').value;
    const password = document.querySelector('#loginStep input[type="password"]').value;
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Logging in...', 'info');
    
    setTimeout(() => {
        // Simulate successful login
        showNotification('Login successful! Welcome back.', 'success');
        closeAuthModal();
        
        // Update UI for logged-in state
        updateUIForLoggedInUser(email);
    }, 1500);
}

function handleSignup() {
    const firstName = document.querySelector('#signupStep input[placeholder="First Name"]').value;
    const lastName = document.querySelector('#signupStep input[placeholder="Last Name"]').value;
    const email = document.querySelector('#signupStep input[type="email"]').value;
    const phone = document.querySelector('#signupStep input[type="tel"]').value;
    const password = document.querySelector('#signupStep input[placeholder="Password"]').value;
    const confirmPassword = document.querySelector('#signupStep input[placeholder="Confirm Password"]').value;
    
    // Validation
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Simulate API call
    showNotification('Creating account...', 'info');
    
    setTimeout(() => {
        // Simulate successful signup
        showNotification(`Account created successfully! Welcome, ${firstName}.`, 'success');
        closeAuthModal();
        
        // Update UI for logged-in state
        updateUIForLoggedInUser(email);
    }, 1500);
}

function updateUIForLoggedInUser(email) {
    // Update auth buttons
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <div class="user-menu">
            <span class="user-email">${email}</span>
            <button class="btn btn-outline" onclick="logout()">Logout</button>
        </div>
    `;
}

function logout() {
    // Reset UI
    const authButtons = document.querySelector('.auth-buttons');
    authButtons.innerHTML = `
        <button class="btn btn-outline" onclick="openAuthModal('login')">Login</button>
        <button class="btn btn-primary" onclick="openAuthModal('signup')">Sign Up</button>
    `;
    
    showNotification('Logged out successfully', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Social login handlers
document.addEventListener('DOMContentLoaded', function() {
    // Google login
    const googleButtons = document.querySelectorAll('.btn-google');
    googleButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Google login coming soon!', 'info');
        });
    });
    
    // Facebook login
    const facebookButtons = document.querySelectorAll('.btn-facebook');
    facebookButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('Facebook login coming soon!', 'info');
        });
    });
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const target = this.getAttribute('href');
            if (target.startsWith('#')) {
                const section = document.querySelector(target);
                if (section) {
                    section.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Add selected state styles for service cards
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .service-card.selected {
            border-color: #667eea !important;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
            transform: translateY(-8px);
            box-shadow: 0 12px 40px rgba(102, 126, 234, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});
