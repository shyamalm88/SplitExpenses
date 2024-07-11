import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Image, Platform, View, Dimensions } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Background from "@/components/common/Background";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { HStack, Icon, IconButton, Text } from "@react-native-material/core";
import ColorfulCard from "react-native-colorful-card";
import image from "@/assets/images/flat-lay-vibrant-paper-pyramids-with-copy-space.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import SmallCards from "@/components/common/Cards";
const exampleImageUri = Image.resolveAssetSource(image).uri;

export default function GroupsScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "red" }}
      style={{
        height: 180,
        justifyContent: "center",
      }}
      headerStyle={{
        height: 180,
        justifyContent: "center",
      }}
      headerImage={
        <Background mode="cover" backgroundImage={exampleImageUri}>
          <View style={{ flex: 1, justifyContent: "center" }}>
            <BackButton goBack={() => router.back()} />
          </View>
          <IconButton
            icon={(props) => <Icon name="cog-outline" {...props} size={24} />}
            onPress={() => router.push("/")}
            color="#333"
            style={{
              position: "absolute",
              top: 28 + getStatusBarHeight(),
              right: 10,
            }}
          />
        </Background>
      }
    >
      <SafeAreaView>
        <View style={{ paddingHorizontal: 20 }}>
          <Text variant="button" style={{ marginBottom: 10 }}>
            Groups
          </Text>
          <ScrollView horizontal>
            <HStack justify="start" spacing={4}>
              <SmallCards
                iconName="airplane"
                title={"Goa Trip"}
                gradientColors={["#00ecbc", "#007adf"]}
                variant=""
                textColor="#333"
              />
            </HStack>
          </ScrollView>
        </View>
      </SafeAreaView>
    </ParallaxScrollView>
  );
}

export function ImageCompScreen(props: any) {
  return <Icon name={props.source.uri} size={30} color="white" />;
}

const styles = StyleSheet.create({});
