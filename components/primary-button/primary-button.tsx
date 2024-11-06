import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

interface PrimaryButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;

  disabled?: boolean;
}

const PrimaryButton = ({ title, onPress, disabled }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled} activeOpacity={0.8} onPress={onPress}>
      <View style={{...styles.button,opacity: disabled ? 0.8 : 1}}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.green,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
    textAlign: "center",
  },
});
