import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import { getProduct } from "../api/ShopifyAPI";

const CartScreen = ({ route, navigation }) => {

  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  console.log(`ìd de carrito : ${productId}`)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(productId);
        setProduct(productData);
        console.log(`Desde carrito : ${productData}` )
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productId]);

  const { title, variants, images} = product || {};
  const price = variants?.[0]?.price || null;
  const imageSrc = images?.[0]?.src || null;

  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
      <View style={styles.container}>
        {imageSrc && (
          <Image
            source={{ uri: imageSrc }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text style={styles.title}>{title}</Text>
        {price && <Text style={styles.price}>Precio: {price}</Text>}
        <View style={styles.buttonContainer}>
          <Button title="Volver" onPress={handleGoBack} />
        </View>
      </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 20,
    marginTop: 5,
  },
  description: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },

});

export default CartScreen;