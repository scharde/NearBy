import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HeaderBackButton } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Keys from "../constants/Keys";
import TabNavigator from "./NearByNavigator";
import { ApplicationState } from "../store";
import { actionCreators as authActionCreator, AuthState } from "../store/auth";
import LoginScreen from "../screens/LoginScreen_Nearby";
// import LoginScreen from "../screens/LoginScreen";
import { getData, saveData } from "../utiles/secureStore";
import RegisterScreen from "../screens/RegisterScreen";
const RootNavigationStack = createStackNavigator();
type navigatorContainerProps = AuthState & any;
const NearByNavigationContainer = (props: navigatorContainerProps) => {
  const checkForToken = async () => {
    const userData = await getData(Keys.UserData);

    if (!userData) {
      return;
    }
    const transformedData = JSON.parse(userData!);
    const { token, userId, expiryDate } = transformedData;
    const expirationDate = new Date(expiryDate);
    if (expirationDate <= new Date() || !token || !userId) {
      await saveData(Keys.UserData, null);
      return;
    }

    if (userData) {
      props.setAuthData(JSON.parse(userData));
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigationStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!props.authData.token ? (
          <>
            <RootNavigationStack.Screen name="Login" component={LoginScreen} />
            <RootNavigationStack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        ) : (
          <RootNavigationStack.Screen
            options={{
              title: "Near By",
              headerRight: (props) => (
                <HeaderBackButton
                  {...props}
                  onPress={() => {
                    // Do something
                  }}
                />
              ),
            }}
            name="TabNavigator"
            component={TabNavigator}
          />
        )}
      </RootNavigationStack.Navigator>
    </NavigationContainer>
  );
};

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(NearByNavigationContainer as any);
