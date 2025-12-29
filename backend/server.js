const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARE
// ============================================
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(passport.initialize());

// ============================================
// MONGODB CONNECTION
// ============================================
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/donutshop';

console.log('🔗 Connecting to MongoDB...');
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log(`📊 Database: ${mongoose.connection.name}`);
})
.catch(err => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.log('💡 Check your MONGODB_URI in .env file');
});

// ============================================
// SCHEMAS
// ============================================

// User Schema
const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  avatar: String,
  role: { type: String, default: 'customer' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String },
    postalCode: { type: String }
  },
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    image: { type: String }
  }],
  subtotal: { type: Number, required: true },
  shipping: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'pending' }
}, { 
  timestamps: true 
});

const Order = mongoose.model('Order', orderSchema);

// ============================================
// PASSPORT GOOGLE STRATEGY
// ============================================
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log('🔑 Google Profile Received:', profile.displayName);
      
      // Check if user exists by googleId or email
      let user = await User.findOne({ 
        $or: [
          { googleId: profile.id },
          { email: profile.emails[0].value }
        ]
      });
      
      if (!user) {
        // Create new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos[0]?.value,
          role: 'customer'
        });
        await user.save();
        console.log('✅ New user created via Google:', user.email);
      } else {
        // Update existing user with googleId if missing
        if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }
        console.log('✅ Existing user logged in:', user.email);
      }
      
      return done(null, user);
    } catch (error) {
      console.error('❌ Google auth error:', error);
      return done(error, null);
    }
  }
));

// ============================================
// JWT HELPER
// ============================================
const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id, 
      email: user.email, 
      name: user.name,
      role: user.role,
      avatar: user.avatar
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// ============================================
// ROUTES
// ============================================

// 1. Root route
app.get('/', (req, res) => {
  res.json({ 
    message: '🍩 Donut Shop Backend API',
    version: '1.0.0',
    endpoints: {
      googleLogin: 'GET /api/auth/google',
      test: 'GET /api/test',
      health: 'GET /api/health',
      createOrder: 'POST /api/orders',
      getOrders: 'GET /api/orders'
    },
    timestamp: new Date()
  });
});

// 2. Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Backend is working!', 
    timestamp: new Date(),
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// 3. Health check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  let dbMessage = 'disconnected';
  
  switch(dbStatus) {
    case 0: dbMessage = 'disconnected'; break;
    case 1: dbMessage = 'connected'; break;
    case 2: dbMessage = 'connecting'; break;
    case 3: dbMessage = 'disconnecting'; break;
  }
  
  res.json({
    status: 'OK',
    serverTime: new Date(),
    database: {
      status: dbMessage,
      readyState: dbStatus,
      name: mongoose.connection.name,
      host: mongoose.connection.host
    }
  });
});

// ============================================
// GOOGLE AUTH ROUTES
// ============================================

// 4. Start Google Login
app.get('/api/auth/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
);

// 5. Google Callback
app.get('/api/auth/google/callback',
  passport.authenticate('google', { 
    failureRedirect: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?error=auth_failed`,
    session: false 
  }),
  async (req, res) => {
    try {
      console.log('🎯 Google login successful for:', req.user.email);
      
      // Generate JWT token
      const token = generateToken(req.user);
      
      // Prepare user data for frontend
      const userData = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        role: req.user.role
      };
      
      // Redirect to frontend with token
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendURL}/auth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`);
      
    } catch (error) {
      console.error('❌ Token generation error:', error);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendURL}/login?error=token_error`);
    }
  }
);

// 6. Verify token
app.get('/api/auth/verify', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No token provided' 
    });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Optional: Check if user still exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    res.json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
});

// ============================================
// ORDER ROUTES
// ============================================

// 7. Create order
app.post('/api/orders', async (req, res) => {
  try {
    console.log('📦 Received order request');
    
    if (!req.body.customer || !req.body.items) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: customer or items'
      });
    }

    const order = new Order({
      customer: req.body.customer,
      items: req.body.items,
      subtotal: req.body.subtotal || 0,
      shipping: req.body.shipping || 0,
      tax: req.body.tax || 0,
      total: req.body.total || 0,
      paymentMethod: req.body.paymentMethod || 'card',
      status: 'pending'
    });

    const savedOrder = await order.save();
    
    console.log('✅ Order saved to MongoDB:', savedOrder._id);
    
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: savedOrder,
      orderId: savedOrder._id
    });

  } catch (error) {
    console.error('❌ Error saving order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: error.message
    });
  }
});

// 8. Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: orders.length,
      orders: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    requestedUrl: req.originalUrl,
    availableRoutes: [
      '/',
      '/api/test',
      '/api/health',
      '/api/auth/google',
      '/api/auth/verify',
      'POST /api/orders',
      'GET /api/orders'
    ]
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`🔗 Google Login: http://localhost:${PORT}/api/auth/google`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🎯 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔑 Google Client ID: ${process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
});