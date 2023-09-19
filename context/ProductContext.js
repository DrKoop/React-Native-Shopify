import React, { createContext, useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [productIdsContext, setProductIds] = useState([]);

  
  //Gestiona y almacena los id, de handleAdd, desde el listProduct y lo comunica con cartScreen
  const addProductId = (productId) => {
    setProductIds([...productIdsContext, productId]);
    
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