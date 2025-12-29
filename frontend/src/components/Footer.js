import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from 'react-icons/fa';
import './../App.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-premium">
      <div className="footer-container-premium">
        {/* Brand & About Section */}
        <div className="footer-logo-section">
          <div className="footer-logo">
            <div className="footer-logo-image"></div>
            <div className="footer-logo-text"></div>
          </div>
          <p className="footer-description">
            Serving the most delicious donuts, pizzas, and beverages since 2023. 
            Quality ingredients, irresistible flavors, and unmatched customer service.
          </p>
          <div className="social-icons">
            <a href="https://linktr.ee/visualsbysarmad" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={20} />
            </a>
            <a href="https://www.instagram.com/visualsbysarmad/#" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={20} />
            </a>
            <a href="https://youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section-premium">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/shop/donut">Our Donuts</Link></li>
            <li><Link to="/shop/fancies">Fancies Collection</Link></li>
            <li><Link to="/shop/pizza">Pizza Menu</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/checkout">Checkout</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section-premium">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/shop/donut"> Donuts (11+)</Link></li>
            <li><Link to="/shop/fancies"> Fancies (7)</Link></li>
            <li><Link to="/shop/pizza"> Pizza (2)</Link></li>
            <li><Link to="/shop/beverage"> Beverages</Link></li>
            <li><Link to="/shop/drink"> Cold Drinks</Link></li>
            <li><Link to="/shop"> All Products</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section-premium">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FaMapMarkerAlt className="me-2" />
              <span>123 Sweet Street, Donut City, DC 10101</span>
            </li>
            <li>
              <FaPhone className="me-2" />
              <span>+1 (555) DON-UTS1</span>
            </li>
            <li>
              <FaEnvelope className="me-2" />
              <span>hello@drunndonuts.com</span>
            </li>
          </ul>
          
          <div className="business-hours">
            <h4>Business Hours</h4>
            <p className="business-hours-text">
              Mon-Fri: 7:00 AM - 10:00 PM<br/>
              Sat-Sun: 8:00 AM - 11:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="payment-methods">
        <h4 className="payment-title">We Accept</h4>
        <div className="payment-icons">
          <FaCcVisa size={40} className="payment-icon" />
          <FaCcMastercard size={40} className="payment-icon" />
          <FaCcPaypal size={40} className="payment-icon" />
          <FaApplePay size={40} className="payment-icon" />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-premium">
        <div className="footer-bottom-container">
          <div className="footer-copyright">
            <p className="copyright-text">
              &copy; {currentYear} Drunk Donuts. All rights reserved.
            </p>
          </div>
          <div className="footer-links-container">
            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <span className="footer-link-separator">•</span>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <span className="footer-link-separator">•</span>
              <Link to="/faq" className="footer-link">FAQ</Link>
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
        ↑
      </button>
    </footer>
  );
}

export default Footer;