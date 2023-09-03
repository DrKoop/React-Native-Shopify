import React from "react";
import { View, TouchableOpacity, Text, Image, Animated } from "react-native";

const BottomTabBar = ({ navigation }) => {
    
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = (screenName) => {
    Animated.parallel([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(opacityValue, {
        toValue: 0.5,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate(screenName);
      Animated.parallel([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: `rgba(0.25, 100 , .50 , 0.5) ${opacityValue})` }]}>
      <TouchableOpacity onPress={() => handlePress("Categories")}>
        <Animated.Image
          source={require("../assets/home.png")}
          style={[styles.icon, { transform: [{ scale: scaleValue }] }]}
        />
        <Text style={styles.text}>Categorías</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress("Carrito")}>
        <Animated.Image
          source={require("../assets/carrito.png")}
          style={[styles.icon, { transform: [{ scale: scaleValue }] }]}
        />
        <Text style={styles.text}>Carrito</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
    marginTop: 4,
    color: "white",
  },
};

export default BottomTabBar;