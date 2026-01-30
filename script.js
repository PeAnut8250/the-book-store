// ============================================
// KITAABGHAR - MAIN JAVASCRIPT
// Indian Bookstore Application
// ============================================

// ============================================
// GLOBAL VARIABLES
// ============================================

let currentUser = null;
let cart = [];
let orders = [];
let allBooks = [];

// ============================================
// BOOK DATABASE
// ============================================

const booksData = [
    {
        id: 1,
        title: "Godan",
        author: "Munshi Premchand",
        category: "classics",
        price: 299,
        originalPrice: 399,
        description: "A timeless classic depicting rural India's struggles and the plight of farmers.",
        badge: "Bestseller",
        rating: 4.8
    },
    {
        id: 2,
        title: "The God of Small Things",
        author: "Arundhati Roy",
        category: "fiction",
        price: 350,
        originalPrice: 450,
        description: "A powerful story of forbidden love and social boundaries in Kerala.",
        badge: "Award Winner",
        rating: 4.7
    },
    {
        id: 3,
        title: "Bhagavad Gita",
        author: "Vyasa",
        category: "spirituality",
        price: 199,
        originalPrice: 299,
        description: "Ancient wisdom and philosophy from the sacred Hindu scripture.",
        badge: "Classic",
        rating: 4.9
    },
    {
        id: 4,
        title: "India After Gandhi",
        author: "Ramachandra Guha",
        category: "history",
        price: 599,
        originalPrice: 799,
        description: "Comprehensive history of independent India from 1947 onwards.",
        badge: "Featured",
        rating: 4.6
    },
    {
        id: 5,
        title: "Gitanjali",
        author: "Rabindranath Tagore",
        category: "poetry",
        price: 249,
        originalPrice: 349,
        description: "Nobel Prize-winning collection of spiritual poems by Tagore.",
        badge: "Classic",
        rating: 4.8
    },
    {
        id: 6,
        title: "Malgudi Days",
        author: "R.K. Narayan",
        category: "fiction",
        price: 275,
        originalPrice: 375,
        description: "Charming short stories set in the fictional town of Malgudi.",
        badge: "Bestseller",
        rating: 4.7
    },
    {
        id: 7,
        title: "The Discovery of India",
        author: "Jawaharlal Nehru",
        category: "history",
        price: 399,
        originalPrice: 499,
        description: "Nehru's exploration of India's cultural and historical heritage.",
        badge: "Featured",
        rating: 4.5
    },
    {
        id: 8,
        title: "Autobiography of a Yogi",
        author: "Paramahansa Yogananda",
        category: "spirituality",
        price: 325,
        originalPrice: 425,
        description: "Spiritual journey and teachings of the renowned yogi.",
        badge: "Bestseller",
        rating: 4.8
    },
    {
        id: 9,
        title: "Midnight's Children",
        author: "Salman Rushdie",
        category: "fiction",
        price: 450,
        originalPrice: 550,
        description: "Magical realism intertwined with India's independence story.",
        badge: "Award Winner",
        rating: 4.6
    },
    {
        id: 10,
        title: "Train to Pakistan",
        author: "Khushwant Singh",
        category: "classics",
        price: 299,
        originalPrice: 399,
        description: "Powerful narrative of partition's impact on a border village.",
        badge: "Classic",
        rating: 4.7
    },
    {
        id: 11,
        title: "Ramayana",
        author: "Valmiki",
        category: "classics",
        price: 399,
        originalPrice: 499,
        description: "Ancient epic tale of Lord Rama's journey and dharma.",
        badge: "Epic",
        rating: 4.9
    },
    {
        id: 12,
        title: "Mahabharata",
        author: "Vyasa",
        category: "classics",
        price: 499,
        originalPrice: 699,
        description: "The greatest epic of Indian mythology and philosophy.",
        badge: "Epic",
        rating: 4.9
    },
    {
        id: 13,
        title: "The White Tiger",
        author: "Aravind Adiga",
        category: "fiction",
        price: 350,
        originalPrice: 450,
        description: "A darkly humorous tale of class struggle in modern India.",
        badge: "Award Winner",
        rating: 4.5
    },
    {
        id: 14,
        title: "Savitri",
        author: "Sri Aurobindo",
        category: "poetry",
        price: 399,
        originalPrice: 499,
        description: "Epic spiritual poem exploring consciousness and transformation.",
        badge: "Spiritual",
        rating: 4.7
    },
    {
        id: 15,
        title: "Wings of Fire",
        author: "APJ Abdul Kalam",
        category: "history",
        price: 299,
        originalPrice: 399,
        description: "Inspiring autobiography of India's Missile Man.",
        badge: "Bestseller",
        rating: 4.8
    }
];

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Hide preloader
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1500);

    // Initialize books
    allBooks = [...booksData];
    
    // Render initial content
    renderBooks(allBooks);
    renderFeaturedBooks();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check for logged-in user
    checkAuthState();
    
    // Load cart from localStorage
    loadCartFromStorage();
    
    // Navbar scroll effect
    setupNavbarScroll();
});

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    // Navigation
    document.getElementById('mobileMenuToggle')?.addEventListener('click', toggleMobileMenu);
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Search
    document.getElementById('searchBtn')?.addEventListener('click', toggleSearch);
    document.getElementById('searchClose')?.addEventListener('click', toggleSearch);
    
    // Cart
    document.getElementById('cartBtn')?.addEventListener('click', toggleCart);
    document.getElementById('cartClose')?.addEventListener('click', toggleCart);
    document.getElementById('continueShoppingBtn')?.addEventListener('click', toggleCart);
    document.getElementById('checkoutBtn')?.addEventListener('click', openCheckoutModal);
    
    // User/Auth
    document.getElementById('userBtn')?.addEventListener('click', toggleUserModal);
    document.getElementById('userModalClose')?.addEventListener('click', toggleUserModal);
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => switchAuthTab(e.target.dataset.tab));
    });
    
    document.querySelectorAll('.switch-tab').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchAuthTab(e.target.dataset.switch);
        });
    });
    
    // Auth forms
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);
    
    // Checkout
    document.getElementById('checkoutModalClose')?.addEventListener('click', closeCheckoutModal);
    document.getElementById('placeOrderBtn')?.addEventListener('click', placeOrder);
    
    // Payment method change
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', handlePaymentMethodChange);
    });
    
    // Filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            filterBooksByCategory(category);
        });
    });
    
    // Newsletter
    document.getElementById('newsletterForm')?.addEventListener('submit', handleNewsletterSubmit);
    
    // Overlay
    document.getElementById('overlay')?.addEventListener('click', closeAllModals);
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

