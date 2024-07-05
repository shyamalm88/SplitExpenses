import { Dimensions, Platform, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, HStack, Text, VStack } from "@react-native-material/core";
import { Button, List, RadioButton } from "react-native-paper";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import TextInput from "@/components/common/TextInput";
import React from "react";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import { ContactContext } from "../Context/LedgerContactContext";
import axios from "axios";
// const exampleImageUri = Image.resolveAssetSource(image).uri;

function AddContact() {
  const [value, setValue] = React.useState("");
  const [selectedContact, setSelectedContact] = React.useState<any>(null);

  const [filterText, setFilterText] = React.useState("");

  const { allContactData } = React.useContext(ContactContext);
  const [allContacts, setAllContacts] = React.useState(allContactData);

  function getOrdinal(n: number) {
    let ord = "th";

    if (n % 10 == 1 && n % 100 != 11) {
      ord = "st";
    } else if (n % 10 == 2 && n % 100 != 12) {
      ord = "nd";
    } else if (n % 10 == 3 && n % 100 != 13) {
      ord = "rd";
    }

    return ` (${n}${ord})`;
  }
  const filterContact = (text: string) => {
    if (text) {
      const cntct = allContactData.filter((item: any) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setAllContacts(cntct);
    } else {
      setAllContacts(allContactData);
    }
  };

  React.useEffect(() => {
    filterContact(filterText);
  }, [filterText]);

  const handleNumberSelection = (value: string, item: any) => {
    setValue(value);
    setSelectedContact({ id: item.id, number: value });
  };

  const done = async () => {
    const newData = {
      id: Date.now(),
      contactId: selectedContact.id,
      amountOwe: 0,
      currencySymbol: "INR",
      settled: null,
      settledDate: "",
      number: selectedContact.number,
    };
    await axios.post("http://localhost:3000/ledger", newData);
    router.push("/(tabs)/");
  };

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
          <HStack justify="between">
            <BackButton
              absolute={false}
              goBack={() => router.navigate("/(tabs)/")}
            />
            <Button mode="text" onPress={done}>
              Done
            </Button>
          </HStack>

          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Search Contact"
              onChangeText={(text) => setFilterText(text)}
              value={filterText}
            />
            <ScrollView>
              <List.Section>
                {/* <>{console.log("================")}</> */}
                {allContacts.map((item: any) => {
                  return (
                    <>
                      {item.phoneNumbers &&
                        Array.isArray(item.phoneNumbers) &&
                        item.phoneNumbers.map((itm: any[], index: number) => {
                          //   console.log(
                          //     item.id,
                          //     item.phoneNumbers[index].number,
                          //     item.name
                          //   );
                          return (
                            <List.Item
                              title={
                                item.name +
                                `${index > 0 ? getOrdinal(index + 1) : ""}`
                              }
                              titleStyle={{ fontWeight: "bold" }}
                              description={
                                item?.phoneNumbers
                                  ? item?.phoneNumbers[index]?.number
                                  : ""
                              }
                              descriptionEllipsizeMode="tail"
                              titleEllipsizeMode="tail"
                              key={index}
                              left={() => (
                                <HStack spacing={10}>
                                  <View
                                    style={{
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Avatar
                                      size={50}
                                      label={item.name}
                                      autoColor
                                    />
                                  </View>
                                </HStack>
                              )}
                              right={() => (
                                <VStack justify="center" items="end">
                                  <RadioButton.Group
                                    onValueChange={(newValue: any) =>
                                      handleNumberSelection(newValue, item)
                                    }
                                    value={value}
                                  >
                                    <View
                                      style={{
                                        borderWidth:
                                          Platform.OS == "ios" ? 1 : 0,
                                        borderRadius: 40,
                                        height: 40,
                                        width: 40,
                                        alignItems: "center",
                                        padding: 0,
                                      }}
                                    >
                                      <RadioButton
                                        value={item.phoneNumbers[index].number}
                                      />
                                    </View>
                                  </RadioButton.Group>
                                </VStack>
                              )}
                            />
                          );
                        })}
                    </>
                  );
                })}
              </List.Section>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default AddContact;

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
