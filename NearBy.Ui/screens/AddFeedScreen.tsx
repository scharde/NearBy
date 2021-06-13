import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
  Text,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { connect } from "react-redux";
import Loader from "../components/Loader";

import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import { ApplicationState } from "../store";
import {
  actionCreators,
  AddFeedState,
  addFeedFieldEnum,
  ICheckboxUpdate,
  checkboxFieldEnum,
} from "../store/addFeeds";

type AddFeedScreenProps = AddFeedState & typeof actionCreators;
const AddFeedScreen = (props: AddFeedScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  if (isLoading) {
    return <Loader></Loader>;
  }

  const {
    sendNewFeeds,
    isCurrentLocation,
    isFeedSaved,
    inputChangeAction,
    checkboxUpdateAction,
  } = props;
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formInputs}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            value={props.title}
            onChangeText={(text) =>
              inputChangeAction({
                value: text,
                field: addFeedFieldEnum.title,
              })
            }
          />
          <Input
            id="message"
            label="Message"
            errorText="Please enter a valid message!"
            keyboardType="default"
            returnKeyType="next"
            value={props.message}
            onChangeText={(text) =>
              inputChangeAction({
                value: text,
                field: addFeedFieldEnum.message,
              })
            }
          />
          <Input
            id="city"
            label="City"
            errorText="Please enter a valid city!"
            keyboardType="default"
            returnKeyType="next"
            value={props.city}
            onChangeText={(text) =>
              inputChangeAction({
                value: text,
                field: addFeedFieldEnum.city,
              })
            }
          />
          <Input
            id="address"
            label="Detail Address"
            errorText="Please enter a valid Address!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            value={props.address}
            onChangeText={(text) =>
              inputChangeAction({
                value: text,
                field: addFeedFieldEnum.address,
              })
            }
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isCurrentLocation}
              onValueChange={(newValue) => {
                checkboxUpdateAction({
                  value: newValue,
                  field: checkboxFieldEnum.isCurrentLocation,
                } as ICheckboxUpdate);
              }}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxLabel}>
              Is this your current location?
            </Text>
          </View>
        </View>
        <View style={styles.submitBtn}>
          <Button title="Submit" onPress={sendNewFeeds} />
        </View>
      </View>

      {isFeedSaved ? (
        <View>
          <Text>Congrats, Your feed saved!</Text>
        </View>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
  formInputs: {},
  submitBtn: {},
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
  },
  checkbox: {},
  checkboxLabel: {
    paddingTop: 5,
    fontFamily: "open-sans-bold",
  },
});

// export default AddFeedScreen;

export default connect(
  (state: ApplicationState) => {
    return { ...state.addFeedState };
  },
  { ...actionCreators }
)(AddFeedScreen as any);
