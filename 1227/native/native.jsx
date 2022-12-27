import React from "react";
import { Text, StyleSheet, useColorScheme, View } from "react-native";

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text>useColorScheme(): {colorScheme}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;


//useWindowDimensions()とは、
import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";

const App = () => {
  const { height, width, scale, fontScale } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Window Dimension Data
      </Text>
      <Text>Height: {height}</Text>
      <Text>Width: {width}</Text>
      <Text>Font scale: {fontScale}</Text>
      <Text>Pixel ratio: {scale}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    fontSize: 20,
    marginBottom: 12
  }
});

export default App;

//addEventListener()とは、