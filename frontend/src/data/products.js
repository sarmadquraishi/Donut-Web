export const products = [
  // ========== 🍩 DONUTS (11 items) ==========
  {
    _id: 'donut1',
    name: 'Classic Glazed Donut',
    description: 'Our signature donut with sweet vanilla glaze',
    price: 3.99,
    category: 'donut',
    image: 'https://ibb.co/x8h5zwPr', // Your provided link
    featured: true,
    tags: ['BEST SELLER', 'CLASSIC']
  },
  {
    _id: 'donut2',
    name: 'Chocolate Sprinkle Donut',
    description: 'Rich chocolate frosting with rainbow sprinkles',
    price: 4.49,
    category: 'donut',
    image: 'https://example.com/images/chocolate-donut.jpg', // Replace with your actual link
    featured: true,
    tags: ['CHOCOLATE', 'KID FAVORITE']
  },
  {
    _id: 'donut3',
    name: 'Strawberry Frosted Donut',
    description: 'Pink strawberry glaze with fresh berry notes',
    price: 4.29,
    category: 'donut',
    image: 'https://example.com/images/strawberry-donut.jpg',
    featured: true,
    tags: ['FRUITY', 'PINK']
  },
  {
    _id: 'donut4',
    name: 'Boston Cream Donut',
    description: 'Custard filled with chocolate ganache',
    price: 4.99,
    category: 'donut',
    image: 'https://example.com/images/boston-cream-donut.jpg',
    featured: true,
    tags: ['CREAM FILLED', 'CHOCOLATE']
  },
  {
    _id: 'donut5',
    name: 'Maple Bacon Donut',
    description: 'Sweet maple glaze with crispy bacon bits',
    price: 5.99,
    category: 'donut',
    image: 'https://example.com/images/maple-bacon-donut.jpg',
    featured: true,
    tags: ['PREMIUM', 'SALTY SWEET']
  },
  {
    _id: 'donut6',
    name: 'Blueberry Blast Donut',
    description: 'Blueberry infused donut with cream cheese filling',
    price: 4.79,
    category: 'donut',
    image: 'https://example.com/images/blueberry-donut.jpg',
    featured: false,
    tags: ['FRUIT FILLED', 'BLUEBERRY']
  },
  {
    _id: 'donut7',
    name: 'Cinnamon Sugar Donut',
    description: 'Warm cinnamon and sugar coating',
    price: 3.79,
    category: 'donut',
    image: 'https://example.com/images/cinnamon-donut.jpg',
    featured: false,
    tags: ['CLASSIC', 'CINNAMON']
  },
  {
    _id: 'donut8',
    name: 'Matcha Green Tea Donut',
    description: 'Japanese matcha glaze with white chocolate drizzle',
    price: 5.49,
    category: 'donut',
    image: 'https://example.com/images/matcha-donut.jpg',
    featured: true,
    tags: ['PREMIUM', 'ASIAN FLAVOR']
  },
  {
    _id: 'donut9',
    name: 'Red Velvet Donut',
    description: 'Red velvet cake donut with cream cheese frosting',
    price: 4.99,
    category: 'donut',
    image: 'https://example.com/images/red-velvet-donut.jpg',
    featured: false,
    tags: ['CAKE DONUT', 'RED VELVET']
  },
  {
    _id: 'donut10',
    name: 'Salted Caramel Donut',
    description: 'Salted caramel glaze with toffee pieces',
    price: 5.29,
    category: 'donut',
    image: 'https://example.com/images/salted-caramel-donut.jpg',
    featured: true,
    tags: ['CARAMEL', 'PREMIUM']
  },
  {
    _id: 'donut11',
    name: 'Cookies & Cream Donut',
    description: 'Oreo cookie crust with vanilla cream filling',
    price: 5.99,
    category: 'donut',
    image: 'https://example.com/images/cookies-cream-donut.jpg',
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
    image: 'https://example.com/images/eclair.jpg',
    featured: true,
    tags: ['FRENCH', 'PREMIUM']
  },
  {
    _id: 'fancy2',
    name: 'Fruit Tart',
    description: 'Buttery crust with pastry cream and fresh fruits',
    price: 9.99,
    category: 'fancies',
    image: 'https://example.com/images/fruit-tart.jpg',
    featured: true,
    tags: ['FRESH FRUIT', 'SEASONAL']
  },
  {
    _id: 'fancy3',
    name: 'Tiramisu Slice',
    description: 'Italian dessert with coffee soaked ladyfingers',
    price: 10.99,
    category: 'fancies',
    image: 'https://example.com/images/tiramisu.jpg',
    featured: true,
    tags: ['ITALIAN', 'COFFEE']
  },
  {
    _id: 'fancy4',
    name: 'Mille-Feuille',
    description: 'French Napoleon pastry with vanilla cream',
    price: 9.49,
    category: 'fancies',
    image: 'https://example.com/images/mille-feuille.jpg',
    featured: false,
    tags: ['FRENCH', 'LAYERED']
  },
  {
    _id: 'fancy5',
    name: 'Opera Cake',
    description: 'French cake with coffee buttercream and ganache',
    price: 11.99,
    category: 'fancies',
    image: 'https://example.com/images/opera-cake.jpg',
    featured: true,
    tags: ['PREMIUM', 'CHOCOLATE']
  },
  {
    _id: 'fancy6',
    name: 'Macaron Box',
    description: 'Assorted French macarons in gift box',
    price: 14.99,
    category: 'fancies',
    image: 'https://example.com/images/macaron-box.jpg',
    featured: true,
    tags: ['GIFT', 'FRENCH']
  },
  {
    _id: 'fancy7',
    name: 'Profiteroles',
    description: 'Cream puffs with chocolate sauce',
    price: 8.49,
    category: 'fancies',
    image: 'https://example.com/images/profiteroles.jpg',
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
    image: 'https://example.com/images/margherita-pizza.jpg',
    featured: true,
    tags: ['CLASSIC', 'VEGETARIAN']
  },
  {
    _id: 'pizza2',
    name: 'Pepperoni Supreme',
    description: 'Double pepperoni with extra cheese',
    price: 14.99,
    category: 'pizza',
    image: 'https://example.com/images/pepperoni-pizza.jpg',
    featured: true,
    tags: ['MEAT LOVERS']
  },

  // ========== ☕ BEVERAGES (5 items) ==========
  {
    _id: 'beverage1',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk foam',
    price: 4.99,
    category: 'beverage',
    image: 'https://example.com/images/cappuccino.jpg',
    featured: true,
    tags: ['COFFEE', 'HOT']
  },
  {
    _id: 'beverage2',
    name: 'Hot Chocolate',
    description: 'Creamy chocolate drink with marshmallows',
    price: 3.99,
    category: 'beverage',
    image: 'https://example.com/images/hot-chocolate.jpg',
    featured: false,
    tags: ['CHOCOLATE', 'WINTER SPECIAL']
  },
  {
    _id: 'beverage3',
    name: 'Chai Latte',
    description: 'Spiced tea with steamed milk',
    price: 4.49,
    category: 'beverage',
    image: 'https://example.com/images/chai-latte.jpg',
    featured: false,
    tags: ['TEA', 'SPICED']
  },
  {
    _id: 'beverage4',
    name: 'Americano',
    description: 'Strong black coffee',
    price: 3.49,
    category: 'beverage',
    image: 'https://example.com/images/americano.jpg',
    featured: false,
    tags: ['COFFEE', 'STRONG']
  },
  {
    _id: 'beverage5',
    name: 'Mocha',
    description: 'Chocolate coffee delight',
    price: 5.29,
    category: 'beverage',
    image: 'https://example.com/images/mocha.jpg',
    featured: true,
    tags: ['CHOCOLATE', 'COFFEE']
  },

  // ========== 🥤 DRINKS (8 items) ==========
  {
    _id: 'drink1',
    name: 'Fresh Orange Juice',
    description: 'Freshly squeezed orange juice',
    price: 2.49,
    category: 'drink',
    image: 'https://example.com/images/orange-juice.jpg',
    featured: true,
    tags: ['FRESH', 'HEALTHY']
  },
  {
    _id: 'drink2',
    name: 'Iced Tea',
    description: 'Refreshing lemon iced tea',
    price: 2.29,
    category: 'drink',
    image: 'https://example.com/images/iced-tea.jpg',
    featured: false,
    tags: ['REFRESHING', 'LEMON']
  },
  {
    _id: 'drink3',
    name: 'Mango Shake',
    description: 'Creamy mango milkshake',
    price: 4.99,
    category: 'drink',
    image: 'https://example.com/images/mango-shake.jpg',
    featured: true,
    tags: ['FRUIT', 'SHAKE']
  },
  {
    _id: 'drink4',
    name: 'Strawberry Smoothie',
    description: 'Fresh strawberry smoothie with yogurt',
    price: 4.79,
    category: 'drink',
    image: 'https://example.com/images/strawberry-smoothie.jpg',
    featured: false,
    tags: ['SMOOTHIE', 'HEALTHY']
  },
  {
    _id: 'drink5',
    name: 'Cola',
    description: 'Classic fizzy cola drink',
    price: 1.99,
    category: 'drink',
    image: 'https://example.com/images/cola.jpg',
    featured: false,
    tags: ['SODA', 'CLASSIC']
  },
  {
    _id: 'drink6',
    name: 'Lemonade',
    description: 'Fresh lemonade with mint',
    price: 2.99,
    category: 'drink',
    image: 'https://example.com/images/lemonade.jpg',
    featured: true,
    tags: ['REFRESHING', 'LEMON']
  },
  {
    _id: 'drink7',
    name: 'Virgin Mojito',
    description: 'Minty lime mocktail',
    price: 3.49,
    category: 'drink',
    image: 'https://example.com/images/mojito.jpg',
    featured: false,
    tags: ['MOCKTAIL', 'MINTY']
  },
  {
    _id: 'drink8',
    name: 'Water Bottle',
    description: '500ml mineral water',
    price: 1.00,
    category: 'drink',
    image: 'https://example.com/images/water.jpg',
    featured: false,
    tags: ['ESSENTIAL', 'WATER']
  }
];