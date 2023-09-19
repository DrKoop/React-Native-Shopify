import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [productIdsContext, setProductIds] = useState([]);

  

  const addProductId = (productId) => {
    setProductIds([...productIdsContext, productId]);
    console.log(`desde componente context : ${productId}`)
  };

  const removeProductId = (productId) => {
    setProductIds(productIdsContext.filter((id) => id !== productId));
  };

  return (
    <ProductContext.Provider value={{ productIdsContext, addProductId, removeProductId }}>
        {/* { console.log(`desde componente context : ${productIdsContext}`) } */}
      {children}
      
    </ProductContext.Provider>
  );
};