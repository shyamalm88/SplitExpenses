import Background from "@/components/common/Background";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { ContactContext } from "../Context/LedgerContactContext";
import ContactListItemView from "@/components/common/ContactListItemView/ContactListItemView";
import BackButton from "@/components/common/BackButton";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 0, // optional, default 3
  useShadowColorFromDataset: false, // optional
};

export default function AllLedgerContactList() {
  const { ledgerContactData, setLedgerData } = React.useContext(ContactContext);

  const meOwe = ledgerContactData
    .filter((item: any) => item.amountOwe < 0)
    .reduce((acc: number, curr: any) => Math.abs(curr.amountOwe - acc), 0);
  const oweMe = ledgerContactData
    .filter((item: any) => item.amountOwe >= 0)
    .reduce((acc: number, curr: any) => Math.abs(curr.amountOwe + acc), 0);

  const data = [
    {
      name: "I Owe Others",
      population: meOwe,
      color: "#FF5722",
      legendFontColor: "#7F7F7F",
    },
    {
      name: "Others Owe Me",
      population: oweMe,
      color: "#299764",
      legendFontColor: "#7F7F7F",
    },
  ];

  return (
    <Background>
      <SafeAreaView />
      <BackButton goBack={() => router.back()} />
      <View style={{ borderWidth: 1, borderRadius: 10, borderColor: "#ccc" }}>
        <PieChart
          data={data}
          width={Dimensions.get("screen").width - 100}
          height={170}
          accessor={"population"}
          backgroundColor={"white"}
          chartConfig={chartConfig}
          paddingLeft={"0"}
          // center={[100, 0]}
          style={{
            marginVertical: 8,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={{ flex: 1 }}>
        <ContactListItemView data={ledgerContactData} />
      </View>
    </Background>
  );
}
