import Background from "@/components/common/Background";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import React from "react";
import { Dimensions, Image, Pressable, View } from "react-native";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "@/assets/images/pbg.jpg";
import { parse, format } from "date-fns";
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
import { ScrollView } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { theme } from "@/core/theme";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import BottomSheet, {
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
const exampleImageUri = Image.resolveAssetSource(image).uri;

function IndividualProfileView() {
  const route = useRoute();
  const [profileData, setProfileData] = React.useState<any>(null);
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = React.useState(0);

  const snapPoints = React.useMemo(() => ["1%", "90%"], []);
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetIndex <= 0
      ? bottomSheetModalRef.current?.expand()
      : bottomSheetModalRef.current?.close();
  }, [bottomSheetIndex]);
  const handleSheetChanges = React.useCallback((index: number) => {
    setBottomSheetIndex(index);
  }, []);

  const handleBottomSheetClose = () => {
    bottomSheetModalRef.current?.close();
  };

  const { profileId } = route.params;

  React.useEffect(() => {
    (async () => {
      const d = axios.get(`http://localhost:3000/profile/${profileId}`);
      const resp = await d;
      setProfileData(resp.data);
    })().catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <>
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
          <Background mode="cover" backgroundImage={exampleImageUri}>
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
                  label={profileData?.name}
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
            <Text variant="button">{profileData?.name}</Text>
            <HStack spacing={6} style={{ marginVertical: 20 }}>
              <Text variant="subtitle2">You Owe {profileData?.name}</Text>
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
                  {profileData?.ledgerItems.map((item: any) => {
                    const dateString = item?.eventDate;
                    return (
                      <List.Item
                        key={item.id}
                        title={item.eventType}
                        titleStyle={{ fontWeight: "bold" }}
                        description={item.eventDescription}
                        descriptionEllipsizeMode="tail"
                        titleEllipsizeMode="tail"
                        left={() => (
                          <HStack spacing={10}>
                            <VStack center style={{ width: 40 }}>
                              <Text>
                                {format(
                                  parse(dateString, "MM/dd/yyyy", new Date()),
                                  "MMM"
                                )}
                              </Text>
                              <Text>
                                {format(
                                  parse(dateString, "MM/dd/yyyy", new Date()),
                                  "dd"
                                )}
                              </Text>
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
                            <Text color="red">{`₹ ${item.amount}`}</Text>
                          </VStack>
                        )}
                      />
                    );
                  })}
                </List.Section>
              </ScrollView>
            </View>
          </View>
          <FAB
            icon="plus"
            style={styles.fab}
            onPress={() => handlePresentModalPress()}
            color={"white"}
          />
        </SafeAreaView>
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
                <Text style={styles.footerText}>Save & Close</Text>
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
            Add Expenses
          </Text>
        </BottomSheetView>
      </BottomSheet>
    </>
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    marginBottom: 30,
  },
  footerText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
