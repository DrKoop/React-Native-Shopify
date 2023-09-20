import React, { useEffect, useState, useContext } from "react";
import { Text, View, Image, Button, StyleSheet, FlatList } from "react-native";
import { getProduct } from "../api/ShopifyAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductContext } from "../context/ProductContext";

const CartScreen = ({ navigation }) => {
  const { productIdsContext, removeProductId } = useContext(ProductContext);
  const [product, setProduct] = useState([]);
  const [productCounts, setProductCounts] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productsData = await Promise.all(
          productIdsContext.map((id) => getProduct(id))
        );
        const uniqueProducts = productsData.reduce((acc, item) => {
          if (acc[item.id]) {
            acc[item.id].count += 1;
          } else {
            acc[item.id] = { ...item, count: 1 };
          }
          return acc;
        }, {});
        setProduct(uniqueProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [productIdsContext]);

  const handleIncreaseQuantity = (id) => {
    setProductCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (updatedCounts[id] && updatedCounts[id].count) {
        updatedCounts[id].count += 1;
      } else {
        updatedCounts[id] = { count: 1 };
      }

      console.log(updatedCounts)

      return { ...updatedCounts };
    });
  };
  
  const handleDecreaseQuantity = (id) => {
    setProductCounts((prevCounts) => {
      const updatedCounts = { ...prevCounts };
      if (updatedCounts[id] && updatedCounts[id].count > 1) {
        updatedCounts[id].count -= 1;
      } else {
        removeProductId(id);
        delete updatedCounts[id];
      }
      return { ...updatedCounts };
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClearCart = async () => {
    setProductCounts({});
    try {
      await AsyncStorage.removeItem("productIds");
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const { id, title, variants, images, count } = item;
    return (
      <View style={styles.card}>
        {images && images.length > 0 && (
          <Image
            source={{ uri: images[0].src }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>
            {variants && variants.length > 0 ? variants[0].price : null}
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.itemsCounter}>
              <Text>{count}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <Button
                title="-"
                onPress={() => handleDecreaseQuantity(id)}
                style={styles.removeButton}
              />
              <Button
                title="+"
                onPress={() => handleIncreaseQuantity(id)}
                style={styles.addButton}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const uniqueProductIds = Object.keys(product);
  const uniqueProducts = uniqueProductIds.map((id) => product[id]);

  return (
    <View style={styles.container}>
      {product && (
        <FlatList
          style={styles.flatList}
          data={uniqueProducts.map((item) => ({
            ...item,
            uniqueId: item.id.toString(),
          }))}
          renderItem={renderItem}
          keyExtractor={(item) => item.uniqueId}
          vertical
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Volver"
          onPress={handleGoBack}
          style={styles.backButton}
        />
        <Button
          title="Eliminar Carrito"
          onPress={handleClearCart}
          style={styles.clearCartButton}
        />
        <Button
          title="Pagar Ahora"
          onPress={handleGoBack}
          style={styles.payNowButton}
        />
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
    flex: 1,
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
  itemsCounter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 75,
    padding: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    position: "absolute",
    top: 0,
    right: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    marginTop: 5,
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
  clearCartButton: {
    backgroundColor: "orange",
  },
  payNowButton: {
    backgroundColor: "green",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default CartScreen;