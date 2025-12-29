const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔗 Connecting to MongoDB Atlas...');
        
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
        
        // Create indexes for better performance
        await createIndexes();
        
        // Insert sample data if empty
        await seedSampleData();
        
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

const createIndexes = async () => {
    try {
        const db = mongoose.connection.db;
        
        // Create indexes for users collection
        await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
        
        // Create indexes for products collection
        await mongoose.connection.collection('products').createIndex({ category: 1 });
        await mongoose.connection.collection('products').createIndex({ name: 1 });
        
        // Create indexes for carts collection
        await mongoose.connection.collection('carts').createIndex({ userId: 1 }, { unique: true });
        
        // Create indexes for orders collection
        await mongoose.connection.collection('orders').createIndex({ userId: 1 });
        await mongoose.connection.collection('orders').createIndex({ createdAt: -1 });
        
        console.log('✅ Database indexes created');
    } catch (error) {
        console.error('Index creation error:', error);
    }
};

const seedSampleData = async () => {
    try {
        const Product = require('../models/Product');
        const count = await Product.countDocuments();
        
        if (count === 0) {
            console.log('📦 Inserting sample products...');
            
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
                    name: "Chocolate Sprinkle Donut",
                    description: "Chocolate frosted with colorful sprinkles",
                    price: 3.49,
                    category: "donut",
                    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Boston Cream Donut",
                    description: "Custard filled with chocolate glaze",
                    price: 3.99,
                    category: "donut",
                    image: "https://images.unsplash.com/photo-1506224477000-07aa8a76be20?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Cappuccino",
                    description: "Rich espresso with steamed milk foam",
                    price: 4.99,
                    category: "beverage",
                    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Hot Chocolate",
                    description: "Creamy chocolate drink with marshmallows",
                    price: 3.99,
                    category: "beverage",
                    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Margherita Pizza",
                    description: "Classic tomato, mozzarella and basil",
                    price: 12.99,
                    category: "pizza",
                    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Pepperoni Pizza",
                    description: "Cheesy pizza with pepperoni slices",
                    price: 14.99,
                    category: "pizza",
                    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Cola",
                    description: "Classic fizzy cola drink",
                    price: 1.99,
                    category: "drink",
                    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=300&fit=crop",
                    available: true
                },
                {
                    name: "Orange Juice",
                    description: "Freshly squeezed orange juice",
                    price: 2.49,
                    category: "drink",
                    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop",
                    available: true
                }
            ];
            
            await Product.insertMany(sampleProducts);
            console.log(`✅ Inserted ${sampleProducts.length} sample products`);
        }
    } catch (error) {
        console.error('Sample data insertion error:', error);
    }
};

module.exports = connectDB;