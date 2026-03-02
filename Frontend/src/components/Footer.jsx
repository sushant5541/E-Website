// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FaFacebook, 
    FaInstagram, 
    FaTwitter, 
    FaPinterest, 
    FaYoutube, 
    FaTiktok,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaPaypal,
    FaApple,
    FaGooglePay,
    FaArrowRight,
    FaPaperPlane,
    FaShoppingBag,
    FaArrowUp,
    FaCommentDots,
    FaMobile,
    FaAndroid
} from 'react-icons/fa';
import './Style/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { id: 1, name: 'Facebook', icon: <FaFacebook />, url: 'https://facebook.com', color: '#1877F2' },
        { id: 2, name: 'Instagram', icon: <FaInstagram />, url: 'https://instagram.com', color: '#E4405F' },
        { id: 3, name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com', color: '#1DA1F2' },
        { id: 4, name: 'Pinterest', icon: <FaPinterest />, url: 'https://pinterest.com', color: '#BD081C' },
        { id: 5, name: 'YouTube', icon: <FaYoutube />, url: 'https://youtube.com', color: '#FF0000' },
        { id: 6, name: 'TikTok', icon: <FaTiktok />, url: 'https://tiktok.com', color: '#000000' }
    ];

    const quickLinks = [
        { id: 1, name: 'About Us', url: '/about' },
        { id: 2, name: 'Contact Us', url: '/contact' },
        { id: 3, name: 'FAQs', url: '/faqs' },
        { id: 4, name: 'Shipping Info', url: '/shipping' },
        { id: 5, name: 'Returns Policy', url: '/returns' },
        { id: 6, name: 'Track Order', url: '/track' }
    ];

    const categories = [
        { id: 1, name: "Women's Fashion", url: '/category/womens-fashion' },
        { id: 2, name: "Men's Fashion", url: '/category/mens-fashion' },
        { id: 3, name: 'Fine Jewelry', url: '/category/jewelry' },
        { id: 4, name: 'Handbags', url: '/category/handbags' },
        { id: 5, name: 'Watches', url: '/category/watches' },
        { id: 6, name: 'Accessories', url: '/category/accessories' }
    ];

    return (
        <footer className="footer">
            {/* Newsletter Section */}
            <div className="newsletter-section">
                <div className="container">
                    <div className="newsletter-content">
                        <div className="newsletter-text">
                            <h3>Subscribe to Our Newsletter</h3>
                            <p>Get the latest updates on new products and upcoming sales</p>
                        </div>
                        <form className="newsletter-form">
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    className="newsletter-input"
                                    required
                                />
                                <button type="submit" className="newsletter-btn">
                                    Subscribe
                                    <FaPaperPlane className="btn-icon" />
                                </button>
                            </div>
                            <div className="form-checkbox">
                                <input type="checkbox" id="privacy" />
                                <label htmlFor="privacy">
                                    I agree to the <Link to="/privacy">Privacy Policy</Link>
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className="footer-main">
                <div className="container">
                    <div className="footer-grid">
                        {/* Brand Section */}
                        <div className="footer-section brand-section">
                            <div className="footer-logo">
                                <FaShoppingBag className="logo-icon" />
                                <span className="logo-text">StyleStore</span>
                            </div>
                            <p className="brand-description">
                                Your one-stop destination for fashion, jewelry, and accessories. 
                                Discover the latest trends and timeless classics.
                            </p>
                            
                            {/* Contact Info */}
                            <div className="contact-info">
                                <div className="contact-item">
                                    <FaMapMarkerAlt className="contact-icon" />
                                    <span>123 Fashion Street, New York, NY 10001</span>
                                </div>
                                <div className="contact-item">
                                    <FaPhone className="contact-icon" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="contact-item">
                                    <FaEnvelope className="contact-icon" />
                                    <span>support@stylestore.com</span>
                                </div>
                                <div className="contact-item">
                                    <FaClock className="contact-icon" />
                                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-title">Quick Links</h4>
                            <ul className="footer-links">
                                {quickLinks.map(link => (
                                    <li key={link.id}>
                                        <Link to={link.url} className="footer-link">
                                            <FaArrowRight className="link-arrow" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories */}
                        <div className="footer-section">
                            <h4 className="footer-title">Shop Categories</h4>
                            <ul className="footer-links">
                                {categories.map(category => (
                                    <li key={category.id}>
                                        <Link to={category.url} className="footer-link">
                                            <FaArrowRight className="link-arrow" />
                                            {category.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social & App Links */}
                        <div className="footer-section">
                            <h4 className="footer-title">Connect With Us</h4>
                            
                            {/* Social Links */}
                            <div className="social-links">
                                {socialLinks.map(social => (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        style={{ '--social-color': social.color }}
                                        title={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>

                            {/* App Download */}
                            <div className="app-download">
                                <h5 className="app-title">Download Our App</h5>
                                <div className="app-buttons">
                                    <a href="#" className="app-button">
                                        <FaApple className="app-icon" />
                                        <div className="app-text">
                                            <small>Download on</small>
                                            <strong>App Store</strong>
                                        </div>
                                    </a>
                                    <a href="#" className="app-button">
                                        <FaAndroid className="app-icon" />
                                        <div className="app-text">
                                            <small>Get it on</small>
                                            <strong>Google Play</strong>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Live Chat */}
                            <div className="live-chat">
                                <button className="chat-button">
                                    <FaCommentDots className="chat-icon" />
                                    <span className="chat-text">Live Chat</span>
                                    <span className="chat-badge">Online</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="bottom-content">
                        <div className="copyright">
                            © {currentYear} StyleStore. All rights reserved.
                        </div>
                        <div className="bottom-links">
                            <Link to="/privacy" className="bottom-link">Privacy Policy</Link>
                            <Link to="/terms" className="bottom-link">Terms of Service</Link>
                            <Link to="/sitemap" className="bottom-link">Sitemap</Link>
                        </div>
                        <div className="language-selector">
                            <select className="language-select">
                                <option value="en">English 🇺🇸</option>
                                <option value="es">Español 🇪🇸</option>
                                <option value="fr">Français 🇫🇷</option>
                                <option value="de">Deutsch 🇩🇪</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button 
                className="back-to-top"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                aria-label="Back to top"
            >
                <FaArrowUp />
            </button>
        </footer>
    );
};

export default Footer;