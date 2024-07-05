import React, { memo, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Background from "@/components/common/Background";
import Logo from "@/components/common/Logo";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import TextInput from "@/components/common/TextInput";
import BackButton from "@/components/common/BackButton";
import { theme } from "@/core/theme";
import { Navigation } from "@/core/types";
import { emailValidator, passwordValidator, nameValidator } from "@/core/utils";
import { router } from "expo-router";

type Props = {
  navigation: Navigation;
};

const RegisterScreen = () => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    router.navigate("Dashboard");
  };

  return (
    <Background>
      <BackButton goBack={() => router.navigate("/")} />

      <Logo />

      <Header>Create Account</Header>

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        // autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Sign Up
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <Pressable onPress={() => router.navigate("/login")}>
          <Text style={styles.link}>Login</Text>
        </Pressable>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
