import React from "react";
import { View, TouchableOpacity, Text, Animated } from "react-native";

const BottomTabBar = ({ navigation, cartItems,   }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const opacityValue = React.useRef(new Animated.Value(1)).current;

  console.log(); 

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

      <TouchableOpacity onPress={() => handlePress("ProductList")}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
          <Animated.Image
            source={require("../assets/home.png")}
            style={styles.icon}
          />
        </Animated.View>
        <Text style={styles.text}>Home</Text>
      </TouchableOpacity>
      {/* VLogica variable cartItems actualizada , aqui */}
      <TouchableOpacity onPress={() => navigation.navigate("Cart", { cartItems: cartItems })}>
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleValue }] }]}>
          <Animated.Image
            source={require("../assets/carrito.png")}
            style={styles.icon}
          />
        </Animated.View>
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
  iconContainer: {
    width: 40,
    height: 40,
    marginTop: 2,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
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