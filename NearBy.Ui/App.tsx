import "react-native-gesture-handler";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import NearByNavigationContainer from "./navigation/NavigatorContainer";

const store = configureStore();

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
          <NearByNavigationContainer />
        </SafeAreaView>
      </View>
    </Provider>
  );
};
export default App;
