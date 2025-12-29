const express = require('express');
const router = express.Router();

// GET /api/cart - Get cart items
router.get('/', (req, res) => {
  try {
    console.log('GET /api/cart called');
    
    // Return sample cart for testing
    const sampleCart = {
      _id: 'test-cart-id',
      userId: 'test-user-id',
      items: [
        {
          _id: 'item1',
          productId: {
            _id: 'donut1',
            name: 'Glazed Donut',
            price: 2.99,
            image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=400&h=300&fit=crop'
          },
          quantity: 2
        },
        {
          _id: 'item2',
          productId: {
            _id: 'donut2',
            name: 'Chocolate Donut',
            price: 3.49,
            image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop'
          },
          quantity: 1
        }
      ],
      updatedAt: new Date()
    };
    
    res.json(sampleCart);
    
  } catch (error) {
    console.error('Cart GET error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
});

// POST /api/cart - Add item to cart
router.post('/', (req, res) => {
  try {
    console.log('POST /api/cart called with:', req.body);
    
    const { productId, quantity } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
    
    // Create success response
    const response = {
      message: 'Item added to cart successfully!',
      item: {
        _id: Date.now().toString(),
        productId: productId,
        quantity: quantity || 1,
        addedAt: new Date()
      },
      success: true
    };
    
    console.log('Returning:', response);
    res.status(201).json(response);
    
  } catch (error) {
    console.error('Cart POST error:', error);
    res.status(500).json({ 
      error: 'Server error',
      message: error.message,
      stack: error.stack 
    });
  }
});

// PUT /api/cart/:itemId - Update quantity
router.put('/:itemId', (req, res) => {
  try {
    const { quantity } = req.body;
    
    res.json({
      message: 'Cart item updated successfully',
      itemId: req.params.itemId,
      quantity: quantity,
      success: true
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      success: false 
    });
  }
});

// DELETE /api/cart/:itemId - Remove item
router.delete('/:itemId', (req, res) => {
  try {
    res.json({
      message: 'Item removed from cart successfully',
      itemId: req.params.itemId,
      success: true
    });
    
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      success: false 
    });
  }
});

module.exports = router;