import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Button, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import animacionImg from '../assets/animation_shop.json'



const SplashScreen = ({ navigation }) => {


    const nav = useNavigation(); 


    const handleHomeScreen = () => {
        nav.navigate('Products');
    };

/*   useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Categories');
    }, 1000); // 2000ms = 2 segundos
  }, []); */

  const { width } = useWindowDimensions();



  return (
    <>
      <View style={styles.container} >
        <Text style={styles.text} >Bienvenido Koop!</Text>
        <LottieView
          style={styles.animation}
          source={require('../assets/animation_shop.json')}
          autoPlay
          loop
        />
        <Button title="Ver Menu"  style={styles.button} onPress={ handleHomeScreen } />
      </View>
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor : '#0B8926',
    marginBottom: 20,
  },
  animation: {
    padding: 20,
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    justifyContent : 'center',
    marginTop: 500,
    marginBottom: 12,
  },
  button:{
    justifyContent : 'center',
    marginBottom: 20,
  }
  
});




export default SplashScreen;