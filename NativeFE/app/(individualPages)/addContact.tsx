import { Alert, Dimensions, Platform, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, HStack, Text, VStack } from "@react-native-material/core";
import {
  ActivityIndicator,
  Button,
  List,
  RadioButton,
} from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import TextInput from "@/components/common/TextInput";
import React from "react";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import { ContactContext } from "../Context/LedgerContactContext";
import axios from "axios";
import { useRootNavigationState } from "expo-router";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
// const exampleImageUri = Image.resolveAssetSource(image).uri;

function AddContact() {
  const rootNavigationState = useRootNavigationState();
  const navigatorReady = rootNavigationState?.key != null;
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [selectedContact, setSelectedContact] = React.useState<any>(null);

  const [filterText, setFilterText] = React.useState("");

  const { allContactData } = React.useContext(ContactContext);
  const [allContacts, setAllContacts] = React.useState([]);

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
    if (!navigatorReady) {
      return;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setAllContacts(allContactData);
  }, [navigatorReady]);

  React.useEffect(() => {
    filterContact(filterText);
  }, [filterText]);

  const handleNumberSelection = (value: string, item: any) => {
    setValue(value);
    setSelectedContact({ ...item, number: value });
  };

  const done = async () => {
    console.log(selectedContact);
    const newData = {
      id: Date.now(),
      contactId: selectedContact.id,
      amountOwe: 0,
      currencySymbol: "INR",
      settled: null,
      settledDate: "",
      number: selectedContact.number,
      name: selectedContact.name,
    };
    await axios.post("http://192.168.1.2:3000/ledger", newData);
    router.push("/(tabs)/home");
  };

  return (
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
        {loading ? (
          <VStack justify="center" items="center" style={{ flex: 1 }}>
            <ActivityIndicator size="large" />
          </VStack>
        ) : (
          <>
            <HStack justify="between">
              <BackButton
                absolute={false}
                goBack={() => router.navigate("/(tabs)/home")}
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
                  {allContacts.map((item: any) => {
                    return (
                      <React.Fragment key={item.id}>
                        {item.phoneNumbers &&
                          Array.isArray(item.phoneNumbers) &&
                          item.phoneNumbers.map((itm: any[], index: number) => {
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
                                key={item?.phoneNumbers[index]?.id}
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
                                          value={
                                            item.phoneNumbers[index].number
                                          }
                                        />
                                      </View>
                                    </RadioButton.Group>
                                  </VStack>
                                )}
                              />
                            );
                          })}
                      </React.Fragment>
                    );
                  })}
                </List.Section>
              </ScrollView>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
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
