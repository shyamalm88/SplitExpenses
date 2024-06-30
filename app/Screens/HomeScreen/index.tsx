import React, { memo } from "react";
import Background from "@/components/common/Background";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Paragraph from "@/components/common/Paragraph";
import { Navigation } from "@/core/types";
import { router } from "expo-router";
import { PagerViewComponent } from "@/components/common/PagerView";
import { Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";

type Props = {
  navigation: Navigation;
};

const HomeScreen = () => {
  return <PagerViewComponent />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width: "100%",
    height: "100%",
  },
});

export default memo(HomeScreen);
