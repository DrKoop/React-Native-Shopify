import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import CartScreen from './components/CartScreen';
import ProductInfo from './components/ProductInfo';
import ProductList from './components/ProductList';
//Context
import { ProductProvider } from './context/ProductContext';


const Stack = createStackNavigator();

const App = () => {


  return (
    <ProductProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductProvider>
  );
};

export default App;



/* 

1. En lugar de actualizar el estado de  productIds  en cada renderizado, puedes utilizar un efecto que se ejecute solo cuando  productId  cambie. Dentro de este efecto, puedes cargar los IDs de productos almacenados y luego agregar el nuevo  productId . Esto asegurará que la lista de IDs se actualice correctamente en cada cambio de producto. 
 
2. En lugar de almacenar solo el último  productId  en el AsyncStorage, puedes almacenar una lista de todos los IDs de productos seleccionados. De esta manera, siempre tendrás acceso a todos los IDs y no perderás la referencia de los productos anteriores. 
 
3. En lugar de utilizar el AsyncStorage para almacenar los IDs de productos, puedes considerar utilizar un estado global o un contexto para mantener la lista de IDs. Esto te permitirá acceder a los IDs de productos desde cualquier componente sin tener que pasarlos como props. 
 
Recuerda ajustar el código según la alternativa que elijas. Espero que esto te ayude a solucionar el error.


*/