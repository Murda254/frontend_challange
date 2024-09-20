import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {



  return (
    <div className="product-card">

      <img src={product?.image||""} alt={product.name} /> 
      <h3>{product.name}</h3>
      <p className="price">€{product.price}</p>
      <p className="rating">
        {[...Array(product.rating)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        ({product.reviews} reviews)
      </p>
   
    </div>
  );
};

export default ProductCard;