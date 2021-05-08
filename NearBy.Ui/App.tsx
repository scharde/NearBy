import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import TabNavigator from "./navigation/NearByNavigator";

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
        <TabNavigator></TabNavigator>
    </Provider>
  );
};
export default App;
