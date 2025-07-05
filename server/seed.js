const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./models/Product');

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with advanced camera system, A17 Pro chip, and titanium design.',
    price: 999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    brand: 'Apple',
    stock: 50
  },
  {
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI features and stunning display.',
    price: 899,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    brand: 'Samsung',
    stock: 45
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology for maximum cushioning.',
    price: 150,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Nike',
    stock: 100
  },
  {
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive Boost midsole technology.',
    price: 180,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    brand: 'Adidas',
    stock: 75
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald about the Jazz Age.',
    price: 12.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    brand: 'Scribner',
    stock: 200
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s masterpiece about justice and racial inequality in the American South.',
    price: 14.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    brand: 'Grand Central',
    stock: 150
  },
  {
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight-leg jeans with button fly and timeless style.',
    price: 89.50,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    brand: 'Levi\'s',
    stock: 120
  },
  {
    name: 'Uniqlo Ultra Light Down Jacket',
    description: 'Lightweight, packable down jacket perfect for travel and outdoor activities.',
    price: 69.90,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    brand: 'Uniqlo',
    stock: 80
  },
  {
    name: 'Philips Hue Smart Bulb',
    description: 'WiFi-enabled smart LED bulb with 16 million colors and voice control.',
    price: 49.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&h=400&fit=crop',
    brand: 'Philips',
    stock: 60
  },
  {
    name: 'Dyson V15 Detect',
    description: 'Cordless vacuum with laser technology and powerful suction.',
    price: 699,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
    brand: 'Dyson',
    stock: 25
  },
  {
    name: 'L\'Oreal Paris Revitalift',
    description: 'Anti-aging face cream with Pro-Retinol and Vitamin C.',
    price: 24.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    brand: 'L\'Oreal',
    stock: 90
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Iconic Star Wars spaceship with 1,329 pieces for ultimate building experience.',
    price: 159.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1587653410236-4627b3828a08?w=400&h=400&fit=crop',
    brand: 'LEGO',
    stock: 30
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 