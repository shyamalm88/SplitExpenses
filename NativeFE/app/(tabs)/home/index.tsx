import { StyleSheet, View, Pressable, ScrollView, Image } from "react-native";

import * as Contacts from "expo-contacts";
import React from "react";
import ListItemView from "@/components/common/ContactListItemView/ContactListItemView";
import Background from "@/components/common/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "@/components/common/BackButton";
import { Link, router } from "expo-router";
import {
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@react-native-material/core";
import "react-native-get-random-values";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FAB } from "react-native-paper";
import { theme } from "@/core/theme";
import { ContactContext } from "../../Context/LedgerContactContext";
import Button from "@/components/common/Button";
import axios from "axios";
import Category from "@/components/Category";
import { getStatusBarHeight } from "react-native-status-bar-height";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import image from "@/assets/images/gm.jpg";
const exampleImageUri = Image.resolveAssetSource(image).uri;

export default function DashboardScreen() {
  const { allContactData, setLedgerData } = React.useContext(ContactContext);
  const [myLedgerData, setMyLedgerData] = React.useState([]);
  const [grantedContactData, setGrantedContactData] =
    React.useState<Contacts.Contact[]>(allContactData);

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

  const getData = async (url: string) => {
    const resp = await fetch(url);
    return resp.json();
  };

  React.useEffect(() => {
    async function getAsyncLedgerData() {
      const ledgerDataResp = await getData("http://192.168.1.2:3000/ledger");
      setMyLedgerData(ledgerDataResp);
    }
    getAsyncLedgerData();
  }, []);

  React.useEffect(() => {
    // console.log(JSON.stringify(grantedContactData));
    // console.log(JSON.stringify(myLedgerData));

    if (myLedgerData.length > 0) {
      let arr3 = myLedgerData.map((item: any) => ({
        ...item,
      }));
      let settled = myLedgerData
        .filter((item: any) => item && item?.settled)
        .map((item: any) => ({
          ...item,
        }));

      const meOwe = arr3
        .filter((item: any) => item && item?.amountOwe < 0 && !item?.settled)
        .reduce((acc, curr: any) => Math.abs(curr.amountOwe - acc), 0);
      const oweMe = arr3
        .filter((item: any) => item && item?.amountOwe >= 0 && !item?.settled)
        .reduce((acc, curr: any) => Math.abs(curr?.amountOwe + acc), 0);

      setMeOwe(meOwe);
      setOthersOweMe(oweMe);
      setContacts(arr3);
      setSettledContacts(settled);
      setLedgerData(arr3);
      setDumpData(arr3);
    }
  }, [myLedgerData, grantedContactData]);

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
            <Box style={{ height: 60 }}>
              <VStack>
                <HStack items="center" justify="between">
                  <BackButton
                    absolute={false}
                    goBack={() => router.navigate("/(tabs)/home")}
                  />
                  <HStack items="start">
                    <IconButton
                      icon={(props) => <Icon name="magnify" {...props} />}
                    />
                    <IconButton
                      icon={(props) => <Icon name="dots-vertical" {...props} />}
                    />
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          </Background>
        }
      >
        <ScrollView
          contentContainerStyle={styles.contentContainerScroll}
          showsVerticalScrollIndicator={false}
        >
          <Background>
            {/* <SafeAreaView style={{ height: "auto", flex: 1 }}> */}
            <View
              style={[
                {
                  flexDirection: "column",
                  flex: 1,
                },
              ]}
            >
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

              <Box style={{ height: 35 }}>
                {contacts?.length && (
                  <Link
                    href="/(individualPages)/allLedgerContactList"
                    push
                    style={{
                      alignSelf: "flex-end",
                      color: theme.colors.primary,
                      borderWidth: 1,
                      borderColor: theme.colors.primary,
                      padding: 5,
                      marginBottom: 2,
                    }}
                  >
                    <Text color={theme.colors.primary}>View All</Text>
                    <Icon name="arrow-right" />
                  </Link>
                )}
              </Box>

              <View>
                <ListItemView data={contacts} limit={10} />
              </View>
              {contacts && contacts.length && (
                <View style={{ marginTop: 10 }}>
                  <Divider
                    style={{ marginVertical: 20 }}
                    leadingInset={16}
                    trailingInset={16}
                  />
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
                        <ListItemView data={settledContacts} settled />
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
              )}
            </View>

            {/* </SafeAreaView> */}
          </Background>
        </ScrollView>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => router.push("/(individualPages)/addContact")}
          color={"white"}
        />
      </ParallaxScrollView>

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
            <Pressable onPress={handleBottomSheetClose}>
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Close</Text>
              </View>
            </Pressable>
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
  contentContainerScroll: {
    paddingVertical: 20,
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
    right: 20,
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