function setupNavbarScroll() {
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('overlay');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
}

function handleNavClick(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href');
    
    // Remove active class from all links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    e.target.classList.add('active');
    
    // Smooth scroll to section
    if (targetId && targetId !== '#') {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    if (navLinks.classList.contains('active')) {
        toggleMobileMenu();
    }
}

// ============================================
// SEARCH FUNCTIONS
// ============================================

function toggleSearch() {
    const searchOverlay = document.getElementById('searchOverlay');
    searchOverlay.classList.toggle('active');
    
    if (searchOverlay.classList.contains('active')) {
        document.getElementById('searchInput')?.focus();
    }
}

// ============================================
// CART FUNCTIONS
// ============================================

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function addToCart(bookId) {
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    // Check if book already in cart
    const existingItem = cart.find(item => item.id === bookId);
    if (existingItem) {
        showToast('Book already in cart!');
        return;
    }
    
    cart.push({ ...book, quantity: 1 });
    updateCart();
    saveCartToStorage();
    saveCartToFirebase();
    showToast(`${book.title} added to cart!`);
}

function removeFromCart(bookId) {
    cart = cart.filter(item => item.id !== bookId);
    updateCart();
    saveCartToStorage();
    saveCartToFirebase();
    showToast('Item removed from cart');
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const totalAmount = document.getElementById('totalAmount');
    
    // Update cart count
    cartCount.textContent = cart.length;
    
    // Calculate total
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `₹${total.toFixed(2)}`;
    
    // Render cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <i class="fas fa-book"></i>
            </div>
            <div class="cart-item-info">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-author">${item.author}</div>
                <div class="cart-item-price">₹${item.price}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function saveCartToStorage() {
    localStorage.setItem('kitaabghar_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('kitaabghar_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function saveCartToFirebase() {
    if (currentUser && window.firebaseDB) {
        window.firebaseDB.ref(`users/${currentUser.uid}/cart`).set(cart)
            .catch(error => console.error('Error saving cart to Firebase:', error));
    }
}

function loadCartFromFirebase() {
    if (currentUser && window.firebaseDB) {
        window.firebaseDB.ref(`users/${currentUser.uid}/cart`).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    cart = snapshot.val();
                    updateCart();
                }
            })
            .catch(error => console.error('Error loading cart from Firebase:', error));
    }
}

// ============================================
// BOOK RENDERING
// ============================================

function renderBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    if (!booksGrid) return;
    
    booksGrid.innerHTML = books.map(book => `
        <div class="book-card">
            <div class="book-image">
                <i class="fas fa-book-open"></i>
                ${book.badge ? `<div class="book-badge">${book.badge}</div>` : ''}
            </div>
            <div class="book-info">
                <div class="book-category">${book.category}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-footer">
                    <div class="book-price">₹${book.price}</div>
                    <div class="book-actions">
                        <button class="icon-btn" onclick="addToCart(${book.id})" title="Add to cart">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="icon-btn" onclick="buyNow(${book.id})" title="Buy now">
                            <i class="fas fa-bolt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderFeaturedBooks() {
    const featuredCarousel = document.getElementById('featuredCarousel');
    if (!featuredCarousel) return;
    
    // Get featured books (first 5 books with badges)
    const featuredBooks = allBooks.filter(book => book.badge).slice(0, 5);
    
    featuredCarousel.innerHTML = featuredBooks.map(book => `
        <div class="book-card featured-card">
            <div class="book-image">
                <i class="fas fa-book-open"></i>
                <div class="book-badge">${book.badge}</div>
            </div>
            <div class="book-info">
                <div class="book-category">${book.category}</div>
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">by ${book.author}</p>
                <p class="book-description">${book.description}</p>
                <div class="book-footer">
                    <div class="book-price">₹${book.price}</div>
                    <div class="book-actions">
                        <button class="icon-btn" onclick="addToCart(${book.id})">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                        <button class="icon-btn" onclick="buyNow(${book.id})">
                            <i class="fas fa-bolt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function buyNow(bookId) {
    // Add to cart
    const book = allBooks.find(b => b.id === bookId);
    if (!book) return;
    
    // Clear cart and add only this book
    cart = [{ ...book, quantity: 1 }];
    updateCart();
    saveCartToStorage();
    saveCartToFirebase();
    
    // Open checkout
    openCheckoutModal();
}

// ============================================
// FILTER FUNCTIONS
// ============================================

function handleFilter(e) {
    const filterValue = e.target.dataset.filter;
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    
    // Filter books
    if (filterValue === 'all') {
        renderBooks(allBooks);
    } else {
        const filtered = allBooks.filter(book => book.category === filterValue);
        renderBooks(filtered);
    }
    
    // Scroll to books section
    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
}

function filterBooksByCategory(category) {
    // Update filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter and render
    const filtered = allBooks.filter(book => book.category === category);
    renderBooks(filtered);
    
    // Scroll to books section
    document.getElementById('books')?.scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function toggleUserModal() {
    const modal = document.getElementById('userModal');
    const overlay = document.getElementById('overlay');
    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}

function switchAuthTab(tab) {
    // Update tabs
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
    });
    document.querySelector(`.auth-tab[data-tab="${tab}"]`)?.classList.add('active');
    
    // Update forms
    document.querySelectorAll('.auth-form').forEach(form => {
        form.classList.remove('active');
    });
    document.querySelector(`.auth-form[data-form="${tab}"]`)?.classList.add('active');
    
    // Update modal title
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = tab === 'login' ? 'Welcome Back' : 'Create Account';
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!window.firebaseAuth) {
        showToast('Firebase not initialized');
        return;
    }
    
    window.firebaseAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            showToast('Login successful!');
            updateUserInterface();
            loadCartFromFirebase();
            loadOrdersFromFirebase();
            toggleUserModal();
        })
        .catch((error) => {
            showToast(getAuthErrorMessage(error.code));
        });
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (!window.firebaseAuth) {
        showToast('Firebase not initialized');
        return;
    }
    
    window.firebaseAuth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            currentUser = userCredential.user;
            
            // Update user profile with name
            currentUser.updateProfile({
                displayName: name
            });
            
            // Save user data to database
            if (window.firebaseDB) {
                window.firebaseDB.ref(`users/${currentUser.uid}`).set({
                    name: name,
                    email: email,
                    createdAt: new Date().toISOString()
                });
            }
            
            showToast('Account created successfully!');
            updateUserInterface();
            toggleUserModal();
        })
        .catch((error) => {
            showToast(getAuthErrorMessage(error.code));
        });
}

