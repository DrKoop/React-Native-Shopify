import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Button, FlatList, StyleSheet, Dimensions, Animated } from "react-native";
import { getProducts, addToCart } from "../api/ShopifyAPI";
import { useNavigation } from "@react-navigation/native";
import BottomTabBar from "./BottomTabBar";
import ProductInfo from "./ProductInfo";
import Spinner from "./Spinner";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showBottomTabBar, setShowBottomTabBar] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollY] = useState(new Animated.Value(0));
  const [selectedItems, setSelectedItems] = useState({}); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const allData = await getProducts();
        const products = allData.flatMap((data) => data.products);
        setProducts(products);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchProducts();
  }, []);

  const navigation = useNavigation();

  const handleViewProduct = useCallback((productId) => {
    navigation.navigate("ProductInfo", { productId });
  }, [navigation]);

  const handleAddToCart = useCallback((productId) => {
    addToCart(productId);
    const test = setSelectedItems((prevItems) => ({ ...prevItems, [productId]: true }));
    console.log(test)
    navigation.navigate("Cart");
  }, [navigation]);

  const renderProduct = useCallback(
    ({ item, index }) => {
      const { id, title, images, variants } = item;
      const imageSrc = images?.[0]?.src;
      const price = variants?.[0]?.price;
      if (!title || !price) {
        return null;
      }
      return (
        <View key={`${id}_${index}`} style={styles.productContainer}>
          {imageSrc && (
            <Image
              source={{ uri: imageSrc }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <Text style={styles.title}>{title}</Text>
          {price && <Text style={styles.price}>Precio: <Text>{price}</Text></Text>}
          <View style={styles.buttonContainer}>
            <Button title="Ver Producto" onPress={() => handleViewProduct(id)} />
            <View style={styles.buttonSeparator} />
            <Button title="Agregar al carrito" onPress={() => handleAddToCart(id)} />
          </View>
        </View>
      );
    },
    [handleViewProduct, handleAddToCart]
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const contentHeight = event.nativeEvent.contentSize.height;
    const containerHeight = event.nativeEvent.layoutMeasurement.height;
    if (offsetY > 0 && offsetY + containerHeight >= contentHeight) {
      setShowBottomTabBar(false);
    } else {
      setShowBottomTabBar(true);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <AnimatedFlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      />
      {showBottomTabBar && <BottomTabBar />}
    </>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 2,
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonSeparator: {
    width: 20,
  },
});

export default ProductList;