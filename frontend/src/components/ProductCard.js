import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

function ProductCard({ product, onAddToCart }) {
  const handleClick = () => {
    if (!product || !product._id) {
      console.error('Invalid product data:', product);
      return;
    }
    
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      console.error('onAddToCart is not a function');
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={product?.image || '/default-product.jpg'} 
        style={{ height: '200px', objectFit: 'cover' }}
        alt={product?.name || 'Product'}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product?.name || 'Unnamed Product'}</Card.Title>
        <Card.Text className="text-muted">
          {product?.description || 'Delicious item from our shop'}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="text-primary mb-0">
              ${product?.price?.toFixed(2) || '0.00'}
            </h5>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={handleClick}
              disabled={!product?._id}
            >
              <FaCartPlus /> Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;