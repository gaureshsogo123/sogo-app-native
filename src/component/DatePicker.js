import React, { useState } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

function DatePicker() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Select date");

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fdate =
      tempDate.getDate() +
      "/" +
      (tempDate.getDate() + 1) +
      "/" +
      tempDate.getFullYear();
    setText(fdate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity onPress={() => showMode("date")}>
          <Text style={{ paddingLeft: 5 }}>{text}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showMode("date")}>
          <AntDesign
            name="down"
            size={13}
            style={{ paddingLeft: 6, paddingTop: 3 }}
          />
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

export default DatePicker;

<Button onPress={() => showMode("date")} uppercase={false} mode="outlined">
  Select Date
</Button>;
