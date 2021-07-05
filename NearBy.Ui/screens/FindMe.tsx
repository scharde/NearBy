import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import * as Location from "expo-location";
import Input from "../components/PrimaryInputForm";
import { connect } from "react-redux";
import { ApplicationState } from "../store";
import { actionCreators as authactionCreators } from "../store/auth";

type FindMeScreenProps = typeof authactionCreators;
const FindMeScreen = (props: FindMeScreenProps) => {
  const [address, setAddress] = useState("");

  const getLocation = async () => {
    const geoLocation: any = await Location.geocodeAsync(address);
    console.log(geoLocation);
  };

  return (
    <View>
      <TouchableOpacity>
        <Text>Find me page</Text>
      </TouchableOpacity>
      <View>
        <Input
          id="address"
          placeholder="Address"
          errorText="Please enter a valid address!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          value={address}
          onChangeText={(text) => setAddress(text)}
        ></Input>
        <Button title="Get Location" onPress={getLocation}></Button>
      </View>
      <View style={styles.logoutBtn}>
        <Button
          title="Logout"
          onPress={() => props.requestLogoutAction()}
        ></Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  logoutBtn: {
    padding: 20,
  },
});

export default connect(
  (state: ApplicationState) => {
    return { ...state.authState };
  },
  { ...authactionCreators }
)(FindMeScreen as any);
