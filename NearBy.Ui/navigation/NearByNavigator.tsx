import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/location";
import AddFeedScreen from "../screens/AddFeedScreen";
import LoginScreen from "../screens/LoginScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  console.log("Tab navigator");
  const dispatch = useDispatch();
  dispatch(actionCreators.updateLocationAction());
  // useEffect(() => {
  //   dispatch(actionCreators.updateLocationAction());
  // }, [dispatch]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any = "ios-information-circle";

            if (route.name === "Home") {
              iconName = focused
                ? "ios-information-circle"
                : "ios-information-circle-outline";
            } else if (route.name === "Settings") {
              iconName = "ios-list";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={AddFeedScreen} />
        <Tab.Screen name="Login" component={LoginScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
export default TabNavigator;
