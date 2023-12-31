import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet, Dimensions } from "react-native";
import { getProduct } from "../api/ShopifyAPI";
import Spinner from "./Spinner";


const ProductInfo = ({ route, navigation }) => {

  const { productId, cartItems } = route.params;

  const [product, setProduct] = useState(null);
  const [showSpinner, setShowSpinner] = useState(true);
  
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showSpinner) return <Spinner />;
  // Resto del código cuando el spinner ya no se muestra
  const { title, variants, images, body_html } = product;
  const price = variants?.[0]?.price || null;
  const imageSrc = images?.[0]?.src || null;
  // Eliminar etiquetas HTML del body_html
  const cleanBodyHtml = body_html.replace(/<[^>]+>/g, "");
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
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{cleanBodyHtml}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Volver" onPress={handleGoBack} />
        <View style={styles.buttonSeparator} />
        <Button
          title="Agregar al carrito"
          onPress={() => navigation.navigate("Cart", { cartItems: cartItems })}
        />
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
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
  descriptionContainer: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  description: {
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  buttonSeparator: {
    width: 20,
  },
});
export default ProductInfo;