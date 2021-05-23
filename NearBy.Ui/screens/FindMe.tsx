import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert, Button } from "react-native";
import * as Location from "expo-location";
import Input from "../components/UI/Input";

const FindMeScreen = () => {
  const [address, setAddress] = useState("");
  

  const getLocation = async () => {
      const geoLocation: any =  await Location.geocodeAsync(address);
      console.log(geoLocation);
  }
 
  return (
    <View>
      <TouchableOpacity>
        <Text>Find me page</Text>
      </TouchableOpacity>
      <View>
        <Input id="address"
            label="Address"
            errorText="Please enter a valid address!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            value={address}
            onChangeText={(text) =>
              setAddress(text)
            }></Input>
            <Button title="Get Location" onPress={getLocation}></Button>
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

export default FindMeScreen;
