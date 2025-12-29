import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHome, FaStore, FaBirthdayCake, FaPizzaSlice, FaCocktail } from 'react-icons/fa';
import './../App.css';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Load user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Load cart count
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalItems);
    
    // Update cart count when localStorage changes
    const handleStorageChange = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom cart update events
    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const totalItems = updatedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar-premium">
      <div className="navbar-container">
       {/* Logo Section */}
<div className="nav-logo-container">
  <div className="logo-image nav-logo-size"></div>
  <Link to="/" className="logo-text-link">
    <div className="logo-text">DRUNK DONUTS</div>
  </Link>
</div>

        {/* Navigation Links */}
        <div className={`nav-links-premium ${isMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/home" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaHome className="nav-icon" /> <span className="nav-text">Home</span>
          </Link>
          
          <Link to="/shop/donut" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaBirthdayCake className="nav-icon" /> <span className="nav-text">Donuts</span>
          </Link>
          
          <Link to="/shop/fancies" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaCocktail className="nav-icon" /> <span className="nav-text">Fancies</span>
          </Link>
          
          <Link to="/shop/pizza" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaPizzaSlice className="nav-icon" /> <span className="nav-text">Pizza</span>
          </Link>
          
           <Link to="/shop/beverage" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaStore className="me-2" /> Beverages
          </Link>

          
           <Link to="/shop/drink" className="nav-link-item" onClick={() => setIsMenuOpen(false)}>
            <FaCocktail className="me-2" /> Drinks
          </Link>

        </div>

        {/* Right Side - Cart & User */}
        <div className="nav-right-section">
          {/* Cart Icon */}
          <div className="nav-cart-container" onClick={() => navigate('/cart')}>
            <div className="nav-cart-premium">
              <FaShoppingCart className="cart-icon-premium" />
              {cartCount > 0 && (
                <span className="cart-count-premium">{cartCount}</span>
              )}
            </div>
          </div>

          {/* User Menu */}
          <div className="user-dropdown-container">
            <button 
              className="nav-user-btn"
              onClick={toggleDropdown}
              onBlur={() => setTimeout(() => closeDropdown(), 200)}
            >
              <FaUser className="user-icon" />
              <span className="user-text">{user?.name || 'Account'}</span>
              <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
            </button>
            
            {isDropdownOpen && (
              <div className="dropdown-menu-premium">
                {user ? (
                  <>
                    <div className="dropdown-header">
                      <div className="dropdown-avatar">👤</div>
                      <div>
                        <div className="dropdown-username">{user.name}</div>
                        <div className="dropdown-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <Link to="/profile" className="dropdown-item-premium" onClick={closeDropdown}>
                      <FaUser className="me-2" /> Profile
                    </Link>
                    <Link to="/orders" className="dropdown-item-premium" onClick={closeDropdown}>
                       My Orders
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item-premium logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-item-premium" onClick={closeDropdown}>
                       Login
                    </Link>
                    <Link to="/register" className="dropdown-item-premium" onClick={closeDropdown}>
                       Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className={`toggle-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`toggle-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`toggle-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;