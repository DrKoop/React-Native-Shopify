
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import SpinnerImg from "../assets/spinner.json"

const Spinner = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={SpinnerImg}
        autoPlay
        loop
      />
      <Text style={styles.text}>Cargando ....</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 400,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Spinner;