function handleLogout() {
    if (!window.firebaseAuth) return;
    
    window.firebaseAuth.signOut()
        .then(() => {
            currentUser = null;
            cart = [];
            orders = [];
            updateCart();
            updateUserInterface();
            showToast('Logged out successfully');
            toggleUserModal();
        })
        .catch((error) => {
            showToast('Error logging out');
        });
}

function checkAuthState() {
    if (!window.firebaseAuth) return;
    
    window.firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            updateUserInterface();
            loadCartFromFirebase();
            loadOrdersFromFirebase();
        } else {
            currentUser = null;
            updateUserInterface();
        }
    });
}

function updateUserInterface() {
    const authForms = document.querySelectorAll('.auth-form');
    const userDashboard = document.getElementById('userDashboard');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (currentUser) {
        // Hide auth forms, show dashboard
        authForms.forEach(form => form.style.display = 'none');
        userDashboard.style.display = 'block';
        userName.textContent = currentUser.displayName || 'User';
        userEmail.textContent = currentUser.email;
    } else {
        // Show auth forms, hide dashboard
        authForms.forEach(form => form.style.display = 'none');
        document.querySelector('.auth-form[data-form="login"]').style.display = 'block';
        userDashboard.style.display = 'none';
    }
}

function getAuthErrorMessage(errorCode) {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Please try again later'
    };
    
    return errorMessages[errorCode] || 'Authentication error occurred';
}

