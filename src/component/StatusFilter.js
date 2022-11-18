import React, { useState } from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { City } from "../CustomerPracticeApi";

function StatusFilter() {
  const status = [
    { key: "1", value: "Delivered" },
    { key: "2", value: "Placed" },
  ];

  const [selected, setSelected] = useState("");
  const [val, setVal] = useState(status);

  return (
    <View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={val}
        save="value"
        boxStyles={{ borderWidth: 0, borderBottomWidth: 1 }}
      />
    </View>
  );
}

export default StatusFilter;
