// components/CategoriesSection.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Style/CategoriesSection.css';

const CategoriesSection = () => {
    const [activeCategory, setActiveCategory] = useState(null);

    const categories = [
        {
            id: 1,
            name: "Women's Fashion",
            icon: "👗",
            image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 1245,
            colors: ["#FF69B4", "#FF1493", "#DB7093"],
            subcategories: ["Dresses", "Tops", "Bottoms", "Outerwear"]
        },
        {
            id: 2,
            name: "Men's Fashion",
            icon: "👔",
            image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 987,
            colors: ["#2C3E50", "#34495E", "#7F8C8D"],
            subcategories: ["Shirts", "Pants", "Suits", "Activewear"]
        },
        {
            id: 3,
            name: "Fine Jewelry",
            icon: "💍",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 567,
            colors: ["#FFD700", "#C0C0C0", "#E5E4E2"],
            subcategories: ["Necklaces", "Rings", "Earrings", "Bracelets"]
        },
        {
            id: 4,
            name: "Handbags",
            icon: "👜",
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 432,
            colors: ["#8B4513", "#2C1810", "#4A3728"],
            subcategories: ["Tote Bags", "Crossbody", "Clutches", "Backpacks"]
        },
        {
            id: 5,
            name: "Watches",
            icon: "⌚",
            image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 321,
            colors: ["#000000", "#808080", "#8B4513"],
            subcategories: ["Luxury", "Sports", "Smart", "Classic"]
        },
        {
            id: 6,
            name: "Sunglasses",
            icon: "🕶️",
            image: "https://images.unsplash.com/photo-1511499767150-c48d923f35c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 256,
            colors: ["#000000", "#8B4513", "#4682B4"],
            subcategories: ["Aviator", "Wayfarer", "Sport", "Designer"]
        },
        {
            id: 7,
            name: "Shoes",
            icon: "👟",
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 876,
            colors: ["#FFFFFF", "#000000", "#808080"],
            subcategories: ["Sneakers", "Boots", "Formal", "Sandals"]
        },
        {
            id: 8,
            name: "Accessories",
            icon: "🧣",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            itemCount: 654,
            colors: ["#FF6B6B", "#4ECDC4", "#45B7D1"],
            subcategories: ["Belts", "Hats", "Scarves", "Wallets"]
        }
    ];

    return (
        <section className="categories-section">
            <div className="container">
                {/* Section Header with Animation */}
                <div className="section-header">
                    <span className="section-badge">Shop by Category</span>
                    <h2 className="section-title">
                        Explore Our 
                        <span className="gradient-text"> Collections</span>
                    </h2>
                    <p className="section-description">
                        Find everything you need from fashion to jewelry and accessories
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="categories-grid">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            {/* Card Inner */}
                            <div className="card-inner">
                                {/* Front of Card */}
                                <div className="card-front">
                                    <img src={category.image} alt={category.name} />
                                    <div className="card-overlay">
                                        <span className="category-icon">{category.icon}</span>
                                        <h3 className="category-name">{category.name}</h3>
                                        <span className="item-count">{category.itemCount} items</span>
                                        
                                        {/* Color Palette */}
                                        <div className="color-palette">
                                            {category.colors.map((color, idx) => (
                                                <span
                                                    key={idx}
                                                    className="color-swatch"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Back of Card (on hover) */}
                                <div className="card-back">
                                    <h4 className="back-title">{category.name}</h4>
                                    <ul className="subcategories-list">
                                        {category.subcategories.map((sub, idx) => (
                                            <li key={idx}>
                                                <Link to={`/category/${sub.toLowerCase()}`}>
                                                    {sub}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to={`/category/${category.name.toLowerCase()}`} className="explore-btn">
                                        Explore Collection
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="card-glow"></div>
                        </div>
                    ))}
                </div>

                {/* Featured Banner */}
                <div className="featured-banner">
                    <div className="banner-content">
                        <span className="banner-subtitle">Special Collection</span>
                        <h3 className="banner-title">Summer Sale 2026</h3>
                        <p className="banner-description">
                            Up to 50% off on selected fashion and jewelry items
                        </p>
                        <div className="banner-buttons">
                            <Link to="/sale" className="btn btn-primary">
                                Shop Sale
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <span className="sale-timer">
                                <span className="timer-label">Ends in:</span>
                                <span className="timer-value">02 : 15 : 34</span>
                            </span>
                        </div>
                    </div>
                    <div className="banner-image">
                        <img 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" 
                            alt="Summer Sale"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesSection;