import React from "react";
import { ViewStyle, View } from "react-native";

type SpacerProps = {
  size: number;
  axis?: "horizontal" | "vertical";
  style?: ViewStyle;
};

const Spacer = ({ size, axis = "vertical", style = {} }: SpacerProps) => {
  const width = axis === "vertical" ? 2 : size;
  const height = axis === "horizontal" ? 2 : size;
  return (
    <View
      style={{
        backgroundColor: "transparent",
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...style,
      }}
    />
  );
};

export default Spacer;
