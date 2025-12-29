import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './../App.css';

// Complete products data with all categories
const allProducts = [
  // ========== 🍩 DONUTS (11 items) ==========
  {
    _id: 'donut1',
    name: 'Chocolate Sprinkle',
    description: 'Soft donut covered in chocolate glaze and topped with colorful rainbow sprinkles',
    price: 3.99,
    category: 'donut',
    featured: true,
    tags: ['BEST SELLER', 'CLASSIC']
  },
  {
    _id: 'donut2',
    name: 'Boston Kreme',
    description: 'A light and fluffy donut filled with our silky Bavarian cream, finished with a smooth, rich chocolate glaze.',
    price: 4.49,
    category: 'donut',
    featured: true,
    tags: ['CHOCOLATE', 'KID FAVORITE']
  },
  {
    _id: 'donut3',
    name: 'Choco Balls',
    description: 'Soft donut covered in glossy chocolate glaze and topped with crunchy chocolate biscuit balls.',
    price: 4.29,
    category: 'donut',
    featured: false,
    tags: ['FRUITY', 'PINK']
  },
  {
    _id: 'donut4',
    name: 'Coffee Marble',
    description: 'A delightful coffee topped dough, finished with a light glaze to complement the harmonious flavors.',
    price: 4.99,
    category: 'donut',
    featured: false,
    tags: ['CREAM FILLED', 'CHOCOLATE']
  },
  {
    _id: 'donut5',
    name: 'Choco Fruiti',
    description: 'A soft donut filled with creamy chocolate, frosted with chocolate glaze, bunties, and vanilla swirls.',
    price: 5.99,
    category: 'donut',
    featured: true,
    tags: ['PREMIUM', 'SALTY SWEET']
  },
  {
    _id: 'donut6',
    name: 'Double Chocolatet',
    description: 'Fluffy donut filled with Bavarian cream, frosted with chocolate, and topped with chocolate chips.',
    price: 4.79,
    category: 'donut',
    featured: false,
    tags: ['FRUIT FILLED', 'BLUEBERRY']
  },
  {
    _id: 'donut7',
    name: 'Nutella Dream',
    description: 'Warm cinnamon and sugar coating',
    price: 3.79,
    category: 'donut',
    featured: false,
    tags: ['CLASSIC', 'CINNAMON']
  },
  {
    _id: 'donut8',
    name: 'Oreo Overload',
    description: 'Soft donut topped with blue vanilla frosting, chocolate swirls, and a whole Oreo Biscuit on top.',
    price: 5.49,
    category: 'donut',
    featured: true,
    tags: ['PREMIUM', 'ASIAN FLAVOR']
  },
  {
    _id: 'donut9',
    name: 'Red Velvet Donut',
    description: 'Red velvet cake donut with cream cheese frosting',
    price: 4.99,
    category: 'donut',
    featured: false,
    tags: ['CAKE DONUT', 'RED VELVET']
  },
  {
    _id: 'donut10',
    name: 'Smily Faced',
    description: 'Fluffy donut filled with strawberry jam, topped with zesty lemon frosting for a citrusy twist',
    price: 5.29,
    category: 'donut',
    featured: true,
    tags: ['CARAMEL', 'PREMIUM']
  },
  {
    _id: 'donut11',
    name: 'Strawberry Sprinkle',
    description: 'Soft donut dipped in strawberry glaze and topped with vibrant rainbow sprinkles',
    price: 5.99,
    category: 'donut',
    featured: true,
    tags: ['CREAM FILLED', 'COOKIE']
  },

  // ========== 🎂 FANCIES (7 items) ==========
  {
    _id: 'fancy1',
    name: 'Chocolate Éclair',
    description: 'French pastry with chocolate glaze and cream filling',
    price: 8.99,
    category: 'fancies',
    featured: true,
    tags: ['FRENCH', 'PREMIUM']
  },
  {
    _id: 'fancy2',
    name: 'Fruit Tart',
    description: 'Buttery crust with pastry cream and fresh fruits',
    price: 9.99,
    category: 'fancies',
    featured: true,
    tags: ['FRESH FRUIT', 'SEASONAL']
  },
  {
    _id: 'fancy3',
    name: 'Tiramisu Slice',
    description: 'Italian dessert with coffee soaked ladyfingers',
    price: 10.99,
    category: 'fancies',
    featured: true,
    tags: ['ITALIAN', 'COFFEE']
  },
  {
    _id: 'fancy4',
    name: 'Mille-Feuille',
    description: 'French Napoleon pastry with vanilla cream',
    price: 9.49,
    category: 'fancies',
    featured: false,
    tags: ['FRENCH', 'LAYERED']
  },
  {
    _id: 'fancy5',
    name: 'Opera Cake',
    description: 'French cake with coffee buttercream and ganache',
    price: 11.99,
    category: 'fancies',
    featured: true,
    tags: ['PREMIUM', 'CHOCOLATE']
  },
  {
    _id: 'fancy6',
    name: 'Macaron Box',
    description: 'Assorted French macarons in gift box',
    price: 14.99,
    category: 'fancies',
    featured: true,
    tags: ['GIFT', 'FRENCH']
  },
  {
    _id: 'fancy7',
    name: 'Profiteroles',
    description: 'Cream puffs with chocolate sauce',
    price: 8.49,
    category: 'fancies',
    featured: false,
    tags: ['CLASSIC', 'CREAM PUFF']
  },

  // ========== 🍕 PIZZA (2 items) ==========
  {
    _id: 'pizza1',
    name: 'Margherita Pizza',
    description: 'Classic tomato, mozzarella and basil',
    price: 12.99,
    category: 'pizza',
    featured: true,
    tags: ['CLASSIC', 'VEGETARIAN']
  },
  {
    _id: 'pizza2',
    name: 'Pepperoni Supreme',
    description: 'Double pepperoni with extra cheese',
    price: 14.99,
    category: 'pizza',
    featured: true,
    tags: ['MEAT LOVERS']
  },

  // ========== ☕ BEVERAGES (5 items) ==========
  {
    _id: 'beverage1',
    name: 'Blue Lagoon Chiller',
    description: 'Dive into the refreshing taste of our Blue Lagoon Chiller, a cool mix of vibrant blue flavors and icy goodness. ',
    price: 4.99,
    category: 'beverage',
    featured: true,
    tags: ['COFFEE', 'HOT']
  },
  {
    _id: 'beverage2',
    name: 'Mint Chiller',
    description: 'Revitalize your senses with our Mint Chiller, featuring a cool, icy blend of refreshing mint, lemon and fizziness.',
    price: 3.99,
    category: 'beverage',
    featured: false,
    tags: ['CHOCOLATE', 'WINTER SPECIAL']
  },
  {
    _id: 'beverage3',
    name: 'Peach Iced Tea',
    description: 'Cool down with our Peach Iced Tea, a refreshing blend of brewed tea and ripe peach flavor.',
    price: 4.49,
    category: 'beverage',
    featured: false,
    tags: ['TEA', 'SPICED']
  },
  {
    _id: 'beverage4',
    name: 'Strawberry Chiller',
    description: 'Enjoy a frosty treat with our Strawberry Chiller, a refreshing blend of icy strawberry flavor and fizzy goodness. Its a crisp, cool sip of berry bliss thats perfect for a refreshing pick-me-up',
    price: 3.49,
    category: 'beverage',
    featured: false,
    tags: ['COFFEE', 'STRONG']
  },
  {
    _id: 'beverage5',
    name: 'Mocha',
    description: 'Chocolate coffee delight',
    price: 5.29,
    category: 'beverage',
    featured: true,
    tags: ['CHOCOLATE', 'COFFEE']
  },

  // ========== 🥤 DRINKS (8 items) ==========
  {
    _id: 'drink1',
    name: 'Alaska Supreme',
    description: 'Chill out with our Alaska Supreme, a frosty blended coffee shake with ice cream and milk thats pure bliss in a cup. ',
    price: 2.49,
    category: 'drink',
    featured: true,
    tags: ['FRESH', 'HEALTHY']
  },
  {
    _id: 'drink2',
    name: 'Strawberry Shake',
    description: 'Chill out with our Strawberry Shake, a luscious blend of sweet strawberries, ice cream, and milk.',
    price: 2.29,
    category: 'drink',
    featured: false,
    tags: ['REFRESHING', 'LEMON']
  },
  {
    _id: 'drink3',
    name: 'Choco Wafer Shake',
    description: 'Treat yourself to our Choco Wafer Shake, where crispy wafer chocolate meets smooth ice cream and milk for a crunch in every sip.',
    price: 4.99,
    category: 'drink',
    featured: true,
    tags: ['FRUIT', 'SHAKE']
  },
  {
    _id: 'drink4',
    name: 'Oreo Shake',
    description: 'Dive into a playful escape with our Oreo Shake, a cookie-lovers dream! This fun shake combines smooth vanilla with crushed Oreo cookie',
    price: 4.79,
    category: 'drink',
    featured: false,
    tags: ['SMOOTHIE', 'HEALTHY']
  },
  {
    _id: 'drink5',
    name: 'Chocolate Shake',
    description: 'Indulge in the rich decadence of our Chocolate Shake, a smooth mix of velvety chocolate, ice cream, and milk.',
    price: 1.99,
    category: 'drink',
    featured: false,
    tags: ['SODA', 'CLASSIC']
  },
  {
    _id: 'drink6',
    name: 'Vanilla Shake',
    description: 'Relish the simplicity of our Vanilla Shake, a silky combination of rich vanilla flavor, ice cream, and milk.',
    price: 2.99,
    category: 'drink',
    featured: true,
    tags: ['REFRESHING', 'LEMON']
  },
  {
    _id: 'drink7',
    name: 'Chocolate Shake',
    description: 'Indulge in the rich decadence of our Chocolate Shake, a smooth mix of velvety chocolate, ice cream, and milk',
    price: 3.49,
    category: 'drink',
    featured: false,
    tags: ['MOCKTAIL', 'MINTY']
  },
  {
    _id: 'drink8',
    name: 'Tropical Coconut Shake',
    description: 'Transport yourself to a tropical getaway with our Tropical Coconut Shake. This blend of creamy coconut chocolate',
    price: 1.00,
    category: 'drink',
    featured: false,
    tags: ['ESSENTIAL', 'WATER']
  }
];

