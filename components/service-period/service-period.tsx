import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { ReactNode } from "react";
import { Colors } from "@/constants/Colors";
import CueBall from "../cue-ball/cue-ball";
import { SvgProps } from "react-native-svg";

interface ServicePeriodProps {
  image?: string;
  selected?: boolean;
  icon?: (props: SvgProps) => ReactNode;
  period?: string;
  period_start?: string;
  period_end?: string;
  onPress?: () => void;
}

const ServicePeriod = ({ image, selected, ...props }: ServicePeriodProps) => {
  return (
    <Pressable
      style={{
        ...styles.servicePeriod,
        backgroundColor: selected ? Colors.green : Colors.grey,
      }}
      onPress={props?.onPress}
    >
      <View style={styles.periodImageContainer}>
        {!!props?.icon && (
          <props.icon fill={selected ? Colors.green : Colors.text} />
        )}
      </View>
      <View style={styles.content}>
        <View style={styles.descBody}>
          <Text
            style={{ ...styles.title, color: selected ? "#fff" : Colors.text }}
          >
            {props?.period}
          </Text>

          <Text
            style={{
              ...styles.description,
              color: selected ? "#fff" : Colors.text,
            }}
          >
            The time range is&nbsp;{" "}
            <Text style={styles.periodRange}>
              {props?.period_start}&nbsp;to&nbsp;{props?.period_end}
            </Text>
          </Text>
        </View>

        <CueBall enabled={selected} />
      </View>
    </Pressable>
  );
};

export default ServicePeriod;

const styles = StyleSheet.create({
  servicePeriod: {
    width: "100%",
    backgroundColor: Colors.grey,
    height: 120,
    gap: 10,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
  },
  periodImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  periodImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  descBody: {
    alignItems: "flex-start",
    gap: 4,
  },
  periodRange: {
    fontWeight: "800",
    fontSize: 12,
    lineHeight: 16,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 17,
  },
  description: {
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 16,
  },
});
