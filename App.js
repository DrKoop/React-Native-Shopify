import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import CartScreen from './components/CartScreen';
import ProductInfo from './components/ProductInfo';
import ProductList from './components/ProductList';


const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;



/* 

UTILIZAR ZULAND


 
1. Verificar y solucionar el problema en la fuente de datos: Asegúrate de que los datos que se están pasando al componente de FlatList sean correctos y no contengan duplicados. Si estás obteniendo los datos de una API o una base de datos, verifica si hay algún problema en la forma en que se están recuperando los datos. 
 
2. Agregar una propiedad única a cada elemento de la lista: Si los productos tienen un atributo único que los distingue, como un código de barras o un identificador único adicional, puedes utilizar esa propiedad en lugar del ID para evitar duplicados en la lista. 
 
3. Realizar una transformación de datos antes de pasarlos a FlatList: Si no puedes evitar la presencia de productos con el mismo ID en la lista, puedes realizar una transformación de datos antes de pasarlos al componente de FlatList. Por ejemplo, podrías agrupar los productos con el mismo ID y mostrar solo uno de ellos en la lista, o combinar la información de ambos productos en un solo elemento de la lista. 


*/