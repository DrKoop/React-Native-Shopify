import React from "react";
import { Text, View, Image, Button, FlatList } from "react-native";
import { getProducts, addToCart} from "../api/ShopifyAPI"
import BottomTabBar from "./BottomTabBar";

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const allData = await getProducts();
    const products = allData.flatMap((data) => data.products);
    this.setState({ products });
  }

  renderProduct = ({ item, index }) => {
    const { id, title, images, variants } = item;
    const imageSrc = images?.length > 0 ? images[0].src : null;
    const price = variants?.length > 0 ? variants[0].price : null;
    return (
      <View key={`${id}_${index}`}>
        {imageSrc && <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100 }} />}
        <Text>{title}</Text>
        {price && <Text>Precio: {price}</Text>}
        <Button title="Agregar al carrito" onPress={() => addToCart(id)} />
      </View>
    );
  };

  render() {
    const { products } = this.state;
    return (
      <>
      <FlatList
        data={products}
        renderItem={this.renderProduct}
        keyExtractor={(item, index) => `${item.id}_${index}`}

      />
      <BottomTabBar/>
      </>
    );
  }
}