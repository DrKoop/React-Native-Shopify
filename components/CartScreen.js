import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet, FlatList } from "react-native";
import { addToCart } from "../api/ShopifyAPI";
import Global from "../Globals";

const CartScreen = ({ route, navigation }) => {
  const { cartItems } = route.params;
  const [cartProducts, setCartProducts] = useState([]);
  const [productCounts, setProductCounts] = useState({});
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [deletedProductsGlobal, setDeletedProductsGlobal] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await addToCart(cartItems);
        const counts = {};
        productData.forEach((product) => {
          counts[product.id] = 1;
        });
        setCartProducts(productData);
        setProductCounts(counts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [cartItems]);


  useEffect(() => {
    Global.deletedProductsGlobal = deletedProducts;
    console.log(`Desde CartScreen: ${Global.deletedProductsGlobal}`);
  }, [deletedProducts]);


  const handleIncreaseQuantity = (id) => {
    setProductCounts((prevCounts) => ({
      ...prevCounts,
      [id]: prevCounts[id] + 1,
    }));
  };

  const handleDecreaseQuantity = (id) => {
    setProductCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      if (newCounts[id] > 0) {
        newCounts[id] -= 1;
        if (newCounts[id] === 0) {
          setDeletedProducts((prevDeleted) => [...prevDeleted, id]);
        }
      }
      
      return newCounts;
    });
  };

  const renderProductCard = ({ item }) => {
    const { id, title, images, variants } = item || {};
    const imageSrc = images?.[0]?.src || null;
    const price = variants?.[0]?.price;
    const count = productCounts[id] || 0;

    if (!title || !price || deletedProducts.includes(id)) {
      return null;
    }


    return (
      <View key={id.toString()} style={styles.card}>
        {imageSrc && <Image source={{ uri: imageSrc }} style={styles.image} />}
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>{price}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.quantityContainer}>
            <Button
              title="-"
              onPress={() => handleDecreaseQuantity(id)}
              style={styles.removeButton}
            />
            <View style={styles.itemsCounter}>
              <Text>{count}</Text>
            </View>
            <Button
              title="+"
              onPress={() => handleIncreaseQuantity(id)}
              style={styles.addButton}
            />
          </View>
        </View>
      </View>
    );
  };

  const handleGoBack = () => {
    navigation.navigate("ProductList", { deletedProducts } );
  };

  
  return (
    <View style={styles.container}>
      <FlatList
        data={cartProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item?.id?.toString()}
        style={styles.flatList}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Volver"
          onPress={handleGoBack}
          style={styles.backButton}
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
    marginBottom: 70,
    padding: 6,
    borderColor: "red",
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
});

export default CartScreen;