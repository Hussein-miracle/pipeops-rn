import { Colors } from "@/constants/Colors";
import { convertToOptions } from "@/lib/utils";
import React, { useRef, useState } from "react";
import {
  FlatList,
  LayoutRectangle,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowUpDownIcon } from "../icons";

export interface CustomSelectProps {
  /** Add label string */
  label?: string;

  /** Add your options array -> send any type (example model: [{item:'',key:''}]) to converter to SelectOption > {label, value}*/
  options: any[];
  /** Add your selected state changer*/
  onSelect: (value: string | number) => void;
  /** Add your selected state value*/
  selectedValue?: string | number;
  /** Add your selected placeholder -> default is 'Select an option' */
  placeholder?: string;
  /** Define labelKey to options */
  labelKey: string;
  /** Define valueKey to options */
  valueKey: string;

    /**  hide or show the select arrow/chevron */
  showSelectIcon?:boolean;
}

/** Customizable Select Component :) options receive any data type and converter into label and value to render  */
const CustomSelect = ({
  label,
  options,
  onSelect,
  selectedValue,
  placeholder = "Select an option",
  labelKey,
  valueKey,
  showSelectIcon = true,
}: CustomSelectProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownPosition, setDropdownPosition] =
    useState<LayoutRectangle | null>(null);
  const selectButtonRef = useRef<TouchableOpacity>(null);

  const newOptions = convertToOptions(options, labelKey, valueKey);

  const handleSelect = (value: string | number) => {
    onSelect(value);
    setIsDropdownOpen(false);
    setIsFocused(false);
  };

  const openDropdown = () => {
    selectButtonRef.current?.measure((_fx, _fy, _w, _h, px, py) => {
      setDropdownPosition({
        x: px,
        y: py + _h,
        width: _w,
        height: _h,
      });
      setIsDropdownOpen(true);
      setIsFocused(true);
    });
  };

  return (
    <View style={{ gap: 3 }}>
      {label && <Text style={{}}>{label}</Text>}
      <TouchableOpacity
        ref={selectButtonRef}
        onPress={() => {
          openDropdown();
        }}
        style={{
          ...styles.selectButton,
          borderColor: isFocused ? Colors.green : "transparent",
          backgroundColor: isFocused ? "#fff" : "#F5F5F5",
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
      >
        <Text style={{ color: Colors.text, fontWeight: "500", fontSize: 14 }}>
          {selectedValue
            ? newOptions?.find((option) => option?.value === selectedValue)
                ?.label
            : placeholder}
        </Text>

{showSelectIcon &&        <ArrowUpDownIcon
          width={24}
          height={24}
          style={{
            transform: [{ rotate: isFocused ? "0deg" : "180deg" }],
            position: "absolute",
            top: 52 * 0.25,
            right: 10,
            pointerEvents: "none",
          }}
        />}
      </TouchableOpacity>

      {/* Dropdown modal */}
      {isDropdownOpen && dropdownPosition && (
        <Modal visible={isDropdownOpen} transparent animationType="none">
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              setIsDropdownOpen(false);
              setIsFocused(false);
            }}
          >
            <View
              style={{
                top: dropdownPosition.y - 25,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 8,
                elevation: 5,

                position: "absolute",
                backgroundColor: "#fff",
                shadowColor: "#000",
                padding: 4,
                borderRadius: 12,
              }}
            >
              <FlatList
                data={newOptions}
                keyExtractor={(item) => item.value.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item.value)}
                    style={{
                      padding: 8,
                      borderBottomWidth: 1,
                      borderBottomColor: Colors.grey,
                    }}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderRadius: 8,
    minHeight: 52,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CustomSelect;
