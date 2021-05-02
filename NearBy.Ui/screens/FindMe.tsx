import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import * as Location from "expo-location";

const FindMe = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <TouchableOpacity>
        <Text>Find me page</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default FindMe;
