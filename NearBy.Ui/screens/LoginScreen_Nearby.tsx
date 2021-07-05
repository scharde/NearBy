import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { connect } from "react-redux";

import Input from "../components/PrimaryInputForm";
import { colors } from "../constants/Colors";
import { ApplicationState } from "../store";
import {
  actionCreators as authActionCreator,
  AuthState,
  IAuthUserData,
} from "../store/auth";
import { ILoginProps } from "../service/AuthService";
import { login } from "../service/AuthService";
import NearbyModal from "../components/NearbyModal";
import PrimaryButton from "../components/PrimaryButton";

type LoginScreenProps = AuthState &
  typeof authActionCreator & { navigation: any };

const LoginScreen = (props: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isModalVisible, setModelVisibility] = useState(false);

  useEffect(() => {
    if (props.authData.token) {
      props.navigation.navigate("Home");
    }
  }, [props.authData.token]);

  useEffect(() => {
    setBtnDisabledProp();
  }, [username]);

  useEffect(() => {
    setBtnDisabledProp();
  }, [password]);

  const setBtnDisabledProp = () => {
    setBtnDisabled(!(username !== "" && password !== ""));
  };

  const loginAction = async () => {
    setIsLoading(true);
    login({ username, password } as ILoginProps)
      .then((result) => {
        props.loginSuccessAction(result.data as IAuthUserData);
        setIsLoading(false);
      })
      .catch((error) => {
        setModelVisibility(true);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionTop}></View>
      <View style={styles.sectionMiddle}>
        <View>
          <Image
            resizeMode={"contain"}
            style={styles.nearbyLogo}
            source={require("../assets/images/instagramLogo.png")}
          />
        </View>
        <View style={styles.inputItem}>
          <Input
            placeholder="E-Mail"
            autoFocus
            keyboardType="email-address"
            autoCapitalize="none"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <Input
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputItem}>
          <PrimaryButton
            buttonBg={colors.primary}
            textColor={colors.secondary}
            label={"Log In"}
            isLoading={isLoading}
            disabled={btnDisabled}
            onPress={loginAction}
          />
        </View>
      </View>
      <View style={styles.sectionBottom}>
        <View style={styles.bottomContainer}>
          <Text style={styles.footerTitle}>
            <Text style={styles.noAccount}>Don't have an account?</Text>{" "}
            <Text
              style={styles.link}
              onPress={() => {
                props.navigation.navigate("Register");
              }}
            >
              Sign up.
            </Text>
          </Text>
        </View>
      </View>
      <NearbyModal
        isVisible={isModalVisible}
        headerText="Error In Log In"
        bodyText="Username or password is incorrect. Please try again."
        onDismiss={() => {
          setModelVisibility(false);
        }}
      ></NearbyModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flex: 1 },
  sectionTop: { display: "flex", flex: 1, justifyContent: "flex-start" },
  sectionMiddle: { display: "flex", flex: 1, justifyContent: "center" },
  sectionBottom: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
  },
  inputItem: { marginBottom: 15, marginLeft: 25, marginRight: 25 },
  screen: {
    flex: 1,
  },
  nearbyLogo: {
    width: "100%",
    height: "50%",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  bottomContainer: {
    borderTopWidth: 1,
    borderColor: colors.gray1,
    padding: 15,
  },
  footerTitle: {
    textAlign: "center",
  },
  noAccount: {
    color: colors.gray,
  },
  link: {
    color: colors.black,
    fontWeight: "600",
  },
});

// export default LoginScreen;

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(LoginScreen as any);
