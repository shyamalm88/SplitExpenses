import React, { memo, useState } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { emailValidator } from "@/core/utils";
import Background from "@/components/common/Background";
import BackButton from "@/components/common/BackButton";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import TextInput from "@/components/common/TextInput";
import { theme } from "@/core/theme";
import Button from "@/components/common/Button";
import { Navigation } from "@/core/types";
import { router } from "expo-router";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState({ value: "", error: "" });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    router.navigate("/login");
  };

  return (
    <Background>
      <BackButton goBack={() => router.navigate("/login")} />

      <Logo />

      <Header>Restore Password</Header>

      <TextInput
        label="E-mail address"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        // autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Reset
      </Button>

      <Pressable style={styles.back} onPress={() => router.navigate("/login")}>
        <Text style={styles.label}>← Back to login</Text>
      </Pressable>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: "100%",
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: "100%",
  },
});

export default memo(ForgotPasswordScreen);
