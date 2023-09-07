
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import * as Animatable from 'react-native-animatable';
import animacionImg from '../assets/animation_shop.json';
import backgroundLottie from '../assets/background_4.json';

const SplashScreen = () => {
  const nav = useNavigation();

  const handleHomeScreen = () => {
    nav.navigate('Products');
  };

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#07575b', '#003b46'],
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.text}>¡Bienvenido!</Text>
      <LottieView
        style={styles.animation}
        source={animacionImg}
        autoPlay
        loop
      />
      <LottieView
        style={[styles.animation2, { position: 'absolute', flex: 1 }]}
        source={backgroundLottie}
        autoPlay
        loop
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleHomeScreen}
      >
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          style={styles.buttonText}
        >
          Ver Menú
        </Animatable.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  animation: {
    padding: 20,
  },
  animation2: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    justifyContent: 'center',
    textTransform: 'uppercase',
    marginTop: 500,
    marginBottom: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#66a5ad',
    borderRadius: 10,
    width: 230,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SplashScreen;