import React, { useState, useEffect, useCallback } from "react";
import { Text, View, Image, Button, FlatList } from "react-native";
import { getProducts, addToCart } from "../api/ShopifyAPI";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BottomTabBar from "./BottomTabBar";
import ProductInfo from "./ProductInfo";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  

  useEffect(() => {
    const fetchProducts = async () => {
      const allData = await getProducts();
      const products = allData.flatMap((data) => data.products);
      setProducts(products);
    };
    fetchProducts();
  }, []);

  const navigation = useNavigation();

  const handleViewProduct = useCallback((productId) => {
    navigation.navigate("ProductInfo", { productId });
  }, [navigation]);

  const renderProduct = useCallback(
    ({ item, index }) => {
      const { id, title, images, variants } = item;
      const imageSrc = images?.[0]?.src;
      const price = variants?.[0]?.price;

      return (
        <View key={`${id}_${index}`}>
          {imageSrc && (
            <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />
          )}
          <Text>{title}</Text>
          {price && <Text>Precio: {price}</Text>}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity style={{ margin: 10 }}>
              <Button title="Ver Producto" onPress={() => handleViewProduct(id)} />
            </TouchableOpacity>
            <Button title="Agregar al carrito" onPress={() => addToCart(id)} />
          </View>
        </View>
      );
    },
    [handleViewProduct]
  );

  return (
    <>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
      />

      <BottomTabBar />
    </>
  );
};

export default ProductList;