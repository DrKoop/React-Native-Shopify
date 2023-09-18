import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet, FlatList } from "react-native";
import { getProduct } from "../api/ShopifyAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [productCounts, setProductCounts] = useState({});
  const [productIds, setProductIds] = useState([]);

  console.log(`desde carrito : ${productIds}`)

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
    const loadProductIds = async () => {
      const storedProductIds = await getProductIds();
      setProductIds(storedProductIds);
      saveProductIds([...storedProductIds, productId]);
    };
    loadProductIds();
  }, [productId]);

  const saveProductIds = async (productIds) => {
    try {
      await AsyncStorage.setItem("productIds", JSON.stringify(productIds));
    } catch (error) {
      console.log(error);
    }
  };

  const getProductIds = async () => {
    try {
      const productIds = await AsyncStorage.getItem("productIds");
      return productIds ? JSON.parse(productIds) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const checkAndUpdateQuantity = (id) => {
    const count = productCounts[id] || 0;
    const updatedCounts = { ...productCounts };
    if (productIds.filter((productId) => productId === id).length > 1) {
      updatedCounts[id] = count + 1;
    }
    setProductCounts(updatedCounts);
  };

  const handleIncreaseQuantity = (id) => {
    checkAndUpdateQuantity(id);
  };

  const handleDecreaseQuantity = (id) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 0) {
        newCounts[id] -= 1;
        if (newCounts[id] === 0) {
          handleDeleteProduct(id);
        }
      }
      return newCounts;
    });
  };

  const handleDeleteProduct = (id) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      delete newCounts[id];
      return newCounts;
    });
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleClearCart = async () => {
    setProductCounts({});
    setProductIds([]);
    try {
      await AsyncStorage.removeItem("productIds");
    } catch (error) {
      console.log(error);
    }
  };

  const renderItem = ({ item }) => {
    const { id, title, variants, images } = item;
    const count = productCounts[id] || 0;
    console.log("Current Product ID:", id);

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
          <Text>{variants && variants.length > 0 ? variants[0].price : null}</Text>
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

  return (
    <View style={styles.container}>
      {product && (
        <FlatList
          style={styles.flatList}
          data={productIds.map((id, index) => {
            const productData = {
              id,
              title: product.title,
              variants: product.variants,
              images: product.images,
              uniqueId: index.toString(),
            };
            return productData;
          })}
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