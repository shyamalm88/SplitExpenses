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
import {
  HStack,
  Icon,
  IconButton,
  Spacer,
  Text,
} from "@react-native-material/core";
import ColorfulCard from "react-native-colorful-card";
import image from "@/assets/images/flat-lay-vibrant-paper-pyramids-with-copy-space.jpg";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import SmallCards from "@/components/common/Cards";
import React from "react";
import axios from "axios";
import { FAB } from "react-native-paper";

const exampleImageUri = Image.resolveAssetSource(image).uri;

export default function GroupsScreen() {
  const [groups, setGroups] = React.useState<any>([]);
  React.useEffect(() => {
    (async () => {
      const d = axios.get(`http://192.168.1.2:3000/groups`);
      const resp = await d;
      setGroups(resp.data);
    })().catch((err) => {
      console.error(err);
    });
  }, []);
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
      <Background>
        <SafeAreaView
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text variant="button" style={{ marginBottom: 10 }}>
              Groups
            </Text>
            <View
              style={{
                flex: 1,
              }}
            >
              <HStack justify="start" spacing={4}>
                {groups.map((item: any) => {
                  return (
                    <SmallCards
                      key={item.id}
                      iconName="airplane"
                      title={item.name}
                      gradientColors={["#00ecbc", "#007adf"]}
                      variant=""
                      textColor="#333"
                    />
                  );
                })}
              </HStack>
            </View>
          </View>
          <FAB
            icon="account-multiple-plus"
            style={styles.fab}
            onPress={() => {}}
            color={"white"}
          />
        </SafeAreaView>
      </Background>
    </ParallaxScrollView>
  );
}

export function ImageCompScreen(props: any) {
  return <Icon name={props.source.uri} size={30} color="white" />;
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginBottom: 16,
    right: -20,
    bottom: -5,
    backgroundColor: "tomato",
    borderRadius: 50,
  },
});
