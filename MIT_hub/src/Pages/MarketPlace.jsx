import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFirebase } from '../Context/FirebaseContext';
import { useNavigate } from 'react-router-dom';
import '../CSS/Marketplace.css';

const MarketPlace = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [minRating, setMinRating] = useState(0);
  const { user, addToCart, addToWishlist, cart, wishlist } = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery, priceRange, minRating]);

  async function fetchData() {
    try {
      const res = await axios.get('https://mit-marketplace-6e367-default-rtdb.firebaseio.com/products.json');
      if (res.data) {
        const productsArray = Object.values(res.data);
        setProducts(productsArray);
        // Extract unique categories
        const uniqueCategories = [...new Set(productsArray.map(product => product.category))];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  const filterProducts = () => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price range filter
    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Rating filter
    filtered = filtered.filter(product => product.rating >= minRating);

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart(product);
  };

  const handleAddToWishlist = (product) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToWishlist(product);
  };

  return (
    <div className="marketplace-container">
      <div className="filters-section">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div className="price-filter">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.min}
            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange.max}
            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
          />
          <span>${priceRange.min} - ${priceRange.max}</span>
        </div>

        <div className="rating-filter">
          <label>Minimum Rating:</label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          >
            <option value="0">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="1">1+ Star</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.thumbnail} alt={product.title} className="product-image" />
            <div className="product-info">
              <h3>{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-details">
                <p className="price">${product.price.toFixed(2)}</p>
                <p className="rating">Rating: {product.rating}/5</p>
              </div>
              <div className="product-actions">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="action-button cart-button"
                  disabled={!user}
                >
                  {cart.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={() => handleAddToWishlist(product)}
                  className="action-button wishlist-button"
                  disabled={!user}
                >
                  {wishlist.some(item => item.id === product.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPlace;