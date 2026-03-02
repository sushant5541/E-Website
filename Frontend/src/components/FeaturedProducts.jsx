// components/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/FeaturedProducts.css';

const FeaturedProducts = ({ selectedCategory: propSelectedCategory }) => {
    const [hoveredId, setHoveredId] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(propSelectedCategory || 'all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check login status on component mount and when localStorage changes
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            console.log('Login check - Token:', token ? 'exists' : 'none');
            console.log('Login check - User:', userData ? 'exists' : 'none');
            
            if (token && userData) {
                setIsLoggedIn(true);
                console.log('User is logged in');
            } else {
                setIsLoggedIn(false);
                console.log('User is NOT logged in');
            }
        };

        checkLoginStatus();

        // Listen for storage events (in case user logs in/out in another tab)
        window.addEventListener('storage', checkLoginStatus);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    // Update selected category when prop changes
    useEffect(() => {
        if (propSelectedCategory) {
            setSelectedCategory(propSelectedCategory);
            
            // Scroll to featured section with offset for navbar
            setTimeout(() => {
                const featuredSection = document.getElementById('featured-products');
                if (featuredSection) {
                    const navbarHeight = 80;
                    const elementPosition = featuredSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        }
    }, [propSelectedCategory]);

    const products = [
        {
            id: 1,
            name: "Designer Summer Dress",
            category: "fashion",
            price: 89.99,
            originalPrice: 129.99,
            rating: 4.5,
            reviews: 128,
            image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Sale",
            colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            description: "Elegant summer dress perfect for any occasion. Made with lightweight fabric for maximum comfort.",
            sizes: ["XS", "S", "M", "L", "XL"],
            inStock: true
        },
        {
            id: 2,
            name: "Gold Diamond Necklace",
            category: "jewelry",
            price: 499.99,
            originalPrice: 699.99,
            rating: 5,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Premium",
            material: "18K Gold",
            description: "Exquisite 18K gold necklace with genuine diamonds. A timeless piece for special occasions.",
            inStock: true
        },
        {
            id: 3,
            name: "Leather Crossbody Bag",
            category: "accessories",
            price: 129.99,
            originalPrice: 179.99,
            rating: 4,
            reviews: 89,
            image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Trending",
            colors: ["#8B4513", "#2C1810", "#4A3728"],
            description: "Genuine leather crossbody bag with adjustable strap. Perfect for daily use.",
            inStock: true
        },
        {
            id: 4,
            name: "Classic Leather Watch",
            category: "accessories",
            price: 199.99,
            originalPrice: 299.99,
            rating: 4.5,
            reviews: 156,
            image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "New",
            colors: ["#000000", "#C0C0C0", "#8B4513"],
            description: "Classic analog watch with genuine leather strap. Water-resistant and durable.",
            inStock: true
        },
        {
            id: 5,
            name: "Pearl Earrings Set",
            category: "jewelry",
            price: 149.99,
            originalPrice: 199.99,
            rating: 5,
            reviews: 42,
            image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Limited",
            material: "Freshwater Pearl",
            description: "Elegant freshwater pearl earrings. Each pearl is uniquely beautiful.",
            inStock: true
        },
        {
            id: 6,
            name: "Men's Casual Shirt",
            category: "fashion",
            price: 59.99,
            originalPrice: 89.99,
            rating: 4,
            reviews: 203,
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            badge: "Sale",
            colors: ["#2C3E50", "#34495E", "#7F8C8D"],
            description: "Comfortable cotton shirt perfect for casual outings. Breathable fabric.",
            sizes: ["S", "M", "L", "XL", "XXL"],
            inStock: true
        }
    ];

    const categories = [
        { id: 'all', name: 'All Products', icon: '🔍' },
        { id: 'fashion', name: 'Fashion', icon: '👕' },
        { id: 'jewelry', name: 'Jewelry', icon: '💍' },
        { id: 'accessories', name: 'Accessories', icon: '👜' }
    ];

    const filteredProducts = selectedCategory === 'all' 
        ? products 
        : products.filter(p => p.category === selectedCategory);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>★</span>
            );
        }
        return stars;
    };

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
        document.body.style.overflow = 'unset';
    };

    // Handle add to cart with login check
    const handleAddToCart = (product, source = 'card') => {
        console.log('Add to cart clicked - Login status:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('User not logged in, showing prompt');
            setShowLoginPrompt(true);
            
            // Auto hide prompt after 3 seconds
            setTimeout(() => {
                setShowLoginPrompt(false);
            }, 3000);
            return;
        }

        // Check if item already exists in cart
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            // Update quantity if exists
            const updatedCart = cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setNotificationMessage(`${product.name} quantity updated in cart!`);
        } else {
            // Add new item
            const newItem = { ...product, quantity: 1 };
            const updatedCart = [...cartItems, newItem];
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            setNotificationMessage(`${product.name} added to cart!`);
        }

        // Show notification
        setShowNotification(true);
        
        // Auto hide notification after 3 seconds
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);

        // Close modal if it was opened from modal
        if (source === 'modal') {
            closeModal();
        }
    };

    // Handle add to wishlist with login check
    const handleAddToWishlist = (product, source = 'card') => {
        console.log('Add to wishlist clicked - Login status:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('User not logged in, showing prompt');
            setShowLoginPrompt(true);
            
            // Auto hide prompt after 3 seconds
            setTimeout(() => {
                setShowLoginPrompt(false);
            }, 3000);
            return;
        }

        // Reuse add to cart functionality
        handleAddToCart(product, source);
    };

    // Navigate to login
    const goToLogin = () => {
        console.log('Navigating to login page');
        navigate('/login');
    };

    return (
        <section id="featured-products" className="featured-section">
            <div className="container">
                {/* Section Header */}
                <div className="section-header">
                    <span className="section-subtitle">Shop Now</span>
                    <h2 className="section-title">Featured Products</h2>
                    <p className="section-description">
                        Discover our handpicked selection of trending items
                    </p>
                </div>

                {/* Category Filter */}
                <div className="category-filter">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            <span className="filter-icon">{cat.icon}</span>
                            <span className="filter-name">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="product-card"
                            onMouseEnter={() => setHoveredId(product.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Product Image */}
                            <div className="product-image">
                                <img src={product.image} alt={product.name} />
                                
                                {/* Badge */}
                                {product.badge && (
                                    <span className={`product-badge ${product.badge.toLowerCase()}`}>
                                        {product.badge}
                                    </span>
                                )}

                                {/* Quick Actions */}
                                <div className={`quick-actions ${hoveredId === product.id ? 'show' : ''}`}>
                                    <button 
                                        className="action-btn" 
                                        aria-label="Add to wishlist"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleAddToWishlist(product, 'card');
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                    </button>
                                    <button 
                                        className="action-btn" 
                                        aria-label="Quick view"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleQuickView(product);
                                        }}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M22 12c-2.667 4.667-6 7-10 7s-7.333-2.333-10-7c2.667-4.667 6-7 10-7s7.333 2.333 10 7z" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Color Options */}
                                {product.colors && (
                                    <div className="color-options">
                                        {product.colors.map((color, idx) => (
                                            <span
                                                key={idx}
                                                className="color-dot"
                                                style={{ backgroundColor: color }}
                                                title={`Color option ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="product-info">
                                <Link to={`/product/${product.id}`} className="product-name">
                                    {product.name}
                                </Link>
                                
                                <div className="product-category">{product.category}</div>
                                
                                <div className="product-rating">
                                    <div className="stars">
                                        {renderStars(product.rating)}
                                    </div>
                                    <span className="reviews">({product.reviews})</span>
                                </div>
                                
                                <div className="product-price">
                                    <span className="current-price">${product.price}</span>
                                    {product.originalPrice && (
                                        <span className="original-price">${product.originalPrice}</span>
                                    )}
                                </div>

                                {/* Add to Cart Button */}
                                <button 
                                    className="add-to-cart"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleAddToCart(product, 'card');
                                    }}
                                >
                                    <span>Add to Cart</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <path d="M16 10a4 4 0 0 1-8 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View All Link */}
                <div className="view-all">
                    <Link to="/shop" className="view-all-link">
                        View All Products
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Quick View Modal */}
            {showModal && selectedProduct && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeModal}>×</button>
                        
                        <div className="modal-grid">
                            {/* Product Image */}
                            <div className="modal-image">
                                <img src={selectedProduct.image} alt={selectedProduct.name} />
                                {selectedProduct.badge && (
                                    <span className={`modal-badge ${selectedProduct.badge.toLowerCase()}`}>
                                        {selectedProduct.badge}
                                    </span>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="modal-details">
                                <h2 className="modal-title">{selectedProduct.name}</h2>
                                
                                <div className="modal-category">{selectedProduct.category}</div>
                                
                                <div className="modal-rating">
                                    <div className="stars">
                                        {renderStars(selectedProduct.rating)}
                                    </div>
                                    <span className="reviews">({selectedProduct.reviews} reviews)</span>
                                </div>

                                <div className="modal-price">
                                    <span className="current-price">${selectedProduct.price}</span>
                                    {selectedProduct.originalPrice && (
                                        <span className="original-price">${selectedProduct.originalPrice}</span>
                                    )}
                                </div>

                                <p className="modal-description">{selectedProduct.description}</p>

                                {/* Material if available */}
                                {selectedProduct.material && (
                                    <div className="modal-material">
                                        <strong>Material:</strong> {selectedProduct.material}
                                    </div>
                                )}

                                {/* Colors if available */}
                                {selectedProduct.colors && (
                                    <div className="modal-colors">
                                        <strong>Colors:</strong>
                                        <div className="color-options">
                                            {selectedProduct.colors.map((color, idx) => (
                                                <span
                                                    key={idx}
                                                    className="color-dot"
                                                    style={{ backgroundColor: color }}
                                                    title={`Color option ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Sizes if available */}
                                {selectedProduct.sizes && (
                                    <div className="modal-sizes">
                                        <strong>Sizes:</strong>
                                        <div className="size-options">
                                            {selectedProduct.sizes.map(size => (
                                                <span key={size} className="size-tag">{size}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Stock Status */}
                                <div className="modal-stock">
                                    {selectedProduct.inStock ? (
                                        <span className="in-stock">✓ In Stock</span>
                                    ) : (
                                        <span className="out-of-stock">✗ Out of Stock</span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="modal-actions">
                                    <button 
                                        className="add-to-cart-modal"
                                        onClick={() => handleAddToCart(selectedProduct, 'modal')}
                                    >
                                        <span>Add to Cart</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                                            <line x1="3" y1="6" x2="21" y2="6" />
                                            <path d="M16 10a4 4 0 0 1-8 0" />
                                        </svg>
                                    </button>
                                    <button 
                                        className="wishlist-btn"
                                        onClick={() => handleAddToWishlist(selectedProduct, 'modal')}
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                        </svg>
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Login Prompt Notification */}
            {showLoginPrompt && (
                <div className="login-prompt" onClick={goToLogin}>
                    <div className="login-prompt-content">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="8" r="4" strokeWidth="2"/>
                            <path d="M5 20v-2a7 7 0 0 1 14 0v2" strokeWidth="2"/>
                        </svg>
                        <div>
                            <strong>Please login to continue</strong>
                            <span>Click here to login</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Toast */}
            {showNotification && (
                <div className="notification-toast">
                    <div className="notification-content">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{notificationMessage}</span>
                    </div>
                </div>
            )}
        </section>
    );
};

export default FeaturedProducts;