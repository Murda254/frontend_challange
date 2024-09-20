import React,{useContext} from 'react';
import './ProductDetails.css';
import { useLocation } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

const ProductDetails = () => {
  const location = useLocation();
  const { handleProductClick } = useContext(ProductsContext);

  const product=location.state.product
  return (
    <><div className="product-details">
      <div className="product-images">
        <img src={product?.image||""} alt={product?.name||""} className="main-image" />
        <div className="image-thumbnails">
          {(product?.thumbnails)||[].map((thumb, index) => (
            <img key={index} src={thumb} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
          ))}
        </div>
      </div>
      <div className="product-info">
        <h1>{product?.name||""}</h1>
        <p className="description">{product?.description}</p>
        <p className="price">€{product?.price}</p>
        <button onClick={() => handleProductClick(product)} className="add-to-cart-button">Add to cart</button>
      </div>
    </div><div>
  
      </div>
      </>
  );
};

export default ProductDetails;