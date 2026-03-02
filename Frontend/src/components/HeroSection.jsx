// components/HeroSection.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style/HeroSection.css';

const HeroSection = ({ onCategorySelect }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();
    
    const heroSlides = [
        {
            id: 1,
            title: "Fashion Collection",
            subtitle: "Summer Styles 2026",
            description: "Discover the latest trends in fashion",
            bgColor: "linear-gradient(135deg, #93a3ea 0%, #a38eb8 100%)",
            image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            cta: "Shop Fashion",
            category: "fashion"
        },
        {
            id: 2,
            title: "Jewelry Collection",
            subtitle: "Elegant & Timeless",
            description: "Handcrafted pieces for every occasion",
            bgColor: "linear-gradient(135deg, #deace3 0%, #e9adb5 100%)",
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            cta: "Explore Jewelry",
            category: "jewelry"
        },
        {
            id: 3,
            title: "Accessories & More",
            subtitle: "Complete Your Look",
            description: "Bags, watches, and lifestyle accessories",
            bgColor: "linear-gradient(135deg, #80bbee 0%, #abdee1 100%)",
            image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            cta: "View All",
            category: "accessories"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [heroSlides.length]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    const handleCategoryClick = (category) => {
        // Call the callback to update FeaturedProducts category
        if (onCategorySelect) {
            onCategorySelect(category);
        }
        
        // Navigate to home page and scroll to featured products
        navigate('/');
        
        // Scroll to featured products after navigation
        setTimeout(() => {
            const featuredSection = document.getElementById('featured-products');
            if (featuredSection) {
                featuredSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    return (
        <section className="hero-section">
            {/* Slides Container */}
            <div className="hero-slides-container">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
                        style={{ background: slide.bgColor }}
                    >
                        <div className="hero-content">
                            <div className="hero-text">
                                <span className="hero-subtitle animate-text">{slide.subtitle}</span>
                                <h1 className="hero-title animate-text">{slide.title}</h1>
                                <p className="hero-description animate-text">{slide.description}</p>
                                <div className="hero-buttons animate-text">
                                    <button 
                                        onClick={() => handleCategoryClick(slide.category)}
                                        className="btn btn-primary"
                                    >
                                        {slide.cta}
                                        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2"/>
                                        </svg>
                                    </button>
                                    <Link to="/collections" className="btn btn-outline">
                                        View Collections
                                    </Link>
                                </div>
                            </div>
                            <div className="hero-image animate-image">
                                <img src={slide.image} alt={slide.title} />
                                <div className="image-overlay"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="hero-dots">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSection;