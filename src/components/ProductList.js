import React, {useState, useEffect}from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard'; 
import './ProductList.css';  

const ProductList = ({ filters }) => {


const products = [
  
  {
    id: 1,
    name: 'Monstera DK Var (L)',
    price: 325,
    image: require('../assets/products/product1.png'),
    thumbnails: [
      '/images/monstera-dk-var-thumb1.jpg',
      '/images/monstera-dk-var-thumb2.jpg',
    ],
    description: 'A rare variegated Monstera Deliciosa with stunning foliage. Ideal for plant collectors.',
    rating: 5,
    reviews: 85,
    category: 'Plants'
  },
  {
    id: 2,
    name: 'Monstera Deliciosa (L)',
    price: 115,
    image: require('../assets/products/product2.png'),
    thumbnails: [
      '/images/monstera-deliciosa-thumb1.jpg',
      '/images/monstera-deliciosa-thumb2.jpg',
    ],
    description: 'A classic Monstera Deliciosa with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 137,
    category: 'Plants'
  },

  {
    id: 3,
    name: 'Philodendron Xanadu',
    price: 25,
    image: require('../assets/products/product3.png'),
    thumbnails: [
      '/images/philodendron-xanadu-thumb1.jpg',
      '/images/philodendron-xanadu-thumb2.jpg',
    ],
    description: 'A rare variegated Philondendron xandu with stunning foliage. Ideal for plant collectors.',
    rating: 5,
    reviews: 211,
    category: 'Seeds'
  },
  {
    id: 4,
    name: 'Fiddle Leaf Fig',
    price: 115,
    image: require('../assets/products/product4.png'),
    thumbnails: [
      '/images/fiddle-leaf-fig-thumb1.jpg',
      '/images/fiddle-leaf-fig-thumb2.jpg',
    ],
    description: 'A classic fiddle leaf fig with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 136,
    category: 'Seeds'
  },
  {
    id: 5,
    name: 'Fiddle Leaf Fig',
    price: 170,
    image: require('../assets/products/product4.png'),
    description: 'A classic fiddle leaf fig with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 137,
    category: 'Bulbs'
  },
  {
    id: 6,
    name: 'Fiddle Leaf Fig five',
    price: 240,
    image: require('../assets/products/product4.png'),
    description: 'A classic fiddle leaf fig with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 137,
    category: 'Bulbs'
  },
  {
    id: 7,
    name: 'Fiddle Leaf Fig six',
    price: 380,
    image: require('../assets/products/product4.png'),
    description: 'A classic fiddle leaf fig with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 137,
    category: 'Planters'
  },
  {
    id: 8,
    name: 'Fiddle Leaf Fig seven',
    price: 11,
    image: require('../assets/products/product4.png'),
    description: 'A classic fiddle leaf fig with large, split leaves. Great for any home.',
    rating: 4,
    reviews: 137,
    category: 'Planters'
  },
];
const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const filterProducts = () => {
      let updatedProducts = products;

      // Filter by main categories
      const selectedCategories = Object.keys(filters).filter(
        (key) => filters[key] && key !== 'Others' && key !== 'priceRange'
      );
      if (selectedCategories.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          selectedCategories.includes(product.category)
        );
      }

      // Filter by "Others" subcategories
      if (filters.Others && filters.Others.length > 0) {
        updatedProducts = updatedProducts.filter((product) =>
          filters.Others.includes(product.subcategory)
        );
      }

      // Filter by price range
      const { priceRange } = filters;
      if (priceRange) {
        updatedProducts = updatedProducts.filter((product) => {
          const price = parseFloat(product.price);
          return (
            (priceRange.min === '' || price >= priceRange.min) &&
            (priceRange.max === '' || price <= priceRange.max)
          );
        });
      }

      // Filter by search term
      if (filters.searchTerm) {
        const searchTermLower = filters.searchTerm.toLowerCase();
        updatedProducts = updatedProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTermLower)
        );
      }

      setFilteredProducts(updatedProducts);
    };

    filterProducts();
  }, [filters, products]);

  return (
    <div className="product-list-container">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            state={{ product }}
            className="product-link"
          >
            <ProductCard product={product} />
          </Link>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ProductList;