import React from "react";
import { Pressable, TouchableWithoutFeedback, View } from "react-native";
import { CheckBoxDefaultIcon, CheckBoxSelectedIcon } from "../icons";

interface CheckBoxProps {
  checked?: boolean;
  onPress?: (checked?: boolean) => void;
  size?: number;
}

const CheckBox = ({ checked, onPress, size = 24 }: CheckBoxProps) => {
  return (
    <View>
      {checked === true ? (
        <CheckBoxSelectedIcon width={size} height={size} />
      ) : (
        <CheckBoxDefaultIcon width={size} height={size} />
      )}
    </View>
  );
};

export default CheckBox;
