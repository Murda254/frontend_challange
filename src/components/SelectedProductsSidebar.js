import React, { useContext } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import ProductCard from './ProductCard';
import './SelectedProductsSidebar.css';

const SelectedProductsSidebar = () => {
const { clickedProducts, removeProductFromCart } = useContext(ProductsContext);  // Access clicked products from context

  return (
    <div className="selected-products-sidebar">
{      console.log("the prod",clickedProducts)}
      <h3>Selected Products</h3>
      {clickedProducts.length === 0 ? (
        <p>No products selected yet.</p>
      ) : (
        clickedProducts.map((product) => (
          <div key={product.id} className="sidebar-product-card">
            <ProductCard product={product} />
            {/* Add the 'Remove from Cart' button */}
            <button onClick={() => removeProductFromCart(product.id)} className="remove-from-cart-button">
              Remove from Cart
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SelectedProductsSidebar;