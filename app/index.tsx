import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HomeScreen } from "./Screens";
import { Navigation } from "@/core/types";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});

type Props = {
  navigation: Navigation;
};

const Home = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
};

export default Home;
