import React from "react";
import { Text, View, Image, Button, FlatList } from "react-native";
import { getProducts, addToCart } from "../api/ShopifyAPI";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import BottomTabBar from "./BottomTabBar";

const ProductList = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const allData = await getProducts();
      const products = allData.flatMap((data) => data.products);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const navigation = useNavigation();

  const renderProduct = ({ item, index }) => {
    const { id, title, images, variants } = item;
    const imageSrc = images?.length > 0 ? images[0].src : null;
    const price = variants?.length > 0 ? variants[0].price : null;

    const handleViewProduct = () => {
      navigation.navigate("ProductInfo", );
    };

    return (
      <View key={`${id}_${index}`}>
        {imageSrc && (
          <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />
        )}
        <Text>{title}</Text>
        {price && <Text>Precio: {price}</Text>}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={{ margin: 10 }}  >
            <Button title="Ver Producto" onPress={handleViewProduct} />
          </TouchableOpacity>
          <Button title="Agregar al carrito" onPress={() => addToCart(id)} />
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item, index) => `${item.id}_${index}`}
      />
      <BottomTabBar />
    </>
  );
};

export default ProductList;