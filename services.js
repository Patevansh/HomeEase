// Cart functionality
let cart = [];
let cartTotal = 0;

// Add to cart function
function addToCart(serviceId, serviceName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.id === serviceId);
    
    if (existingItem) {
        showNotification('Item already in cart!', 'info');
        return;
    }
    
    // Add item to cart
    const cartItem = {
        id: serviceId,
        name: serviceName,
        price: price
    };
    
    cart.push(cartItem);
    updateCartUI();
    
    // Add visual feedback to service item
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        if (item.onclick.toString().includes(serviceId)) {
            item.classList.add('added');
            const btn = item.querySelector('.service-btn');
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            btn.disabled = true;
        }
    });
    
    showNotification(`${serviceName} added to cart!`, 'success');
}

// Remove from cart function
function removeFromCart(serviceId) {
    cart = cart.filter(item => item.id !== serviceId);
    updateCartUI();
    
    // Remove visual feedback from service item
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        if (item.onclick.toString().includes(serviceId)) {
            item.classList.remove('added');
            const btn = item.querySelector('.service-btn');
            btn.innerHTML = '<i class="fas fa-plus"></i> Add';
            btn.disabled = false;
        }
    });
    
    showNotification('Item removed from cart', 'info');
}

// Update cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Update cart count
    cartCount.textContent = cart.length;
    if (cart.length === 0) {
        cartCount.classList.add('hidden');
    } else {
        cartCount.classList.remove('hidden');
    }
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = total;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">₹${item.price}</div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay') || createCartOverlay();
    
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when cart is open
    if (cartSidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Create cart overlay
function createCartOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.onclick = toggleCart;
    document.body.appendChild(overlay);
    return overlay;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Store cart data in localStorage for checkout page
    localStorage.setItem('homeease_cart', JSON.stringify(cart));
    
    // For now, show a success message
    showNotification('Redirecting to checkout...', 'info');
    
    setTimeout(() => {
        // In a real app, you would redirect to checkout.html
        window.location.href = 'checkout.html';
    }, 1000);
}

// Search functionality for services page
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const serviceItems = document.querySelectorAll('.service-item');
            const categorySection = document.querySelectorAll('.category-section');
            
            serviceItems.forEach(item => {
                const serviceName = item.querySelector('h3').textContent.toLowerCase();
                const serviceDesc = item.querySelector('p').textContent.toLowerCase();
                
                if (serviceName.includes(searchTerm) || serviceDesc.includes(searchTerm)) {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    item.style.opacity = searchTerm ? '0.3' : '1';
                }
            });
            
            // Hide/show category sections based on visible items
            if (searchTerm) {
                categorySection.forEach(section => {
                    const visibleItems = section.querySelectorAll('.service-item[style*="opacity: 1"], .service-item:not([style*="opacity"])');
                    if (visibleItems.length === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                });
            } else {
                categorySection.forEach(section => {
                    section.style.display = 'block';
                });
            }
        });
    }
});

// Close cart when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(e) {
        const cartSidebar = document.getElementById('cartSidebar');
        const cartToggle = document.getElementById('cartToggle');
        
        if (cartSidebar.classList.contains('open') && 
            !cartSidebar.contains(e.target) && 
            !cartToggle.contains(e.target)) {
            toggleCart();
        }
    });
});

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    
    // Load cart from localStorage if exists
    const savedCart = localStorage.getItem('homeease_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
        
        // Update visual state of added items
        cart.forEach(item => {
            const serviceItems = document.querySelectorAll('.service-item');
            serviceItems.forEach(serviceItem => {
                if (serviceItem.onclick && serviceItem.onclick.toString().includes(item.id)) {
                    serviceItem.classList.add('added');
                    const btn = serviceItem.querySelector('.service-btn');
                    btn.innerHTML = '<i class="fas fa-check"></i> Added';
                    btn.disabled = true;
                }
            });
        });
    }
});

// Save cart to localStorage whenever it changes
function saveCartToStorage() {
    localStorage.setItem('homeease_cart', JSON.stringify(cart));
}

// Update the addToCart and removeFromCart functions to save to storage
const originalAddToCart = addToCart;
addToCart = function(serviceId, serviceName, price) {
    originalAddToCart(serviceId, serviceName, price);
    saveCartToStorage();
};

const originalRemoveFromCart = removeFromCart;
removeFromCart = function(serviceId) {
    originalRemoveFromCart(serviceId);
    saveCartToStorage();
};

// Service filtering by category
function filterByCategory(category) {
    const allSections = document.querySelectorAll('.category-section');
    
    allSections.forEach(section => {
        const sectionTitle = section.querySelector('h2').textContent.toLowerCase();
        
        if (category === 'all' || sectionTitle.includes(category.toLowerCase())) {
            section.style.display = 'block';
        } else {
            section.style.display = 'none';
        }
    });
}

// Add category filter buttons (can be added to HTML if needed)
function createCategoryFilters() {
    const categories = ['All', 'Plumbing', 'Electrical', 'Cleaning', 'Carpentry'];
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'category-filters';
    filtersContainer.innerHTML = `
        <div class="container">
            <div class="filter-buttons">
                ${categories.map(cat => `
                    <button class="filter-btn ${cat === 'All' ? 'active' : ''}" 
                            onclick="filterByCategory('${cat === 'All' ? 'all' : cat}')">
                        ${cat}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    // Insert before service categories
    const serviceCategories = document.querySelector('.service-categories');
    serviceCategories.parentNode.insertBefore(filtersContainer, serviceCategories);
}

// Smooth scroll to category
function scrollToCategory(categoryName) {
    const sections = document.querySelectorAll('.category-section');
    sections.forEach(section => {
        const title = section.querySelector('h2').textContent.toLowerCase();
        if (title.includes(categoryName.toLowerCase())) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
}

// Add loading state for service items
function addLoadingState() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        const btn = item.querySelector('.service-btn');
        btn.addEventListener('click', function() {
            if (!this.disabled) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Adding...';
                this.disabled = true;
                
                setTimeout(() => {
                    if (!this.classList.contains('added')) {
                        this.innerHTML = '<i class="fas fa-plus"></i> Add';
                        this.disabled = false;
                    }
                }, 500);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingState);