// ============================================
// CHECKOUT FUNCTIONS
// ============================================

function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }
    
    if (!currentUser) {
        showToast('Please login to continue');
        toggleCart();
        toggleUserModal();
        return;
    }
    
    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    
    // Close cart
    document.getElementById('cartSidebar').classList.remove('active');
    
    // Update checkout items
    updateCheckoutItems();
    
    // Show checkout modal
    checkoutModal.classList.add('active');
    overlay.classList.add('active');
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkoutModal');
    const overlay = document.getElementById('overlay');
    checkoutModal.classList.remove('active');
    overlay.classList.remove('active');
}

function updateCheckoutItems() {
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutSubtotal = document.getElementById('checkoutSubtotal');
    const deliveryCharges = document.getElementById('deliveryCharges');
    const checkoutTotal = document.getElementById('checkoutTotal');
    
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;
    
    checkoutSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
    deliveryCharges.textContent = delivery === 0 ? 'FREE' : `₹${delivery.toFixed(2)}`;
    checkoutTotal.textContent = `₹${total.toFixed(2)}`;
    
    checkoutItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <div style="font-weight: 600;">${item.title}</div>
                <div style="font-size: 0.9rem; color: var(--text-light);">${item.author}</div>
            </div>
            <div style="font-weight: 600; color: var(--primary-color);">₹${item.price}</div>
        </div>
    `).join('');
}

function handlePaymentMethodChange(e) {
    const cardForm = document.getElementById('cardPaymentForm');
    if (e.target.value === 'card') {
        cardForm.style.display = 'block';
    } else {
        cardForm.style.display = 'none';
    }
}

function placeOrder() {
    // Validate address form
    const name = document.getElementById('deliveryName').value;
    const phone = document.getElementById('deliveryPhone').value;
    const address1 = document.getElementById('addressLine1').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    
    if (!name || !phone || !address1 || !city || !state || !pincode) {
        showToast('Please fill in all delivery details');
        return;
    }
    
    // Get payment method
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Validate card details if card payment
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCVV = document.getElementById('cardCVV').value;
        
        if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
            showToast('Please fill in all card details');
            return;
        }
    }
    
    // Create order
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const delivery = subtotal > 500 ? 0 : 40;
    const total = subtotal + delivery;
    
    const order = {
        orderId: `KG${Date.now()}`,
        items: cart,
        subtotal: subtotal,
        deliveryCharges: delivery,
        total: total,
        deliveryAddress: {
            name,
            phone,
            address1,
            address2: document.getElementById('addressLine2').value,
            city,
            state,
            pincode
        },
        paymentMethod: paymentMethod,
        status: 'Processing',
        orderDate: new Date().toISOString()
    };
    
    // Save order to Firebase
    if (currentUser && window.firebaseDB) {
        window.firebaseDB.ref(`users/${currentUser.uid}/orders`).push(order)
            .then(() => {
                // Clear cart
                cart = [];
                updateCart();
                saveCartToStorage();
                saveCartToFirebase();
                
                // Close modal
                closeCheckoutModal();
                
                // Show success message
                showToast(`Order placed successfully! Order ID: ${order.orderId}`);
                
                // Reset form
                document.getElementById('addressForm').reset();
                
                // Load orders
                loadOrdersFromFirebase();
            })
            .catch(error => {
                showToast('Error placing order. Please try again.');
                console.error('Order error:', error);
            });
    } else {
        showToast('Please login to place order');
    }
}

function loadOrdersFromFirebase() {
    if (currentUser && window.firebaseDB) {
        window.firebaseDB.ref(`users/${currentUser.uid}/orders`).once('value')
            .then(snapshot => {
                if (snapshot.exists()) {
                    orders = [];
                    snapshot.forEach(child => {
                        orders.push({ firebaseKey: child.key, ...child.val() });
                    });
                }
            })
            .catch(error => console.error('Error loading orders:', error));
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function closeAllModals() {
    document.getElementById('searchOverlay')?.classList.remove('active');
    document.getElementById('cartSidebar')?.classList.remove('active');
    document.getElementById('userModal')?.classList.remove('active');
    document.getElementById('checkoutModal')?.classList.remove('active');
    document.getElementById('navLinks')?.classList.remove('active');
    document.getElementById('overlay')?.classList.remove('active');
}

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    if (window.firebaseDB) {
        window.firebaseDB.ref('newsletter').push({
            email: email,
            subscribedAt: new Date().toISOString()
        }).then(() => {
            showToast('Successfully subscribed to newsletter!');
            e.target.reset();
        }).catch(error => {
            showToast('Error subscribing. Please try again.');
        });
    } else {
        showToast('Thank you for subscribing!');
        e.target.reset();
    }
}

// ============================================
// CARD NUMBER FORMATTING
// ============================================

document.getElementById('cardNumber')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

document.getElementById('cardExpiry')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

document.getElementById('cardCVV')?.addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🔥 Welcome to Kitaabghar! 📚', 'color: #D4722E; font-size: 24px; font-weight: bold;');
console.log('%cBuilt with ❤️ for Indian Literature', 'color: #2D5F3F; font-size: 14px;');