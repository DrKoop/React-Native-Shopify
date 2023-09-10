import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet, FlatList } from "react-native";
import { addToCart } from "../api/ShopifyAPI";

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await addToCart(cartItems);
        setCartProducts(productData);
        //console.log(`Desde carrito: ${cartItems}`);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [cartItems]);

  const renderProductCard = ({ item }) => {
    const { title, images, variants } = item || {};
    const imageSrc = images?.[0]?.src || null;
    const price = variants?.[0]?.price;

    if (!title || !price) {
      return null; // Ignorar los productos sin título y precio
    }

    return (
      <View key={item?.id?.toString()} style={styles.card}>
        {imageSrc && (
          <Image source={{ uri: imageSrc }} style={styles.image} />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>{price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.addButtonContainer}>
            <Button
              title="+"
              onPress={() => handleAddToCart(item)}
              style={styles.addButton}
            />
          </View>
          <View style={styles.removeButtonContainer}>
            <Button
              title="-"
              onPress={() => handleRemoveFromCart(item)}
              style={styles.removeButton}
            />
          </View>
        </View>
      </View>
    );
  };

  const handleAddToCart = (item) => {
    // Lógica para agregar al carrito
  };

  const handleRemoveFromCart = (item) => {
    // Lógica para remover del carrito
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        renderItem={renderProductCard}
        keyExtractor={(item, index) => item?.id?.toString() + index}
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        <Button title="Volver" onPress={handleGoBack} style={styles.backButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatList: {
    marginTop: 5,
  },
  card: {
    width: "100%",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 5,
    marginTop: 25,
  },
  addButtonContainer: {
    marginRight: 5,
  },
  removeButtonContainer: {
    marginLeft: 5,
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: "blue",
  },
});

export default CartScreen;