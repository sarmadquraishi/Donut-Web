import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <Row className="align-items-center mb-3 p-3 border rounded">
      <Col md={2}>
        <img 
          src={item.productId.image || '/default-product.jpg'} 
          alt={item.productId.name}
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
          className="rounded"
        />
      </Col>
      
      <Col md={4}>
        <h6 className="mb-0">{item.productId.name}</h6>
        <small className="text-muted">
          ${item.productId.price.toFixed(2)} each
        </small>
      </Col>
      
      <Col md={3}>
        <Form.Select 
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item._id, parseInt(e.target.value))}
          size="sm"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </Form.Select>
      </Col>
      
      <Col md={2}>
        <h6 className="mb-0">
          ${(item.productId.price * item.quantity).toFixed(2)}
        </h6>
      </Col>
      
      <Col md={1}>
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={() => onRemove(item._id)}
        >
          <FaTrash />
        </Button>
      </Col>
    </Row>
  );
}

export default CartItem;