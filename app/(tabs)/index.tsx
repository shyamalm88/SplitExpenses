import {
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  View,
  Pressable,
} from "react-native";

import * as Contacts from "expo-contacts";
import React from "react";
import ListItemView from "@/components/common/ContactListItemView/ContactListItemView";
import Background from "@/components/common/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { Link, router } from "expo-router";
import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Text,
  TextInput,
  VStack,
} from "@react-native-material/core";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
  TouchableHighlight,
} from "@gorhom/bottom-sheet";
import { FAB } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "@/core/theme";
import { ContactContext } from "../Context/LedgerContactContext";
import { Collapsible } from "@/components/Collapsible";
import { Ionicons } from "@expo/vector-icons";
import Button from "@/components/common/Button";
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
  {
    id: uuidv4(),
    contactId: "E94CD15C-7964-4A9B-8AC4-10D7CFB791FD",
    amountOwe: -400,
    currencySymbol: "INR",
    settled: true,
  },
];

export default function DashboardScreen() {
  const { setLedgerData } = React.useContext(ContactContext);

  const [contacts, setContacts] = React.useState<Contacts.Contact[] | null>(
    null
  );
  const [isOpen, setOpen] = React.useState<boolean | null>(null);
  const [settledContacts, setSettledContacts] = React.useState<
    Contacts.Contact[] | null
  >(null);
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
  const snapPoints = React.useMemo(() => ["1%", "35%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetIndex <= 0
      ? bottomSheetModalRef.current?.expand()
      : bottomSheetModalRef.current?.close();
  }, [bottomSheetIndex]);
  const handleSheetChanges = React.useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const handleFilter = (item: any) => {
    setFilterCriteria(item.value);
    bottomSheetModalRef.current?.close();
  };

  const handleBottomSheetClose = () => {
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
          let arr3 = myLedgerData
            .filter((item) => !item.settled)
            .map((item, i) => Object.assign({}, item, data[i]));
          let settled = myLedgerData
            .filter((item) => item.settled)
            .map((item, i) => Object.assign({}, item, data[i]));

          const meOwe = arr3
            .filter((item) => item.amountOwe < 0 && !item.settled)
            .reduce((acc, curr) => Math.abs(curr.amountOwe - acc), 0);
          const oweMe = arr3
            .filter((item) => item.amountOwe >= 0 && !item.settled)
            .reduce((acc, curr) => Math.abs(curr.amountOwe + acc), 0);

          setMeOwe(meOwe);
          setOthersOweMe(oweMe);
          setContacts(arr3);
          setSettledContacts(settled);
          setLedgerData(arr3);
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
    setLedgerData(d);
  }, [filterCriteria]);

  const renderItem = React.useCallback(
    ({ item }: any) => (
      <View style={styles.itemContainer}>
        <Text
          onPress={() => handleFilter(item)}
          style={{ color: theme.colors.primary }}
        >
          {item.label}
        </Text>
      </View>
    ),
    []
  );

  return (
    <>
      <Background>
        <SafeAreaView style={{ height: "auto", flex: 1 }}>
          <View
            style={[
              {
                flexDirection: "column",
                flex: 1,
              },
            ]}
          >
            <View style={{ flex: 1 }}>
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
                          icon={(props) => (
                            <Icon name="dots-vertical" {...props} />
                          )}
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
                          color="#FF5722"
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
                          color="#299764"
                          style={{ fontWeight: "bold" }}
                        >
                          ₹ {othersOweMe}
                        </Text>
                      </HStack>
                    </VStack>
                  )}
                  <IconButton
                    onPress={handlePresentModalPress}
                    color={
                      filterCriteria === "iOwe" && contacts?.length
                        ? "#299764"
                        : "#FF5722"
                    }
                    icon={(props) => <Icon name="tune" {...props} />}
                  />
                </HStack>
              </Box>
              <Box style={{ height: 20 }}>
                {contacts?.length && (
                  <Link
                    href="/(individualPages)/allLedgerContactList"
                    push
                    style={{
                      alignSelf: "flex-end",
                      color: theme.colors.primary,
                    }}
                  >
                    <Text>View All</Text>
                    <Icon name="arrow-right" />
                  </Link>
                )}
              </Box>
              <View>
                <ListItemView data={contacts} limit={5} />
              </View>
              <View style={{ marginTop: 10 }}>
                {isOpen && (
                  <View style={{ marginBottom: 20 }}>
                    <VStack spacing={10}>
                      <HStack spacing={4} justify="center">
                        <Text
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            color: theme.colors.secondary,
                          }}
                          onPress={() => setOpen(false)}
                        >
                          Previously settled up friends
                        </Text>
                        <Icon
                          name={"chevron-up"}
                          color={theme.colors.primary}
                          size={20}
                        />
                        <Text
                          style={{
                            justifyContent: "center",
                            alignSelf: "center",
                            color: theme.colors.primary,
                          }}
                          onPress={() => setOpen(false)}
                        >
                          Re-Hide
                        </Text>
                      </HStack>
                      <ListItemView data={settledContacts} />
                    </VStack>
                  </View>
                )}
                {!isOpen && (
                  <VStack spacing={2}>
                    <Text
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        color: theme.colors.secondary,
                      }}
                    >
                      Hiding Already Settled Up Friends
                    </Text>
                    <Button mode="contained" onPress={() => setOpen(true)}>
                      <HStack
                        spacing={6}
                        items="center"
                        justify="center"
                        content="center"
                        self="center"
                      >
                        <Icon name={"chevron-down"} color="white" size={24} />
                        <Text
                          variant="body2"
                          style={{ fontSize: 18, color: "white" }}
                        >
                          See All Recently Settled Contacts
                        </Text>
                      </HStack>
                    </Button>
                  </VStack>
                )}
              </View>
            </View>
          </View>
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
        index={-1}
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
        footerComponent={(props) => (
          <BottomSheetFooter {...props} bottomInset={0}>
            <TouchableOpacity onPress={handleBottomSheetClose}>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Close</Text>
              </View>
            </TouchableOpacity>
          </BottomSheetFooter>
        )}
      >
        <BottomSheetView
          style={{
            ...styles.contentContainer,
          }}
        >
          <Text
            variant="button"
            style={{ alignSelf: "center", marginBottom: 10 }}
          >
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
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#d7d7d7",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  flatListContentContainer: {},
  fab: {
    position: "absolute",
    marginBottom: 16,
    right: -20,
    bottom: -5,
    backgroundColor: "tomato",
    borderRadius: 50,
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
  },
  footerText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
