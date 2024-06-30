import React from "react";
import { Image, ImageBackground, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  Avatar,
  Icon,
  IconButton,
  ListItem,
  Stack,
  Text,
  VStack,
} from "@react-native-material/core";

const ContactListItemView = ({ data }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      {(data == null || data.length === 0) && (
        <ImageBackground
          source={require("@/assets/images/9170826.jpg")}
          resizeMode="cover"
          style={styles.background}
        />
      )}
      <Stack fill spacing={4}>
        {data.length &&
          data.map((item: any) => {
            return (
              <View style={styles.mainCardView} key={item.id}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.subCardView}>
                    <Avatar size={40} label={item.name} autoColor />
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#333",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.name}
                    </Text>
                    <View
                      style={{
                        marginTop: 4,
                        borderWidth: 0,
                      }}
                    ></View>
                  </View>
                </View>
                <View
                  style={{
                    marginLeft: 26,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <VStack spacing={4} items="end">
                    <Text
                      style={{
                        color:
                          item.amountOwe < 0
                            ? "red"
                            : item.amountOwe === 0
                            ? "gray"
                            : "green",
                        fontSize: 12,
                      }}
                    >
                      {item.amountOwe < 0
                        ? `You owe`
                        : item.amountOwe === 0
                        ? `no expenses`
                        : `Owes you`}
                    </Text>
                    <Text
                      style={{
                        color:
                          item.amountOwe < 0
                            ? "red"
                            : item.amountOwe === 0
                            ? "gray"
                            : "green",
                        fontSize: 16,
                      }}
                    >
                      {Math.abs(item.amountOwe) === 0
                        ? ""
                        : "₹" + Math.abs(item.amountOwe)}
                    </Text>
                  </VStack>
                </View>
              </View>
            );
          })}
      </Stack>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  mainCardView: {
    height: 70,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#d7d7d7",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 6,
    marginBottom: 16,
  },
  subCardView: {
    height: 40,
    width: 40,
    borderRadius: 25,
    backgroundColor: "red",
    borderColor: "#000",
    borderWidth: 1,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: 300,
    flex: 1,
  },
});

export default ContactListItemView;
