// Run this to set up everything
const fs = require('fs');
const path = require('path');

// Create routes folder
if (!fs.existsSync('routes')) fs.mkdirSync('routes');

// Create all route files
const routes = {
    'auth.js': `const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });
        user = new User({ name, email, password });
        await user.save();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;`,

    'products.js': `const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:category', async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;`,

    'cart.js': `const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find({}).populate('items.productId');
        res.json(carts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;`,

    'orders.js': `const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;`
};

// Write files
Object.entries(routes).forEach(([filename, content]) => {
    fs.writeFileSync(path.join('routes', filename), content);
    console.log(`✅ Created routes/${filename}`);
});

console.log('\n🎉 All route files created!');
console.log('Now run: node server.js');