import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./NearByNavigator";
import { ApplicationState } from "../store";
import { actionCreators as authActionCreator, AuthState } from "../store/auth";
import LoginScreen from "../screens/LoginScreen";
import { getData } from "../utiles/secureStore";
import RegisterScreen from "../screens/RegisterScreen";
const RootNavigationStack = createStackNavigator();
type navigatorContainerProps = AuthState & any;
const NearByNavigationContainer = (props: navigatorContainerProps) => {
  const checkForToken = async () => {
    const userData = await getData("UserData");
    if (userData) {
      props.setAuthData(JSON.parse(userData));
    }
  };

  useEffect(() => {
    checkForToken();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigationStack.Navigator>
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
            name="TabNavigator"
            component={TabNavigator}
          />
        )}
      </RootNavigationStack.Navigator>
    </NavigationContainer>
  );
};

// export default NavigationContainer;

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authActionCreator }
)(NearByNavigationContainer as any);
