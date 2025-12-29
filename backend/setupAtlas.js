// setupAtlas.js - One-click database setup
const mongoose = require('mongoose');
require('dotenv').config();

// Your MongoDB Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 
    'mongodb+srv://donutshop_user:DonutShop@123@cluster0.mongodb.net/donutshop?retryWrites=true&w=majority';

// Sample products data
const sampleProducts = [
    {
        name: "Glazed Donut",
        description: "Classic sugar-glazed donut",
        price: 2.99,
        category: "donut",
        image: "https://cdn.pixabay.com/photo/2017/10/14/09/56/doughnut-2850011_1280.jpg",
        available: true
    },
    {
        name: "Chocolate Donut",
        description: "Rich chocolate frosted donut",
        price: 3.49,
        category: "donut",
        image: "https://cdn.pixabay.com/photo/2017/10/14/09/56/doughnut-2850011_1280.jpg",
        available: true
    },
    {
        name: "Cappuccino",
        description: "Fresh coffee with milk",
        price: 4.99,
        category: "beverage",
        image: "https://cdn.pixabay.com/photo/2015/05/07/13/46/cappuccino-756490_1280.jpg",
        available: true
    },
    {
        name: "Pepperoni Pizza",
        description: "Cheesy pizza with pepperoni",
        price: 14.99,
        category: "pizza",
        image: "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg",
        available: true
    },
    {
        name: "Cola",
        description: "Refreshing cola drink",
        price: 1.99,
        category: "drink",
        image: "https://cdn.pixabay.com/photo/2016/11/29/08/24/cola-1868168_1280.jpg",
        available: true
    }
];

async function setupDatabase() {
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log('✅ Connected to MongoDB Atlas!');
        
        // Create collections automatically when we insert data
        const db = mongoose.connection.db;
        
        // Insert sample products
        const productsCollection = db.collection('products');
        await productsCollection.deleteMany({}); // Clear existing
        await productsCollection.insertMany(sampleProducts);
        
        console.log(`✅ Inserted ${sampleProducts.length} sample products`);
        
        // Create users collection with index
        const usersCollection = db.collection('users');
        await usersCollection.createIndex({ email: 1 }, { unique: true });
        console.log('✅ Created users collection');
        
        // Create carts collection
        const cartsCollection = db.collection('carts');
        await cartsCollection.createIndex({ userId: 1 }, { unique: true });
        console.log('✅ Created carts collection');
        
        // Create orders collection
        const ordersCollection = db.collection('orders');
        console.log('✅ Created orders collection');
        
        console.log('\n🎉 Database setup complete!');
        console.log('\n📊 Collections created:');
        const collections = await db.listCollections().toArray();
        collections.forEach(col => {
            console.log(`   • ${col.name}`);
        });
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

setupDatabase();