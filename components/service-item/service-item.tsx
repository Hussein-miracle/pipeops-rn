import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import CueBall from "../cue-ball/cue-ball";
import { moderateScale } from "@/lib/utils";

interface ServiceItemProps {
  selected?: boolean;
  onPress?: () => void;
  title: string;
  description: string;
}

const ServiceItem = ({
  title,
  description,
  selected,
  onPress,
}: ServiceItemProps) => {
  return (
    <Pressable
      style={{
        ...styles.serviceItemContainer,
        backgroundColor: selected ? Colors.green : Colors.grey,
      }}
      onPress={onPress}
    >
      <CueBall enabled={selected}/>
      <View style={styles.serviceItem}>
        <Text
          style={{
            ...styles.serviceItemTitle,
            color: selected ? "#fff" : Colors.text,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            ...styles.serviceItemDesc,
            color: selected ? "#fff" : Colors.text,
          }}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  serviceItem: {
    justifyContent: "space-between",
    gap: 10,
  },
  serviceItemTitle: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 17,
    color: Colors.text,
  },
  serviceItemDesc: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
  },
  serviceItemContainer: {
    height: 154,
    width: (Dimensions.get("screen").width - 40) * 0.5 - 10,
    borderRadius: 8,
    backgroundColor: Colors.grey,
    paddingVertical: 14,
    paddingHorizontal: 10,
    rowGap: 15,
    // justifyContent: "space-between",
    // width:"100%"
  }
});
