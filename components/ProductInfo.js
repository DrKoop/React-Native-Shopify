import React from "react";
import { getProducts } from "../api/ShopifyAPI";

const ProductInfo = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.images[0].src} alt={product.title} />
          <h2>{product.title}</h2>
          <p>Precio: {product.variants[0].price}</p>
          {product.description && <p>{product.description}</p>}
        </div>
      ))}
    </div>
  );
};

export default ProductInfo;