// Login.jsx
import React, { useState, useEffect } from 'react'; // Add useEffect
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiShoppingBag } from 'react-icons/bi';
import './Auth.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant' // Use 'instant' to avoid smooth scroll delay
        });
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Handle field blur (touched)
    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched({
            ...touched,
            [name]: true
        });
        validateField(name, formData[name]);
    };

    // Validate single field
    const validateField = (fieldName, value) => {
        let fieldError = '';

        switch (fieldName) {
            case 'email':
                if (!value) {
                    fieldError = 'Email is required';
                } else if (!/\S+@\S+\.\S+/.test(value)) {
                    fieldError = 'Please enter a valid email address';
                }
                break;

            case 'password':
                if (!value) {
                    fieldError = 'Password is required';
                } else if (value.length < 6) {
                    fieldError = 'Password must be at least 6 characters';
                }
                break;

            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [fieldName]: fieldError
        }));

        return fieldError;
    };

    // Validate entire form
    const validateForm = () => {
        const newErrors = {};

        // Validate email
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Validate password
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
        email: true,
        password: true
    });

    if (validateForm()) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data));
                
                alert('Login successful!');
                navigate('/');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Network error. Please try again.');
        }
    }
};

    return (
        <>
            <Navbar />
            <div className="auth-container">
                <div className="auth-card">
                    {/* Logo */}
                    <Link to="/" className="auth-logo">
                        <BiShoppingBag className="logo-icon" />
                        <span className="logo-text">SpecsMart</span>
                    </Link>

                    {/* Header */}
                    <div className="auth-header">
                        <h2>Welcome Back!</h2>
                        <p>Please login to your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        {/* Email Field */}
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className={`input-wrapper ${errors.email && touched.email ? 'error' : ''}`}>
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.email && touched.email ? 'error' : ''}
                                />
                            </div>
                            {errors.email && touched.email && (
                                <span className="error-message">{errors.email}</span>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className={`input-wrapper ${errors.password && touched.password ? 'error' : ''}`}>
                                <FaLock className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password ? 'error' : ''}
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && touched.password && (
                                <span className="error-message">{errors.password}</span>
                            )}
                        </div>

                        {/* Forgot Password Link */}
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="submit-btn">
                            Login
                        </button>
                    </form>

                    {/* Register Link */}
                    <div className="auth-footer">
                        <p>
                            Don't have an account?{' '}
                            <Link to="/register" className="auth-link">
                                Register here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default Login;