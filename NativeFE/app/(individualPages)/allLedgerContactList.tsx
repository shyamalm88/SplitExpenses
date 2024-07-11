import Background from "@/components/common/Background";
import React from "react";
import { Text, View } from "react-native";
import { ContactContext } from "../Context/LedgerContactContext";
import ContactListItemView from "@/components/common/ContactListItemView/ContactListItemView";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { PieChart } from "react-native-gifted-charts";
import { theme } from "@/core/theme";

export default function AllLedgerContactList() {
  const { ledgerContactData, setLedgerData } = React.useContext(ContactContext);

  const oweMe = ledgerContactData
    .filter((item: any) => item.amountOwe < 0)
    .reduce((acc: number, curr: any) => Math.abs(curr.amountOwe - acc), 0);
  const meOwe = ledgerContactData
    .filter((item: any) => item.amountOwe >= 0)
    .reduce((acc: number, curr: any) => Math.abs(curr.amountOwe + acc), 0);

  const renderDot = (color: string) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#006DFF")}
            <Text style={{ color: "#006DFF" }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#8F80F3")}
            <Text style={{ color: "#8F80F3" }}>Okay: 16%</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#3BE9DE")}
            <Text style={{ color: "#3BE9DE" }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FF7F97")}
            <Text style={{ color: "#FF7F97" }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  const data = [
    {
      value: meOwe,
      color: "green",
      text: "" + Math.round((meOwe / (meOwe + oweMe)) * 100) + "%",
      shiftTextY: 10,
      textBackgroundColor: "tomato",
      textColor: "#fff",
      // shiftX: 28,
      // shiftY: -18,
    },
    {
      value: oweMe,
      color: "tomato",
      text: "" + Math.round((oweMe / (meOwe + oweMe)) * 100) + "%",
      shiftTextY: 10,
      textBackgroundColor: "green",
      textColor: "#fff",
    },
  ];

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton goBack={() => router.back()} absolute={false} />
        <View
          style={{
            borderRadius: 10,
            borderColor: "#ccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PieChart
            data={data}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={theme.colors.secondary}
            innerCircleBorderColor={"lightgray"}
            innerCircleBorderWidth={4}
            focusOnPress
            centerLabelComponent={() => {
              return (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text
                    style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                  >
                    {meOwe > oweMe ? meOwe : oweMe}
                  </Text>
                  <Text style={{ fontSize: 14, color: "white" }}>
                    {meOwe > oweMe ? "I Owe" : "Others Owe Me"}
                  </Text>
                </View>
              );
            }}
          />
          {/* {renderLegendComponent()} */}
        </View>
        <View style={{ flex: 1 }}>
          <ContactListItemView data={ledgerContactData} />
        </View>
      </SafeAreaView>
    </Background>
  );
}
