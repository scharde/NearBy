import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";
import { colors } from "../constants/Colors";

interface inputProps {
  containerStyle?: any;
  inputStyle?: any;
}
type IInputProps = TextInputProps & inputProps;

const PrimaryInputForm = (props: IInputProps) => {
  return (
    <View style={{ ...styles.formControl, ...props.containerStyle }}>
      <TextInput {...props} style={{ ...styles.input, ...props.inputStyle }} />
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    display: "flex",
  },
  input: {
    backgroundColor: colors.gray1,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 5,
    height: 50,
    paddingLeft: 15,
  },
});

export default PrimaryInputForm;