function Shop() {
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = () => {
    setLoading(true);
    
    // Filter products by category if specified
    let filtered = category 
      ? allProducts.filter(product => product.category === category)
      : allProducts;
    
    setFilteredProducts(filtered);
    setLoading(false);
  };

  const handleAddToCart = (product) => {
    try {
      // Get existing cart from localStorage
      const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      
      // Check if product already exists in cart
      const existingItem = cartItems.find(item => item.id === product._id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({
          id: product._id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageClass: `product-img-${product._id}`
        });
      }
      
      // Save back to localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      
      // Update cart count in navbar
      updateCartCount();
      
      // Show success toast
      toast.success(`${product.name} added to cart! 🛒`);
      
      // Trigger cart update event for navbar sync
      window.dispatchEvent(new Event('cartUpdated'));
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  };

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update cart count in navbar (if you have a cart context)
    const cartCountElement = document.querySelector('.cart-count-premium');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }
  };

  const getCategoryTitle = () => {
    if (!category) return 'All Products';
    
    const categoryNames = {
      'donut': 'Donuts ',
      'fancies': 'Fancies ',
      'pizza': 'Pizza ',
      'beverage': 'Beverages ',
      'drink': 'Drinks '
    };
    
    return categoryNames[category] || `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  };

  const getBannerClass = () => {
    if (!category) return 'category-banner-donut';
    
    const bannerMap = {
      'donut': 'category-banner-donut',
      'fancies': 'category-banner-fancies',
      'pizza': 'category-banner-pizza',
      'beverage': 'category-banner-beverage',
      'drink': 'category-banner-drink'
    };
    
    return bannerMap[category] || 'category-banner-donut';
  };

  const getProductImageClass = (productId) => {
    return `product-img-${productId}`;
  };

  return (
    <div className="shop-page">
      {/* Category Banner with actual image - TEXT REMOVED */}
      <div className={`category-banner ${getBannerClass()}`}>
        <div className="category-banner-content">
          {/* Text removed - only banner image will show */}
        </div>
      </div>

      <Container>
        {/* Categories Navigation */}
        <div className="categories-nav">
          <a 
            href="/shop/donut" 
            className={`category-tab ${category === 'donut' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/shop/donut';
            }}
          >
           
            <span>Donuts</span>
          </a>
          <a 
            href="/shop/fancies" 
            className={`category-tab ${category === 'fancies' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/shop/fancies';
            }}
          >
          
            <span>Fancies</span>
          </a>
          <a 
            href="/shop/pizza" 
            className={`category-tab ${category === 'pizza' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/shop/pizza';
            }}
          >
       
            <span>Pizza</span>
          </a>
          <a 
            href="/shop/beverage" 
            className={`category-tab ${category === 'beverage' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/shop/beverage';
            }}
          >
      
            <span>Beverages</span>
          </a>
          <a 
            href="/shop/drink" 
            className={`category-tab ${category === 'drink' ? 'active' : ''}`}
            onClick={(e) => {
              e.preventDefault();
              window.location.href = '/shop/drink';
            }}
          >
            
            <span>Drinks</span>
          </a>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="loading-spinner"></div>
            <p className="mt-3">Loading delicious treats...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <h4>No products found in this category</h4>
            <p className="text-muted">Check back later for new items!</p>
          </div>
        ) : (
          <>
            <div className="product-count mb-4">
              Showing {filteredProducts.length} {category || 'products'}
            </div>
            
            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
              {filteredProducts.map(product => (
                <Col key={product._id}>
                  <div className="product-card-shop">
                    {/* Product Image using CSS background */}
                    <div 
                      className={`product-image-container ${getProductImageClass(product._id)}`}
                    >
                      {/* Fallback img tag for better accessibility */}
                      <img 
                        src={`/images/${product.category}/${product._id.replace(product.category, '')}.png`}
                        alt={product.name}
                        style={{display: 'none'}} // Hidden but helps with alt text
                      />
                      {product.featured && (
                        <span className="featured-badge-shop">FEATURED</span>
                      )}
                      {product.tags && product.tags.includes('BEST SELLER') && (
                        <span className="best-seller-badge-shop">BEST SELLER</span>
                      )}
                    </div>
                    
                    <div className="product-info-shop">
                      <h3>{product.name}</h3>
                      <p className="product-description-shop">{product.description}</p>
                      
                      <div className="product-tags">
                        {product.tags && product.tags.map((tag, index) => (
                          <span key={index} className="product-tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="product-footer-shop">
                        <span className="product-price-shop">${product.price}</span>
                        <button 
                          className="add-to-cart-btn-shop"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}

export default Shop;