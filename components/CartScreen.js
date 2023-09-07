import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getProduct } from '../api/ShopifyAPI';

const CartScreen = ({ route }) => {
  const { productID } = route.params; // Obtener el productID de los parámetros de la ruta

  // Lógica para obtener los productos según el productID y mostrarlos en el carrito
  const products = getProduct(productID);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Carrito de compras</Text>
      {/* Lógica para mostrar los productos en el carrito */}
      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CartScreen;