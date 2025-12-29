import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './../App.css';

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    try {
      setLoading(true);
      const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(savedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  const clearOrders = () => {
    if (window.confirm('Are you sure you want to clear all order history?')) {
      localStorage.removeItem('orders');
      setOrders([]);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="loading-spinner"></div>
        <p className="mt-3">Loading orders...</p>
      </Container>
    );
  }

  if (orders.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card className="text-center shadow">
              <Card.Body className="py-5">
                <h1 className="display-1 mb-4">📦</h1>
                <h2>No Orders Yet</h2>
                <p className="text-muted mb-4">
                  You haven't placed any orders yet.
                </p>
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/shop')}
                >
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
    <Container className="py-4 orders-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="orders-title">Your Order History</h1>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={clearOrders}
        >
          Clear All Orders
        </Button>
      </div>
      
      <p className="text-muted mb-4">
        You have {orders.length} order{orders.length !== 1 ? 's' : ''}
      </p>
      
      {orders.map((order, index) => (
        <Card key={order.id || index} className="mb-4 order-card shadow">
          <Card.Header className="order-card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Order #{order.id || `ORD-${index + 1}`}</h5>
                <small className="text-muted">{formatDate(order.date || new Date())}</small>
              </div>
              <span className={`order-status ${order.status === 'completed' ? 'status-completed' : 'status-pending'}`}>
                {order.status || 'completed'}
              </span>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="mb-4">
              <h6>📦 Shipping Information:</h6>
              <Row className="mt-2">
                <Col md={6}>
                  <p className="mb-1"><strong>Name:</strong> {order.customer?.fullName || 'Customer'}</p>
                  <p className="mb-1"><strong>Email:</strong> {order.customer?.email || 'Not provided'}</p>
                  <p className="mb-1"><strong>Phone:</strong> {order.customer?.phone || 'Not provided'}</p>
                </Col>
                <Col md={6}>
                  <p className="mb-1"><strong>Address:</strong> {order.customer?.address || 'Not provided'}</p>
                  <p className="mb-1"><strong>City:</strong> {order.customer?.city || 'Not provided'}</p>
                  <p className="mb-1"><strong>ZIP Code:</strong> {order.customer?.postalCode || 'Not provided'}</p>
                </Col>
              </Row>
              <p className="mb-1 mt-2"><strong>Payment Method:</strong> {order.paymentMethod || 'Cash on Delivery'}</p>
            </div>
            
            <h6>🛒 Order Items:</h6>
            <Table responsive className="order-items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.name || 'Product'}</td>
                    <td className="text-center">{item.quantity || 1}</td>
                    <td className="text-end">${(item.price || 0).toFixed(2)}</td>
                    <td className="text-end">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Subtotal:</strong></td>
                  <td className="text-end">${(order.subtotal || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Shipping:</strong></td>
                  <td className="text-end">${(order.shipping || 0).toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="3" className="text-end"><strong>Tax:</strong></td>
                  <td className="text-end">${(order.tax || 0).toFixed(2)}</td>
                </tr>
                <tr className="order-total-row">
                  <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                  <td className="text-end">${(order.total || order.totalAmount || 0).toFixed(2)}</td>
                </tr>
              </tfoot>
            </Table>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default OrdersPage;