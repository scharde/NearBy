import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./screens/HomeScreen";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import configureStore from "./store/configureStore";

export default function App() {
  // Create browser history to use in the Redux store
  const baseUrl = document
    .getElementsByTagName("base")[0]
    .getAttribute("href") as string;
  const history = createBrowserHistory({ basename: baseUrl });

  // Get the application-wide store instance, prepopulating with state from the server where available.
  const store = configureStore(history);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <View style={styles.container}>
          <Home />
        </View>
      </ConnectedRouter>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
