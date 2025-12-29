const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  // Donuts
  { name: 'Glazed Donut', price: 2.99, category: 'donut', image: 'https://via.placeholder.com/300x200?text=Glazed+Donut' },
  { name: 'Chocolate Donut', price: 3.49, category: 'donut', image: 'https://via.placeholder.com/300x200?text=Chocolate+Donut' },
  { name: 'Strawberry Donut', price: 3.29, category: 'donut', image: 'https://via.placeholder.com/300x200?text=Strawberry+Donut' },
  
  // Beverages
  { name: 'Cappuccino', price: 4.99, category: 'beverage', image: 'https://via.placeholder.com/300x200?text=Cappuccino' },
  { name: 'Hot Chocolate', price: 3.99, category: 'beverage', image: 'https://via.placeholder.com/300x200?text=Hot+Chocolate' },
  
  // Pizza
  { name: 'Margherita Pizza', price: 12.99, category: 'pizza', image: 'https://via.placeholder.com/300x200?text=Margherita+Pizza' },
  { name: 'Pepperoni Pizza', price: 14.99, category: 'pizza', image: 'https://via.placeholder.com/300x200?text=Pepperoni+Pizza' },
  
  // Drinks
  { name: 'Cola', price: 1.99, category: 'drink', image: 'https://via.placeholder.com/300x200?text=Cola' },
  { name: 'Orange Juice', price: 2.49, category: 'drink', image: 'https://via.placeholder.com/300x200?text=Orange+Juice' },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();