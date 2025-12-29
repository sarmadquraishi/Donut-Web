const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['donut', 'beverage', 'pizza', 'drink'],
        required: true
    },
    image: {
        type: String,
        default: 'default-product.jpg'
    },
    available: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);