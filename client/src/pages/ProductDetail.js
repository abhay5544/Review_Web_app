import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
  Box,
  Chip,
  Button,
  TextField,
  Divider,
  Avatar,
  Alert,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError('Please login to add a review');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await axios.post(`http://localhost:5000/api/products/${id}/reviews`, reviewForm);
      setReviewForm({ rating: 5, comment: '' });
      fetchProduct(); // Refresh product data to show new review
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add review');
    } finally {
      setSubmitting(false);
    }
  };

  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Loading product...</Typography>
      </Container>
    );
  }

  if (error && !product) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {product && (
        <>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component="img"
                  height="400"
                  image={product.image || 'https://via.placeholder.com/400x400?text=Product+Image'}
                  alt={product.name}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {product.description}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={parseFloat(calculateAverageRating(product.reviews))}
                  precision={0.5}
                  readOnly
                  size="large"
                />
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {calculateAverageRating(product.reviews)}/5
                </Typography>
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.reviews?.length || 0} reviews)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Chip 
                  label={product.category} 
                  color="primary" 
                  variant="outlined"
                  sx={{ mr: 2 }}
                />
                <Typography variant="h5" color="primary">
                  ${product.price}
                </Typography>
              </Box>

              {isAuthenticated && (
                <Card sx={{ mt: 3 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Add Your Review
                    </Typography>
                    {error && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                      </Alert>
                    )}
                    <Box component="form" onSubmit={handleReviewSubmit}>
                      <Box sx={{ mb: 2 }}>
                        <Typography component="legend">Rating</Typography>
                        <Rating
                          value={reviewForm.rating}
                          onChange={(event, newValue) => {
                            setReviewForm({ ...reviewForm, rating: newValue });
                          }}
                        />
                      </Box>
                      <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Your Review"
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                        margin="normal"
                        required
                      />
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={submitting}
                        sx={{ mt: 2 }}
                      >
                        {submitting ? 'Submitting...' : 'Submit Review'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              Reviews ({product.reviews?.length || 0})
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ mr: 2 }}>
                        {review.user?.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1">
                          {review.user?.name}
                        </Typography>
                        <Rating value={review.rating} readOnly size="small" />
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body1" color="text.secondary">
                No reviews yet. Be the first to review this product!
              </Typography>
            )}
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductDetail; 