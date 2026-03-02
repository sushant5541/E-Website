import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiShoppingBag } from 'react-icons/bi';
import './Auth.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const navigate = useNavigate();

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

        // Special case for confirm password
        if (name === 'confirmPassword' || name === 'password') {
            if (errors.confirmPassword) {
                setErrors({
                    ...errors,
                    confirmPassword: ''
                });
            }
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
            case 'name':
                if (!value) {
                    fieldError = 'Name is required';
                } else if (value.length < 2) {
                    fieldError = 'Name must be at least 2 characters';
                } else if (value.length > 50) {
                    fieldError = 'Name must be less than 50 characters';
                } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                    fieldError = 'Name can only contain letters and spaces';
                }
                break;

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
                } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
                    fieldError = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
                }
                break;

            case 'confirmPassword':
                if (!value) {
                    fieldError = 'Please confirm your password';
                } else if (value !== formData.password) {
                    fieldError = 'Passwords do not match';
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

        // Validate name
        if (!formData.name) {
            newErrors.name = 'Name is required';
        } else if (formData.name.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (formData.name.length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name can only contain letters and spaces';
        }

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
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true
    });

    if (validateForm()) {
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registration successful!');
                navigate('/login');
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Network error. Please try again.');
        }
    }
};

    // Password strength indicator
    const getPasswordStrength = () => {
        const password = formData.password;
        if (!password) return null;

        let strength = 0;
        if (password.length >= 6) strength++;
        if (/(?=.*[a-z])/.test(password)) strength++;
        if (/(?=.*[A-Z])/.test(password)) strength++;
        if (/(?=.*\d)/.test(password)) strength++;

        const strengthLevels = ['Weak', 'Fair', 'Good', 'Strong'];
        const strengthColors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78'];

        if (strength === 0) return null;

        return {
            level: strengthLevels[strength - 1],
            color: strengthColors[strength - 1],
            width: `${(strength / 4) * 100}%`
        };
    };

    const passwordStrength = getPasswordStrength();

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
                    <h2>Create Account</h2>
                    <p>Register to start shopping</p>
                </div>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <div className={`input-wrapper ${errors.name && touched.name ? 'error' : ''}`}>
                            <FaUser className="input-icon" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.name && touched.name ? 'error' : ''}
                            />
                        </div>
                        {errors.name && touched.name && (
                            <span className="error-message">{errors.name}</span>
                        )}
                    </div>

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
                                placeholder="Create a password"
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
                        
                        {/* Password Strength Indicator */}
                        {formData.password && !errors.password && (
                            <div className="password-strength">
                                <div className="strength-bar">
                                    <div 
                                        className="strength-fill" 
                                        style={{ 
                                            width: passwordStrength?.width || '0%',
                                            backgroundColor: passwordStrength?.color || '#e2e8f0'
                                        }}
                                    ></div>
                                </div>
                                <span className="strength-text" style={{ color: passwordStrength?.color }}>
                                    {passwordStrength?.level} password
                                </span>
                            </div>
                        )}
                        
                        {errors.password && touched.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                        
                        <small className="password-hint">
                            Password must be at least 6 characters and contain uppercase, lowercase, and numbers
                        </small>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <div className={`input-wrapper ${errors.confirmPassword && touched.confirmPassword ? 'error' : ''}`}>
                            <FaLock className="input-icon" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.confirmPassword && touched.confirmPassword ? 'error' : ''}
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.confirmPassword && touched.confirmPassword && (
                            <span className="error-message">{errors.confirmPassword}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="submit-btn">
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <div className="auth-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login" className="auth-link">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Register;