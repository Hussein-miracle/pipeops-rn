import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  TextInput,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TextInputEndEditingEventData,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";

type CustomTextInputProps = TextInputProps & {
  containerStyle?: ViewStyle;
  style?: TextInputProps["style"];
  onInputDone?: (text: string) => void;
};
const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (
    {
      containerStyle = {},
      style = {},
      onFocus,
      onBlur,
      value,
      onSubmitEditing,
      onEndEditing,
      onInputDone,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputText, setInputText] = useState(value ?? "");

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      onBlur?.(e);
      onInputDone?.(inputText);
    };

    // Method 1: Handle return key press
    const handleSubmitEditing = (
      e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
    ) => {
      onInputDone?.(inputText);
      onSubmitEditing?.(e);
    };

    // Method 2: Handle when input loses focus
    const handleEndEditing = (
      e: NativeSyntheticEvent<TextInputEndEditingEventData>
    ) => {
      onInputDone?.(inputText);
      onEndEditing?.(e);
    };

    const handleChangeText = (value: string) => {
      setInputText(value);
    };

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.container,
          ...containerStyle,
          borderColor: isFocused ? Colors.green : Colors.grey,
          backgroundColor: isFocused ? "#fff" : Colors.grey,
        }}
      >
        <TextInput
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={[styles.textInput, style]}
          onSubmitEditing={handleSubmitEditing}
          onEndEditing={handleEndEditing}
          ref={ref}
          onChangeText={handleChangeText}
          blurOnSubmit={true}

        />
      </View>
      </TouchableWithoutFeedback>
    );
  }
);

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 8,
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
  },
  textInput: {
    width: "100%",
    height: "100%",
  },
});
