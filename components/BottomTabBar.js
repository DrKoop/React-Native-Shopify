
import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

const BottomTabBar = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Categories")}>
        <Image source={require("../assets/home.png")} style={styles.icon} />
        <Text style={styles.text}>Categorías</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image source={require("../assets/home.png")} style={styles.icon} />
        <Text style={styles.text}>Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image source={require("../assets/home.png")} style={styles.icon} />
        <Text style={styles.text}>Ajustes</Text>
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
    backgroundColor: "green",
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