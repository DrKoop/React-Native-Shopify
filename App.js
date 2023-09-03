import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import CategoriesScreen from './components/CategoriesScreen';
import CartScreen from './components/CartScreen';

const Stack = createStackNavigator();

const App = () => {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;