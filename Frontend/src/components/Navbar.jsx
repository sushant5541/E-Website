import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { BiShoppingBag } from 'react-icons/bi';
import './Style/Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [cartCount, setCartCount] = useState(3);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const navigate = useNavigate();

    // Check if user is logged in on component mount and when localStorage changes
    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    setUser(parsedUser);
                    setIsLoggedIn(true);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        };

        checkLoginStatus();
        // Listen for storage events (in case user logs in/out in another tab)
        window.addEventListener('storage', checkLoginStatus);
        
        return () => {
            window.removeEventListener('storage', checkLoginStatus);
        };
    }, []);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown-container')) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Auto hide login prompt after 3 seconds
    useEffect(() => {
        if (showLoginPrompt) {
            const timer = setTimeout(() => {
                setShowLoginPrompt(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showLoginPrompt]);

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close mobile menu when link is clicked
    const closeMenu = () => {
        setIsOpen(false);
        setShowDropdown(false);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        setShowDropdown(false);
        closeMenu();
        navigate('/');
    };

    // Handle cart click with login check
    const handleCartClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Cart clicked - Login status:', isLoggedIn);
        
        if (!isLoggedIn) {
            console.log('User not logged in, showing prompt');
            setShowLoginPrompt(true);
            // Navigate to login after showing prompt
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } else {
            console.log('User logged in, navigating to cart');
            navigate('/cart');
        }
        closeMenu();
    };

    // Handle profile click (only if logged in)
    const handleProfileClick = (e) => {
        if (!isLoggedIn) {
            e.preventDefault();
            setShowLoginPrompt(true);
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        }
    };

    // Get user initials for avatar
    const getUserInitials = () => {
        if (user && user.name) {
            return user.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        }
        return 'U';
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Single Clean Logo */}
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    <div className="logo-wrapper">
                        <BiShoppingBag className="logo-icon" />
                        <span className="logo-brand">SpecsMart</span>
                    </div>
                </Link>

                {/* Mobile Menu Toggle */}
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>

                {/* Navigation Links */}
                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMenu}
                            >
                                <span className="nav-link-text">Home</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/shop" 
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMenu}
                            >
                                <span className="nav-link-text">Shop</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/about" 
                                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                onClick={closeMenu}
                            >
                                <span className="nav-link-text">About</span>
                            </NavLink>
                        </li>
                        
                        {/* Mobile menu items */}
                        <li className="nav-item mobile-only">
                            {isLoggedIn ? (
                                <>
                                    <div className="mobile-user-info">
                                        <FaUserCircle className="mobile-user-icon" />
                                        <span className="mobile-user-name">{user?.name || 'User'}</span>
                                    </div>
                                    <button onClick={handleLogout} className="mobile-logout-btn">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink 
                                    to="/login" 
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                    onClick={closeMenu}
                                >
                                    <FaUser className="nav-icon" /> Login
                                </NavLink>
                            )}
                        </li>
                        <li className="nav-item mobile-only">
                            <button 
                                className="mobile-cart-btn"
                                onClick={handleCartClick}
                            >
                                <FaShoppingCart className="nav-icon" /> Cart
                                {cartCount > 0 && <span className="cart-badge-mobile">{cartCount}</span>}
                            </button>
                        </li>
                    </ul>

                    {/* Desktop Right Icons */}
                    <div className="nav-icons desktop-only">
                        {/* Cart Icon - with click handler */}
                        <button 
                            className="icon-link cart-icon" 
                            title="Cart"
                            onClick={handleCartClick}
                            aria-label="Cart"
                        >
                            <FaShoppingCart className="icon" />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </button>

                        {/* User Section - Shows Login or Username */}
                        {isLoggedIn ? (
                            <div className="user-dropdown-container">
                                <div 
                                    className="user-info"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    <div className="user-avatar">
                                        {getUserInitials()}
                                    </div>
                                    <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
                                </div>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="user-dropdown">
                                        <div className="dropdown-header">
                                            <FaUserCircle className="dropdown-user-icon" />
                                            <div>
                                                <div className="dropdown-user-name">{user?.name}</div>
                                                <div className="dropdown-user-email">{user?.email}</div>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <NavLink to="/profile" className="dropdown-item" onClick={closeMenu}>
                                            <FaUser /> My Profile
                                        </NavLink>
                                        <NavLink to="/orders" className="dropdown-item" onClick={closeMenu}>
                                            <BiShoppingBag /> My Orders
                                        </NavLink>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                                            <FaSignOutAlt /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink to="/login" className="icon-link" title="Login">
                                <FaUser className="icon" />
                            </NavLink>
                        )}
                    </div>
                </div>
            </div>

            {/* Login Prompt Notification */}
            {showLoginPrompt && (
                <div className="login-prompt-navbar">
                    <div className="login-prompt-content">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="8" r="4" strokeWidth="2"/>
                            <path d="M5 20v-2a7 7 0 0 1 14 0v2" strokeWidth="2"/>
                        </svg>
                        <span>Please login to view cart</span>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;