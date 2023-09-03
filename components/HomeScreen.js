import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {

  const handleCategoryPress = () => {
    navigation.navigate('Categories');
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pantalla de inicio!</Text>
      <Button title="Ver Productos" onPress={handleCategoryPress} />
      <Button title="Carrito de compras" onPress={handleCartPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;