import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  ReactPropTypes,
} from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { connect, useDispatch } from "react-redux";

import Input from "../components/UI/Input";
import Card from "../components/UI/Card";
import Colors from "../constants/Colors";
import { ApplicationState } from "../store";
import { actionCreators as authActionCreator, AuthState } from "../store/auth";

type LoginScreenProps = AuthState &
  typeof authActionCreator &
  ReactPropTypes &
  any;

const LoginScreen = (props: LoginScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  useEffect(() => {
    if (props.token) {
      props.navigation.navigate("Home");
    }
  }, [props.token]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              autoCapitalize="none"
              errorText="Please enter a valid password."
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={() => {
                    props.requestLoginAction({ username, password });
                  }}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  props.requestLoginAction({ username, password });
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

LoginScreen.navigationOptions = {
  headerTitle: "Add Feeds",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
});

// export default LoginScreen;

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(LoginScreen as any);
