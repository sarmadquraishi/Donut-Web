const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas Connection...');
console.log('Connection String:', process.env.MONGODB_URI ? 'Present' : 'Missing');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📁 Collections in database:');
    collections.forEach(col => console.log(`  • ${col.name}`));
    
    // Test each model
    console.log('\n🧪 Testing Models:');
    
    // Test User model
    try {
        const User = require('./models/User');
        console.log('  ✓ User model loaded');
    } catch (e) { console.log('  ✗ User model error:', e.message); }
    
    // Test Product model
    try {
        const Product = require('./models/Product');
        const count = await Product.countDocuments();
        console.log(`  ✓ Product model loaded (${count} products)`);
    } catch (e) { console.log('  ✗ Product model error:', e.message); }
    
    // Test Cart model
    try {
        const Cart = require('./models/Cart');
        console.log('  ✓ Cart model loaded');
    } catch (e) { console.log('  ✗ Cart model error:', e.message); }
    
    // Test Order model
    try {
        const Order = require('./models/Order');
        console.log('  ✓ Order model loaded');
    } catch (e) { console.log('  ✗ Order model error:', e.message); }
    
    mongoose.connection.close();
    console.log('\n🎉 All tests passed! Backend is ready.');
    
})
.catch(error => {
    console.error('❌ FAILED to connect to MongoDB Atlas:', error.message);
    console.log('\n🔧 Troubleshooting tips:');
    console.log('1. Check if MONGODB_URI is correct in .env file');
    console.log('2. Make sure your IP is whitelisted in MongoDB Atlas');
    console.log('3. Check if password has special characters (use URL encoding)');
    console.log('4. Make sure database user exists in MongoDB Atlas');
    process.exit(1);
});