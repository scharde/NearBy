import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "../constants/Colors";

interface IPrimaryButton {
  buttonBg?: string;
  textColor?: string;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: any;
}

type IPrimaryButtonProps = IPrimaryButton;
const PrimaryButton = (props: IPrimaryButtonProps) => {
  const {
    buttonBg,
    textColor,
    label: textLabel,
    isLoading,
    disabled,
    onPress,
  } = props;

  const buttonBackground = buttonBg || colors.primary;
  return (
    <View style={[styles.container, disabled ? styles.disabled : {}]}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: buttonBackground }]}
        disabled={disabled}
        onPress={onPress}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          <Text style={[styles.text, { color: textColor || colors.secondary }]}>
            {textLabel}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  disabled: { opacity: 0.5 },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  text: {
    color: colors.secondary,
    textAlign: "center",
  },
});

export default PrimaryButton;
