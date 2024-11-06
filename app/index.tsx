import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useMemo, useState } from "react";
import { moderateScale } from "@/lib/utils";
import { Colors } from "@/constants/Colors";
import PrimaryButton from "@/components/primary-button/primary-button";
import ServiceItem from "@/components/service-item/service-item";
import { lgas, serviceItems, serviceTimes } from "@/data";
import { Service, Period } from "@/lib/types";
import ServicePeriod from "@/components/service-period/service-period";
import CheckBox from "@/components/check-box/check-box";
import BoxSelect from "@/components/box-select/box-select";
import CustomSelect from "@/components/custom-select/custom-select";
import CustomDatePicker from "@/components/custom-date-picker/custom-date-picker";

const HomePage = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null);
  const [selectedLGA, setSelectedLGA] = useState<string | number | undefined>(
    undefined
  );
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedFlexibility, setSelectedFlexibility] = useState<
    "ondate" | "flexible" | undefined
  >();

  const [timeOfDayRequired, setTimeOfDayRequired] = useState<boolean>(false);

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
  };

  const allowProceed = useMemo(() => {
    return false;
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.body}>
          <Text style={styles.title}>Location & Date</Text>
          <Text style={styles.subtitle}>
            Select the category that best fits your needs.
          </Text>

          <View style={styles.content}>
            <View style={styles.serviceItemList}>
              {serviceItems.map((serviceItem) => {
                return (
                  <ServiceItem
                    selected={selectedService?.id === serviceItem.id}
                    key={serviceItem.id}
                    title={serviceItem.title}
                    description={serviceItem.description}
                    onPress={() => {
                      handleSelectService(serviceItem);
                    }}
                  />
                );
              })}
            </View>

            <View style={{ gap: 4 }}>
              <Text>Where do you want the task done?</Text>

              <CustomSelect
                options={lgas}
                placeholder="Local Government"
                selectedValue={selectedLGA}
                onSelect={(value) => {
                  setSelectedLGA(value);
                }}
                labelKey={"label"}
                valueKey={"value"}
              />
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              ></View>
            </View>

            <View style={{ gap: 4 }}>
              <Text>When do you need this done?</Text>
              <View
                style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
              >
                <BoxSelect
                  title={"On date"}
                  checked={selectedFlexibility === "ondate"}
                  onPress={() => {
                    if (selectedFlexibility === "ondate") {
                      setSelectedFlexibility(undefined);
                      return;
                    }
                    setSelectedFlexibility("ondate");
                  }}
                />
                <BoxSelect
                  title="I'm flexible"
                  checked={selectedFlexibility === "flexible"}
                  onPress={() => {
                    if (selectedFlexibility === "flexible") {
                      setSelectedFlexibility(undefined);
                      return;
                    }
                    setSelectedFlexibility("flexible");
                  }}
                />
              </View>
            </View>

            {selectedFlexibility === "ondate" && (
              <CustomDatePicker
                selectedDate={selectedDate}
                onSelectDate={(value) => {
                  if(value){
                    setSelectedDate(value);
                  }
                }}
              />
            )}
            {!!selectedFlexibility && (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
                onPress={() => {
                  setTimeOfDayRequired(!timeOfDayRequired);
                }}
              >
                <CheckBox checked={timeOfDayRequired} />
                <Text>I need a certain time of day</Text>
              </Pressable>
            )}

            {timeOfDayRequired && (
              <View style={{ gap: 10 }}>
                {serviceTimes.map((item) => {
                  return (
                    <ServicePeriod
                      selected={selectedPeriod?.id === item.id}
                      key={item?.id}
                      image={item?.imageUrl}
                      period_start={item?.start}
                      period_end={item?.end}
                      period={item?.title}
                      icon={item?.icon}
                      onPress={() => {
                        setSelectedPeriod(item);
                      }}
                    />
                  );
                })}
              </View>
            )}
          </View>

          <View style={{ marginTop: 107 }}>
            <PrimaryButton title="Continue" disabled={!allowProceed} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 56,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  body: {
    // justifyContent: "space-between",
    height: "100%",
  },
  content: {
    marginTop: 40,

    gap: 20,
  },
  title: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: "700",
    lineHeight: 29,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "400",
    lineHeight: 19,
  },
  serviceItemList: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 4,
  },
  periodList: {
    width: "100%",
    justifyContent: "space-between",
    gap: 10,
  },
});
export default HomePage;
