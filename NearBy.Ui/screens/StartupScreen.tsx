import React, { useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StartupScreen = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }

      const transformedData = JSON.parse(userData);
      const { token, username, userId } = transformedData;
      //   const expirationDate = new Date(expiryDate);
      //   if (expirationDate <= new Date() || !token || !userId) {
      //     props.navigation.navigate('Auth');
      //     return;
      //   }
      //   const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch({
        type: "USER_AUTH_SUCCESS_ACTION",
        value: {
          username: username,
          token,
          userId,
        },
      });
      props.navigation.navigate("Home");
    };
    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large"></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

export default StartupScreen;
