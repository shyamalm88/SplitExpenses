import React, { memo } from "react";
import Background from "@/components/common/Background";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import Paragraph from "@/components/common/Paragraph";
import Button from "@/components/common/Button";
import { Navigation } from "@/core/types";

type Props = {
  navigation: Navigation;
};

const Dashboard = ({ navigation }: Props) => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button
      variant="outlined"
      onPress={() => navigation.navigate("HomeScreen")}
    >
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
