import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './../App.css';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'card'
  });

  // Backend API URL
  const API_URL = 'http://localhost:5000/api';

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(items);
    } catch (error) {
      console.error('Error loading cart:', error);
      toast.error('Failed to load cart items');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = cartItems.length > 0 ? 5 : 0;
    const tax = subtotal * 0.08;
    return subtotal + shipping + tax;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }

    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      
      // Prepare order data
      const orderData = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city || '',
          postalCode: formData.postalCode || ''
        },
        items: cartItems.map(item => ({
          productId: item.id || 'demo-id',
          name: item.name || 'Product',
          price: parseFloat(item.price) || 0,
          quantity: parseInt(item.quantity) || 1,
          image: item.image || ''
        })),
        subtotal: parseFloat(calculateSubtotal().toFixed(2)),
        shipping: cartItems.length > 0 ? 5 : 0,
        tax: parseFloat((calculateSubtotal() * 0.08).toFixed(2)),
        total: parseFloat(calculateTotal().toFixed(2)),
        paymentMethod: formData.paymentMethod,
        status: 'pending'
      };

      console.log('📤 Sending order to backend...');

      // Send order to backend
      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('✅ Backend response:', response.data);

      if (response.data.success) {
        // Clear cart
        localStorage.removeItem('cartItems');
        
        // Update navbar
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Save order reference locally
        const orderId = response.data.order?._id || response.data.orderId || 'DEMO-' + Date.now();
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        existingOrders.push({
          id: orderId,
          ...orderData,
          date: new Date().toISOString()
        });
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        toast.success('🎉 Order placed successfully!');
        
        setTimeout(() => {
          navigate('/orders');
        }, 1500);
      }

    } catch (error) {
      console.error('❌ Checkout error:', error.response?.data || error.message);
      
      // Fallback to localStorage
      const order = {
        id: 'LOCAL-' + Date.now(),
        customer: formData,
        items: cartItems,
        subtotal: calculateSubtotal(),
        shipping: cartItems.length > 0 ? 5 : 0,
        tax: calculateSubtotal() * 0.08,
        total: calculateTotal(),
        status: 'pending',
        date: new Date().toISOString(),
        paymentMethod: formData.paymentMethod
      };

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
      
      localStorage.removeItem('cartItems');
      
      toast.success('✅ Order saved locally!');
      setTimeout(() => {
        navigate('/orders');
      }, 1500);
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center shadow">
              <Card.Body className="py-5">
                <h1 className="display-1 mb-4">🛒</h1>
                <h2>Your cart is empty</h2>
                <p className="text-muted mb-4">
                  Add some items to your cart before checking out
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/shop')}
                >
                  Go Shopping
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-4 checkout-page">
      <h1 className="mb-4 checkout-title">Checkout</h1>
      
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            <Card className="mb-4 checkout-form-card">
              <Card.Header className="checkout-form-header">
                <h5 className="mb-0">Shipping Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12} className="mb-3">
                    <Form.Group>
                      <Form.Label>Address *</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your street address"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Enter your city"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group>
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        placeholder="Enter ZIP code"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card className="checkout-form-card">
              <Card.Header className="checkout-form-header">
                <h5 className="mb-0">Payment Method</h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    id="cash"
                    name="paymentMethod"
                    label="💵 Cash on Delivery"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Check
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    label="💳 Credit/Debit Card"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Alert variant="info" className="mt-3">
                  <small>
                    💡 <strong>Demo Mode:</strong> This is a demo checkout. No real payment will be processed.
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="checkout-summary-card sticky-top">
              <Card.Header className="checkout-summary-header">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="order-items mb-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="order-item d-flex justify-content-between mb-2">
                      <div>
                        <span className="order-item-name">{item.name}</span>
                        <small className="text-muted d-block">Qty: {item.quantity}</small>
                      </div>
                      <span className="order-item-price">
                        ${(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="order-totals">
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping</span>
                    <span>${cartItems.length > 0 ? '5.00' : '0.00'}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax (8%)</span>
                    <span>${(calculateSubtotal() * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold fs-5 mt-3 pt-3 border-top">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="w-100 mt-4 checkout-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Processing...' : 'Place Order'}
                </Button>

                <div className="text-center mt-3">
                  <small className="text-muted">
                    By placing your order, you agree to our terms and conditions
                  </small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Checkout;