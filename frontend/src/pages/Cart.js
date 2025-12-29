import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './../App.css';

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    try {
      setLoading(true);
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(items);
    } catch (error) {
      console.error('Cart fetch error:', error);
      toast.error('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) {
        handleRemoveItem(itemId);
        return;
      }

      const updatedCart = cartItems.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      
      // Update navbar cart count
      updateCartCount();
      toast.success('Cart updated');
    } catch (error) {
      console.error('Update quantity error:', error);
      toast.error('Failed to update cart');
    }
  };

  const handleRemoveItem = (itemId) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setCartItems(updatedCart);
      
      // Update navbar cart count
      updateCartCount();
      
      // Trigger cart update event for navbar
      window.dispatchEvent(new Event('cartUpdated'));
      
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Remove item error:', error);
      toast.error('Failed to remove item');
    }
  };

  const updateCartCount = () => {
    const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count-premium');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    updateCartCount();
    window.dispatchEvent(new Event('cartUpdated'));
    toast.success('Cart cleared');
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="loading-spinner"></div>
        <p className="mt-3">Loading cart...</p>
      </Container>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center shadow cart-empty-card">
              <Card.Body className="py-5">
                <h1 className="display-1 mb-4">🛒</h1>
                <h2>Your cart is empty</h2>
                <p className="text-muted mb-4">
                  Add some delicious items from our shop!
                </p>
                <Button as={Link} to="/shop/donut" variant="primary" size="lg" className="cta-btn">
                  Start Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4 cart-page">
      <h1 className="mb-4 cart-title">Your Shopping Cart</h1>
      
      <Row>
        <Col lg={8}>
          {cartItems.map(item => (
            <Card key={item.id} className="mb-3 cart-item-card">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3} md={2}>
                    <div 
                      className={`cart-item-image ${item.imageClass || ''}`}
                      style={{
                        backgroundImage: `url('/images/${item.id.includes('donut') ? 'donuts' : 
                          item.id.includes('fancy') ? 'fancies' : 
                          item.id.includes('pizza') ? 'pizza' : 
                          item.id.includes('beverage') ? 'beverages' : 'drinks'}/${item.id.replace(/donut|fancy|pizza|beverage|drink/g, '')}.png')`
                      }}
                    >
                      <div className="cart-item-image-fallback">{item.name.charAt(0)}</div>
                    </div>
                  </Col>
                  <Col xs={6} md={5}>
                    <h5 className="cart-item-name">{item.name}</h5>
                    <p className="cart-item-price text-muted mb-0">${item.price.toFixed(2)} each</p>
                  </Col>
                  <Col xs={3} md={3}>
                    <div className="quantity-controls">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="quantity-display mx-2">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={6} md={1} className="text-end">
                    <h5 className="cart-item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </h5>
                  </Col>
                  <Col xs={6} md={1} className="text-end">
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ✕
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          
          <div className="d-flex justify-content-between mt-4">
            <Button 
              as={Link} 
              to="/shop" 
              variant="outline-primary"
              className="cart-continue-btn"
            >
              Continue Shopping
            </Button>
            <Button 
              variant="outline-danger"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </Col>
        
        <Col lg={4}>
          <Card className="shadow order-summary-card">
            <Card.Header className="order-summary-header">
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>${cartItems.length > 0 ? '5.00' : '0.00'}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Tax (8%)</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold fs-5 total-item">
                  <span>Total</span>
                  <span>${(calculateTotal() + 5 + (calculateTotal() * 0.08)).toFixed(2)}</span>
                </ListGroup.Item>
              </ListGroup>
              
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mt-3 checkout-btn"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
              
              <div className="text-center mt-3">
                <small className="text-muted">
                  Free shipping on orders over $50
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;