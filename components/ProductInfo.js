import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { getProduct } from "../api/ShopifyAPI";

const ProductInfo = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) return <Text>Cargando...</Text>;

  const { title, variants, description, images } = product;
  const price = variants?.[0]?.price || null;
  const imageSrc = images?.[0]?.src || null;

  return (
    <View>
      {imageSrc && <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />}
      <Text>{title}</Text>
      {price && <Text>Precio: {price}</Text>}
      <Text>{description}</Text>
    </View>
  );
};

export default ProductInfo;