import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
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
        toValue: 8,
        duration: 6000,
        useNativeDriver: false,
        easing : Easing.sin
      })
    ).start();
  }, []);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    outputRange: [
      '#081c15',
      '#1b4332',
      '#2d6a4f',
      '#40916c',
      '#52b788',
      '#74c69d',
      '#95d5b2',
      '#b7e4c7',
      '#d8f3dc',
    ],
    extrapolate: 'clamp',
    // Utiliza la función Animated.sin para una transición sinosoidal
    easing: Animated.sin,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { backgroundColor }]}>
        <LottieView style={styles.animation2} source={backgroundLottie} autoPlay loop />
        <LottieView style={styles.animation} source={animacionImg} autoPlay loop />
        <View style={styles.containerTextandButton}>
          <Text style={styles.text}>¡Bienvenido!</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={handleHomeScreen}>
            <Text style={styles.buttonText}>Ver Menú</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation2: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  containerTextandButton: {
    marginTop: 420,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 15,
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