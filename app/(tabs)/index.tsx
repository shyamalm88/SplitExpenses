import {
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  View,
} from "react-native";

import * as Contacts from "expo-contacts";
import React from "react";
import ListItemView from "@/components/common/ContactListItemView/ContactListItemView";
import Background from "@/components/common/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import {
  Box,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  TextInput,
  VStack,
} from "@react-native-material/core";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FAB } from "react-native-paper";
[
  "177C371E-701D-42F8-A03B-C61CA31627F6",
  "AB211C5F-9EC9-429F-9466-B9382FF61035",
  "410FE041-5C4E-48DA-B4DE-04C15EA3DBAC",
  "F57C8277-585D-4327-88A6-B5689FF69DFE",
  "2E73EE73-C03F-4D5F-B1E8-44E85A70F170",
  "E94CD15C-7964-4A9B-8AC4-10D7CFB791FD",
];
const myLedgerData: any[] = [
  {
    id: uuidv4(),
    contactId: "177C371E-701D-42F8-A03B-C61CA31627F6",
    amountOwe: -2039,
    currencySymbol: "INR",
    settled: false,
  },
  {
    id: uuidv4(),
    contactId: "410FE041-5C4E-48DA-B4DE-04C15EA3DBAC",
    amountOwe: 6198,
    currencySymbol: "INR",
    settled: false,
  },
  {
    id: uuidv4(),
    contactId: "E94CD15C-7964-4A9B-8AC4-10D7CFB791FD",
    amountOwe: -20,
    currencySymbol: "INR",
    settled: false,
  },
  {
    id: uuidv4(),
    contactId: "2E73EE73-C03F-4D5F-B1E8-44E85A70F170",
    amountOwe: 0,
    currencySymbol: "INR",
    settled: null,
  },
];

export default function DashboardScreen() {
  const [contacts, setContacts] = React.useState<Contacts.Contact[] | null>(
    null
  );
  const [dumpData, setDumpData] = React.useState<Contacts.Contact[] | null>(
    null
  );
  const filterData = [
    { label: "None", value: null },
    { label: "Owe Me", value: "oweMe" },
    { label: "I Owe", value: "iOwe" },
  ];
  const [meOwe, setMeOwe] = React.useState(0);
  const [othersOweMe, setOthersOweMe] = React.useState(0);
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState(0);
  const [filterCriteria, setFilterCriteria] = React.useState("");

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const snapPoints = React.useMemo(() => ["1", "25%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetIndex <= 0
      ? bottomSheetModalRef.current?.expand()
      : bottomSheetModalRef.current?.close();
  }, [bottomSheetIndex]);
  const handleSheetChanges = React.useCallback((index: number) => {
    // console.log("handleSheetChanges", index);
    setBottomSheetIndex(index);
  }, []);

  const handleFilter = (item: any) => {
    setFilterCriteria(item.value);
    bottomSheetModalRef.current?.close();
  };

  React.useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.Emails,
            Contacts.Fields.PhoneNumbers,
          ],
        });

        if (data.length > 0) {
          let arr3 = myLedgerData.map((item, i) =>
            Object.assign({}, item, data[i])
          );
          const meOwe = arr3
            .filter((item) => item.amountOwe < 0)
            .reduce((acc, curr) => Math.abs(curr.amountOwe - acc), 0);
          const oweMe = arr3
            .filter((item) => item.amountOwe >= 0)
            .reduce((acc, curr) => Math.abs(curr.amountOwe + acc), 0);
          setMeOwe(meOwe);
          setOthersOweMe(oweMe);
          setContacts(arr3);
          setDumpData(arr3);
        }
      }
    })();
  }, []);

  React.useEffect(() => {
    let d: any = [];
    if (filterCriteria === "oweMe") {
      d = dumpData?.filter((item: any) => {
        return item.amountOwe < 0;
      });
    } else if (filterCriteria === "iOwe") {
      d = dumpData?.filter((item: any) => {
        return item.amountOwe > 0;
      });
    } else {
      d = dumpData;
    }
    setContacts(d);
  }, [filterCriteria]);

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <View style={styles.itemContainer}>
        <Text onPress={() => handleFilter(item)} style={{ color: "#0F67B1" }}>
          {item.label}
        </Text>
      </View>
    ),
    []
  );

  return (
    <>
      <Background>
        <SafeAreaView style={{ flex: 1 }}>
          <Box style={{ height: 60 }}>
            <VStack>
              <HStack justify="between" items="center">
                <View>
                  <BackButton
                    absolute={false}
                    goBack={() => router.navigate("/(tabs)/")}
                  />
                </View>
                <View></View>
                <View>
                  <HStack>
                    <IconButton
                      icon={(props) => <Icon name="magnify" {...props} />}
                    />
                    <IconButton
                      icon={(props) => <Icon name="dots-vertical" {...props} />}
                    />
                  </HStack>
                </View>
              </HStack>
            </VStack>
          </Box>
          <Box style={{ height: 60 }}>
            <HStack justify="between" items="center">
              {(!filterCriteria || filterCriteria === "oweMe") && (
                <VStack spacing={5}>
                  <HStack justify="start" spacing={10}>
                    <Text variant="subtitle1">Overall, You Owe</Text>
                    <Text
                      variant="subtitle1"
                      color="red"
                      style={{ fontWeight: "bold" }}
                    >
                      ₹ {meOwe}
                    </Text>
                  </HStack>
                </VStack>
              )}
              {filterCriteria === "iOwe" && (
                <VStack spacing={5}>
                  <HStack justify="start" spacing={10}>
                    <Text variant="subtitle1">Overall, Others Owe You</Text>
                    <Text
                      variant="subtitle1"
                      color="green"
                      style={{ fontWeight: "bold" }}
                    >
                      ₹ {othersOweMe}
                    </Text>
                  </HStack>
                </VStack>
              )}
              <IconButton
                onPress={handlePresentModalPress}
                icon={(props) => <Icon name="tune" {...props} />}
              />
            </HStack>
          </Box>
          <ListItemView data={contacts} />
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => console.log("Pressed")}
            color={"white"}
          />
        </SafeAreaView>
      </Background>

      <BottomSheet
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{
          borderWidth: 1,
          borderColor: "#7D8ABC",
          shadowColor: "#333",
          shadowOffset: {
            width: 2,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 15,
        }}
      >
        <BottomSheetView
          style={{
            ...styles.contentContainer,
          }}
        >
          <Text variant="button" style={{ alignSelf: "center" }}>
            Set Filter
          </Text>
          <BottomSheetFlatList
            data={filterData}
            keyExtractor={(i) => i.label}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContentContainer}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    flexDirection: "column",
    // backgroundColor: "#f7f7f7",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  flatListContentContainer: {},
  fab: {
    position: "absolute",
    marginBottom: 16,
    right: -20,
    bottom: -5,
    backgroundColor: "tomato",
  },
});
