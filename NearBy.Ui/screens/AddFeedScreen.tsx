import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import { connect } from "react-redux";

import Input from "../components/UI/Input";
import Colors from "../constants/Colors";
import { ApplicationState } from "../store";
import {
  actionCreators,
  AddFeedState,
  addFeedFieldEnum,
} from "../store/addFeeds";

type AddFeedScreenProps = AddFeedState & typeof actionCreators;
const AddFeedScreen = (props: AddFeedScreenProps) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const inputChangeHandler = (
    inputIdentifier: string,
    inputValue: string,
    inputValidity: string
  ) => {
    console.log(inputIdentifier, inputValue, inputValidity);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
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
              props.inputChangeAction({
                value: text,
                field: addFeedFieldEnum.title,
              })
            }
            // initialValue={editedProduct ? editedProduct.title : ''}
            // initiallyValid={!!editedProduct}
          />
          <Input
            id="message"
            label="Message"
            errorText="Please enter a valid message!"
            keyboardType="default"
            returnKeyType="next"
            value={props.message}
            onChangeText={(text) =>
              props.inputChangeAction({
                value: text,
                field: addFeedFieldEnum.message,
              })
            }
            // initialValue={editedProduct ? editedProduct.imageUrl : ''}
            // initiallyValid={!!editedProduct}
          />
          <Input
            id="city"
            label="City"
            errorText="Please enter a valid city!"
            keyboardType="default"
            returnKeyType="next"
            value={props.city}
            onChangeText={(text) =>
              props.inputChangeAction({
                value: text,
                field: addFeedFieldEnum.city,
              })
            }
          />
          <Input
            id="address"
            label="Address"
            errorText="Please enter a valid Address!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            value={props.address}
            onChangeText={(text) =>
              props.inputChangeAction({
                value: text,
                field: addFeedFieldEnum.address,
              })
            }
            // onInputChange={inputChangeHandler}
            // initialValue={editedProduct ? editedProduct.description : ''}
            // initiallyValid={!!editedProduct}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

// export default AddFeedScreen;

export default connect(
  (state: ApplicationState) => {
    return { ...state.addFeedState };
  },
  { ...actionCreators }
)(AddFeedScreen as any);
