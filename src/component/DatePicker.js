import React, { useState } from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

function DatePicker() {
  const [datePicker, setDatePicker] = useState(false);
  
const [flag,setFlag]=useState(false)
  const [date, setDate] = useState(new Date());
  function showDatePicker() {
    setDatePicker(true);
    
  };

  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
    setFlag(true)
  };
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  
  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={{ paddingLeft: 5 }}>{flag?`${day}/${month}/${year}`:"Select Date"}</Text>
        </TouchableOpacity>
        
        <TouchableOpacity  onPress={showDatePicker}>
          <AntDesign
            name="down"
            size={13}
            style={{ paddingLeft: 6, paddingTop: 3 }}
          />
        </TouchableOpacity>
      </View>

      {datePicker && (
  <DateTimePicker
    value={date}
    mode={'date'}
    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
    is24Hour={true}
    onChange={onDateSelected}
  
  />
)}

    </View>
  );
}

export default DatePicker;

