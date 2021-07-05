// SignUp.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { actionCreators as authActionCreator, AuthState } from "../store/auth";
import Input from "../components/PrimaryInputForm";
import PrimaryButton from "../components/PrimaryButton";
import { colors } from "../constants/Colors";
import { registerUser, IRegisterUserProps } from "../service/AuthService";

type RegisterScreenProps = AuthState &
  typeof authActionCreator & { navigation: any };

const RegisterScreen = (props: RegisterScreenProps) => {
  const unloadedData: IRegisterUserProps = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: "",
    phoneNumber: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(unloadedData);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const onChangeText = (key: string, val: string) => {
    const newData: any = { ...data };
    newData[key] = val;
    setData(newData);
  };
  const signUp = async () => {
    registerUser(data)
      .then((result) => {
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (props.registerUser?.isRegistered) {
      setData(unloadedData);
    }
  }, [props.registerUser?.isRegistered]);

  const { firstName, lastName, userName, password, email, phoneNumber } = data;
  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}></View>
      <View style={styles.sectionMiddle}>
        <View>
          <Image
            resizeMode={"contain"}
            style={styles.avatarImg}
            source={require("../assets/images/avatar.jpg")}
          ></Image>
        </View>
        <View style={styles.inputItem}>
          <Input
            placeholder="First Name"
            autoCapitalize="none"
            value={firstName}
            onChangeText={(val) => onChangeText("firstName", val)}
            returnKeyType="next"
          />
        </View>
        <View style={styles.inputItem}>
          <Input
            placeholder="Last Name"
            autoCapitalize="none"
            value={lastName}
            onChangeText={(val) => onChangeText("lastName", val)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputItem}>
          <Input
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={(val) => onChangeText("email", val)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputItem}>
          <Input
            placeholder="Username"
            autoCapitalize="none"
            value={userName}
            onChangeText={(val) => onChangeText("userName", val)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputItem}>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            value={password}
            onChangeText={(val) => onChangeText("password", val)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputItem}>
          <Input
            placeholder="Phone Number"
            autoCapitalize="none"
            keyboardType="number-pad"
            value={phoneNumber}
            onChangeText={(val) => onChangeText("phoneNumber", val)}
            returnKeyType="next"
          />
        </View>

        <View style={styles.inputItem}>
          <PrimaryButton
            buttonBg={colors.primary}
            textColor={colors.secondary}
            label={"Sign Up"}
            isLoading={isLoading}
            disabled={btnDisabled}
            onPress={signUp}
          />
        </View>
      </View>
      <View style={styles.sectionBottom}>
        <View style={styles.bottomContainer}>
          <Text style={styles.footerTitle}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <Text
              style={styles.link}
              onPress={() => {
                props.navigation.navigate("Login");
              }}
            >
              Log in.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTop: { display: "flex", flex: 1, justifyContent: "flex-start" },
  sectionMiddle: { display: "flex", flex: 1, justifyContent: "center" },
  sectionBottom: { display: "flex", flex: 1, justifyContent: "flex-end" },
  container: {
    flex: 1,
    display: "flex",
  },
  inputItem: { marginBottom: 15, marginLeft: 25, marginRight: 25 },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: colors.gray1,
    padding: 15,
  },
  footerTitle: {
    textAlign: "center",
  },
  link: {
    color: colors.black,
    fontWeight: "600",
    marginTop: 50,
  },
  avatarImg: {
    width: "100%",
    height: "50%",
  },
  loginText: {
    color: colors.gray,
  },
});

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(RegisterScreen as any);
