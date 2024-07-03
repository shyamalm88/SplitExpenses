import { Dimensions, Image, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/assets/images/pbg.jpg";
import { HStack, Text, VStack } from "@react-native-material/core";
import { FAB, List } from "react-native-paper";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
const exampleImageUri = Image.resolveAssetSource(image).uri;

export default function ActivityScreen() {
  return (
    <GestureHandlerRootView>
      <SafeAreaView
        style={{
          backgroundColor: "#fff",
          flex: 1,
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
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

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
