import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './../App.css';

// Mock products for homepage
const mockProducts = [
  {
    _id: 'donut1',
    name: 'Chocolate Donut',
    description: 'Rich chocolate frosting with rainbow sprinkles',
    price: 4.49,
    category: 'donut',
    image: '/images/donuts/chocolate.png',
    badge: 'BEST SELLER'
  },
  {
    _id: 'donut2',
    name: 'Strawberry Donut',
    description: 'Fresh strawberry glaze with berry notes',
    price: 4.39,
    category: 'donut',
    image: '/images/donuts/strawberry.jpg',
    badge: 'FRUITY'
  },
  {
    _id: 'donut7',
    name: 'Nutella Donut',
    description: 'Rich Nutella filled donut',
    price: 5.99,
    category: 'donut',
    image: '/images/donuts/nutella.jpg',
    badge: 'PREMIUM'
  },
  {
    _id: 'donut8',
    name: 'Oreo Donut',
    description: 'Crushed Oreo cookies on cream filling',
    price: 5.29,
    category: 'donut',
    image: '/images/donuts/oreo.jpg',
    badge: 'BEST SELLER'
  },
  {
    _id: 'fancy1',
    name: 'Cheese Bagel',
    description: 'Cream cheese filled bagel',
    price: 3.99,
    category: 'fancies',
    image: '/images/fancies/cheesebagel.jpg',
    badge: 'NEW'
  },
  {
    _id: 'fancy2',
    name: 'Swiss Roll',
    description: 'Chocolate swiss roll with cream',
    price: 6.99,
    category: 'fancies',
    image: '/images/fancies/swissroll.jpg',
    badge: 'PREMIUM'
  },
  {
    _id: 'fancy5',
    name: 'Chocolate Chip Cookie',
    description: 'Freshly baked chocolate chip cookie',
    price: 2.99,
    category: 'fancies',
    image: '/images/fancies/cookie.jpg',
    badge: 'CLASSIC'
  },
];

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState([
    { id: 'donut', name: 'Donuts', count: 11 },
    { id: 'fancies', name: 'Fancies', count: 7 },
    { id: 'pizza', name: 'Pizza', count: 2 },
    { id: 'beverage', name: 'Beverages', count: 5 },
    { id: 'drink', name: 'Drinks', count: 8 }
  ]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      // For now, use mock data
      setFeaturedProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setFeaturedProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast.error('Please login to add items to cart!');
        return;
      }
      
      // Get existing cart from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.id === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image
        });
      }
      
      // Save back to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Update cart count in navbar
      updateCartCount();
      
      toast.success(`${product.name} added to cart! 🛒`);
      
      // Sync cart with navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Add to cart error:', error);
      toast.error('Added to cart (demo mode)');
    }
  };

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count in navbar
    const cartCountElement = document.querySelector('.cart-count-premium');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  };

  const getProductImageClass = (productId) => {
    return `product-img-${productId}`;
  };

  return (
    <div className="home-premium">
      {/* Hero Section with Banner Background */}
      <section className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">DRUNK DONUTS</h1>
          <p className="hero-subtitle">
            Where every bite is a celebration! Experience our handcrafted donuts, 
            premium fancies, and delicious treats made with love and premium ingredients.
          </p>
          <div className="hero-cta">
            <Link to="/shop/donut" className="cta-btn">
              ORDER NOW
            </Link>
            <Link to="/shop" className="cta-btn cta-btn-secondary">
              VIEW MENU
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="menu-section-premium">
        <Container>
          <div className="section-header">
            <h2 className="section-title-premium">Featured Treats</h2>
            <p className="section-subtitle">Our most popular creations</p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="loading-spinner"></div>
              <p className="mt-3">Loading delicious treats...</p>
            </div>
          ) : (
            <div className="menu-grid-premium">
              {featuredProducts.map(product => (
                <div key={product._id} className="menu-item-premium">
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                  <div 
                    className={`product-image-container ${getProductImageClass(product._id)}`}
                    style={{
                      backgroundImage: `url('${product.image}')`
                    }}
                  >
                    <img 
                      src={product.image} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.classList.add('fallback');
                      }}
                    />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-price-section">
                    <span className="product-price">${product.price}</span>
                    <div className="product-rating">
                      ⭐⭐⭐⭐⭐
                    </div>
                  </div>
                  <button 
                    className="add-btn-premium"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>ADD TO CART</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Special Offer Banner - Fixed Size */}
      <section className="menu-section-premium">
        <Container>
          <div className="banner-premium">
            <div className="banner-overlay">
              <h2>Weekend Special! </h2>
              <p>Get 20% off on all fancies this weekend</p>
              <Link to="/shop/fancies" className="cta-btn">GRAB DEAL</Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default Home;