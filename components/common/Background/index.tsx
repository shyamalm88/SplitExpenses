import React, { memo } from "react";
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  View,
} from "react-native";

type Props = {
  backgroundColor?: string;
  children: React.ReactNode;
};

const Background = ({ backgroundColor, children }: Props) => {
  return (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : "white",
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("@/assets/images/background_dot.png")}
        resizeMode="repeat"
        style={styles.background}
      >
        <KeyboardAvoidingView style={styles.container} behavior="padding">
          {children}
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    padding: 10,
    width: "100%",
    maxWidth: "90%",
    height: "auto",
    alignSelf: "center",
    justifyContent: "center",
  },
});

export default memo(Background);
