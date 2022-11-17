import React, { useState } from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { City } from "../CustomerPracticeApi";

function CitySmallFilter() {
  const [selected, setSelected] = useState("");
  const [city, setCity] = useState(City);

  return (
    <View>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={city}
        save="value"
        boxStyles={{ borderWidth: 0, borderBottomWidth: 1 }}
      />
    </View>
  );
}

export default CitySmallFilter;
