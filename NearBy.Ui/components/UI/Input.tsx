import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
} from "react-native";

interface inputProps {
  label: string;
  id: string;
  errorText: string;
  style?: any;
}
type IInputProps = TextInputProps & inputProps;

const Input = (props: IInputProps) => {
  const [inputState, setInputState] = useState({
    value: "",
    isValid: true,
    touched: true,
  });
  return (
    <View style={{ ...styles.formControl, ...props.style }}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "red",
    fontSize: 13,
  },
});

export default Input;
