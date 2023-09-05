import React from "react";
import { Text, View, Image } from "react-native";
import { selectedProduct } from "./ProductList"

const ProductInfo = ({ selectedProduct }) => {

  /* console.log(selectedProduct) */

  if (!selectedProduct) {
    return <Text>Error no se esta pasando</Text>;
  }

  const { title, variants, description, images } = selectedProduct;
  const price = variants?.length > 0 ? variants[0].price : null;
  const imageSrc = images?.length > 0 ? images[0].src : null;

  return (
    <View>
      {imageSrc && (
        <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />
      )}
      <Text>{title}</Text>
      {price && <Text>Precio: {price}</Text>}
      <Text>{description}</Text>
    </View>
  );
};

export default ProductInfo;