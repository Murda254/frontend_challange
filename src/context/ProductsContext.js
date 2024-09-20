import React, { createContext, useState } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [clickedProducts, setClickedProducts] = useState([]);

  const handleProductClick = (product) => {
    setClickedProducts((prevClickedProducts) => {
      // Check if the product is already in the array
      if (prevClickedProducts.some(p => p.id === product.id)) {
        return prevClickedProducts;  
      }
      return [...prevClickedProducts, product];  // Add new product
    });
  };

  const removeProductFromCart = (productId) => {
    setClickedProducts((prevClickedProducts) =>
      prevClickedProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <ProductsContext.Provider value={{ clickedProducts, handleProductClick, removeProductFromCart}}>
      {children}
    </ProductsContext.Provider>
  );
};