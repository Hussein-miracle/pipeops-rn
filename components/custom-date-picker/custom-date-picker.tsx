import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import React, { Fragment, useState } from "react";
import { CalendarIcon } from "../icons";
import { Colors } from "@/constants/Colors";

interface CustomDatePickerProps {
  selectedDate?: Date | null;
  onSelectDate?: (d: Date | undefined) => void;
  placeholder?: string;
}

const CustomDatePicker = ({
  selectedDate,
  onSelectDate,
  placeholder,
}: CustomDatePickerProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      onSelectDate?.(selectedDate);
    }
  };

  const showModeAndoid = (currentMode: "date" = "date") => {
    DateTimePickerAndroid.open({
      value: selectedDate as Date,
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: "calendar",
    });
  };

  return (
    <Fragment>
      <Pressable
        focusable={true}
        style={{
          ...styles.dateButton,
          borderColor: isFocused ? Colors.green : "transparent",
          backgroundColor: isFocused ? "#fff" : "#F5F5F5",
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        onPress={() => {
          if (Platform.OS === "android") {
            showModeAndoid();
            setIsFocused(true)
          } else {
            setShow(!show);
            setIsFocused(!isFocused);
          }
        }}
      >
        <Text  style={{ color: Colors.text, fontWeight: "500", fontSize: 14 }}>
          {" "}
          {selectedDate
            ? new Date(selectedDate).toLocaleDateString()
            : placeholder ?? "Select Date"}
        </Text>

        <CalendarIcon width={24} height={24} />
      </Pressable>
      {show && Platform.OS === "ios" && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDate as Date}
          mode={"date"}
          display="spinner"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 8,
    minHeight: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default CustomDatePicker;
