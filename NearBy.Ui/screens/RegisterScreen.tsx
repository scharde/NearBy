// SignUp.js
import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import Card from "../components/UI/Card";
import { LinearGradient } from "expo-linear-gradient";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { actionCreators as authActionCreator, AuthState } from "../store/auth";

type RegisterScreenProps = AuthState & typeof authActionCreator & any;

const RegisterScreen = (props: RegisterScreenProps) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
  });
  const onChangeText = (key: string, val: string) => {
    const newData: any = { ...data };
    newData[key] = val;
    setData(newData);
  };
  const signUp = async () => {
    try {
      props.registerUserAction(data);
      console.log("user successfully signed up!: ");
    } catch (err) {
      console.log("error signing up: ", err);
    }
  };

  const { firstName, lastName, username, password, email, phoneNumber } = data;
  return (
    <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
      <Card style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          autoCapitalize="none"
          value={firstName}
          onChangeText={(val) => onChangeText("firstName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          autoCapitalize="none"
          value={lastName}
          onChangeText={(val) => onChangeText("lastName", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={(val) => onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          value={password}
          onChangeText={(val) => onChangeText("password", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(val) => onChangeText("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCapitalize="none"
          value={phoneNumber}
          onChangeText={(val) => onChangeText("phoneNumber", val)}
        />
        <View style={styles.button}>
          <Button title="Sign Up" onPress={signUp} />
        </View>
        <View style={styles.msgContainer}>
          {props.registerUser?.message ? (
            <Text style={styles.msg}>{props.registerUser.message}</Text>
          ) : null}
        </View>
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  button: { padding: 10 },
  card: { width: "90%" },
  input: {
    width: "95%",
    height: 45,
    margin: 5,
    marginRight: 20,
    padding: 5,
    fontSize: 16,
    fontWeight: "500",
    borderBottomColor: "grey",
    borderBottomWidth: 0.5,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  msgContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  msg: {
    color: "red",
  },
});

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(RegisterScreen as any);
