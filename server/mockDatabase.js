const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
let users = [];
let products = [
  {
    _id: '1',
    name: 'iPhone 15 Pro',
    description: 'The latest iPhone with advanced camera system, A17 Pro chip, and titanium design.',
    price: 999,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    brand: 'Apple',
    stock: 50,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '2',
    name: 'Samsung Galaxy S24',
    description: 'Premium Android smartphone with AI features and stunning display.',
    price: 899,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    brand: 'Samsung',
    stock: 45,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '3',
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology for maximum cushioning.',
    price: 150,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    brand: 'Nike',
    stock: 100,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '4',
    name: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with responsive Boost midsole technology.',
    price: 180,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop',
    brand: 'Adidas',
    stock: 75,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '5',
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald about the Jazz Age.',
    price: 12.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
    brand: 'Scribner',
    stock: 200,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '6',
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s masterpiece about justice and racial inequality in the American South.',
    price: 14.99,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
    brand: 'Grand Central',
    stock: 150,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '7',
    name: 'Levi\'s 501 Original Jeans',
    description: 'Classic straight-leg jeans with button fly and timeless style.',
    price: 89.50,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    brand: 'Levi\'s',
    stock: 120,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '8',
    name: 'Uniqlo Ultra Light Down Jacket',
    description: 'Lightweight, packable down jacket perfect for travel and outdoor activities.',
    price: 69.90,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
    brand: 'Uniqlo',
    stock: 80,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '9',
    name: 'Philips Hue Smart Bulb',
    description: 'WiFi-enabled smart LED bulb with 16 million colors and voice control.',
    price: 49.99,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?w=400&h=400&fit=crop',
    brand: 'Philips',
    stock: 60,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '10',
    name: 'Dyson V15 Detect',
    description: 'Cordless vacuum with laser technology and powerful suction.',
    price: 699,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop',
    brand: 'Dyson',
    stock: 25,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '11',
    name: 'L\'Oreal Paris Revitalift',
    description: 'Anti-aging face cream with Pro-Retinol and Vitamin C.',
    price: 24.99,
    category: 'Beauty',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    brand: 'L\'Oreal',
    stock: 90,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  },
  {
    _id: '12',
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Iconic Star Wars spaceship with 1,329 pieces for ultimate building experience.',
    price: 159.99,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1587653410236-4627b3828a08?w=400&h=400&fit=crop',
    brand: 'LEGO',
    stock: 30,
    reviews: [],
    averageRating: 0,
    totalReviews: 0
  }
];

let reviews = [];

// Helper function to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your-super-secret-jwt-key-change-this-in-production');
    const user = users.find(u => u.id === decoded.userId);
    
    if (!user) {
      return res.status(401).json({ message: 'Token is not valid' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Routes

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the Product Review Hub API!');
});

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword
    };

    users.push(user);

    const token = jwt.sign(
      { userId: user.id },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id },
      'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/me', verifyToken, (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  res.json(userWithoutPassword);
});

// Product routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

app.post('/api/products/:id/reviews', verifyToken, (req, res) => {
  try {
    const { rating, comment } = req.body;
    const productId = req.params.id;
    
    const product = products.find(p => p._id === productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user already reviewed this product
    const existingReview = reviews.find(r => r.user === req.user.id && r.product === productId);
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = {
      id: Date.now().toString(),
      user: req.user.id,
      product: productId,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      user: {
        name: req.user.name
      }
    };

    reviews.push(review);
    product.reviews.push(review);
    
    // Update average rating
    const avgRating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length;
    product.averageRating = avgRating;
    product.totalReviews = product.reviews.length;

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Review routes
app.get('/api/reviews/my-reviews', verifyToken, (req, res) => {
  const userReviews = reviews.filter(r => r.user === req.user.id);
  const reviewsWithProducts = userReviews.map(review => {
    const product = products.find(p => p._id === review.product);
    return {
      ...review,
      product: {
        name: product.name,
        category: product.category,
        image: product.image
      }
    };
  });
  res.json(reviewsWithProducts);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Mock server running on port ${PORT}`);
  console.log(`📱 Your React app will now show all products!`);
  console.log(`⭐ You can register/login and add reviews`);
  console.log(`🌐 Open http://localhost:3000 to see your app`);
}); 