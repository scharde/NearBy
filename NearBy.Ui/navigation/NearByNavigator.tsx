import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { actionCreators } from "../store/location";
import AddFeedScreen from "../screens/AddFeedScreen";
import FindMeScreen from "../screens/FindMe";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionCreators.updateLocationAction());
  }, [dispatch]);

  return (
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="AddFeeds"
        component={AddFeedScreen}
        options={{ title: "Add Feed" }}
      />
      <Tab.Screen
        name="FindMe"
        component={FindMeScreen}
        options={{ title: "Find Me" }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
export default TabNavigator;
