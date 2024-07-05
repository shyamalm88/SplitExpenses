import Background from "@/components/common/Background";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { Component } from "react";
import { Dimensions, Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/assets/images/pbg.jpg";
import {
  Avatar,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@react-native-material/core";
import { Button, FAB, List } from "react-native-paper";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "@/core/theme";
// const exampleImageUri = Image.resolveAssetSource(image).uri;

function IndividualProfileView() {
  return (
    <GestureHandlerRootView>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#D0D0D0", dark: "red" }}
        style={{
          height: 300,
          justifyContent: "center",
        }}
        headerStyle={{
          height: 180,
          justifyContent: "center",
        }}
        headerImage={
          <Background mode="cover">
            <View style={{ flex: 1, justifyContent: "center" }}>
              <BackButton goBack={() => router.back()} />
              <View
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  borderWidth: 3,
                  borderColor: "#333",
                  borderStyle: "solid",
                  borderRadius: 50,
                  width: 72,
                  height: 72,
                  alignItems: "center",
                }}
              >
                <Avatar
                  // autoColor
                  color={theme.colors.primary}
                  label={"Paroj Ray"}
                  style={{
                    borderWidth: 2,
                    borderColor: "transparent",
                    borderStyle: "solid",
                  }}
                />
              </View>
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
        <SafeAreaView
          style={{
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              backgroundColor: "#fff",
              flex: 1,
              justifyContent: "flex-start",
              height: Dimensions.get("screen").height - 300,
            }}
          >
            <Text variant="button">Paroj Roy</Text>
            <HStack spacing={6} style={{ marginVertical: 20 }}>
              <Text variant="subtitle2">You Owe Paroj</Text>
              <Text variant="subtitle2" color="red">
                ₹ 2030
              </Text>
            </HStack>
            <View style={{ flexDirection: "row", marginBottom: 20 }}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
              >
                <HStack spacing={20} justify="between" items="center">
                  <Button
                    buttonColor="tomato"
                    textColor="white"
                    style={{
                      minWidth: 100,
                      flex: 1,
                      borderRadius: 2,
                    }}
                    icon="account-cash-outline"
                  >
                    Settle Up
                  </Button>
                  <Button
                    buttonColor={theme.colors.secondaryContainer}
                    textColor="#333"
                    style={{
                      minWidth: 100,
                      flex: 1,
                      borderRadius: 2,
                    }}
                    icon="alarm-snooze"
                  >
                    Remind
                  </Button>
                  <Button
                    buttonColor={theme.colors.primary}
                    textColor="white"
                    style={{
                      minWidth: 100,
                      flex: 1,
                      borderRadius: 2,
                    }}
                    icon="chart-areaspline"
                  >
                    Chart
                  </Button>
                </HStack>
              </ScrollView>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView>
                <List.Section>
                  <List.Subheader>August 2024</List.Subheader>
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                </List.Section>
                <List.Section>
                  <List.Subheader>August 2024</List.Subheader>
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                  <List.Item
                    title="First Item"
                    titleStyle={{ fontWeight: "bold" }}
                    description="lorem ipsum doller sit amet, lorem ipsum doller sit amet, lorem ipsum doller sit amet , lorem ipsum doller sit amet"
                    descriptionEllipsizeMode="tail"
                    titleEllipsizeMode="tail"
                    left={() => (
                      <HStack spacing={10}>
                        <VStack center>
                          <Text>Aug</Text>
                          <Text>16</Text>
                        </VStack>
                        <View
                          style={{
                            justifyContent: "center",
                            backgroundColor:
                              "hsl(" + Math.random() * 360 + ", 100%, 75%)",
                            padding: 15,
                          }}
                        >
                          <List.Icon icon="taxi" />
                        </View>
                      </HStack>
                    )}
                    right={() => (
                      <VStack justify="center">
                        <Text color="red">₹ 3000</Text>
                      </VStack>
                    )}
                  />
                </List.Section>
              </ScrollView>
            </View>
          </View>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            color={"white"}
          />
        </SafeAreaView>
      </ParallaxScrollView>
    </GestureHandlerRootView>
  );
}

export default IndividualProfileView;

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    marginBottom: 16,
    right: 10,
    bottom: -5,
    backgroundColor: "tomato",
    borderRadius: 50,
  },
});
