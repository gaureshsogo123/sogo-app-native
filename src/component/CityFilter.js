import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

function CityFilter({ cities, setCity }) {
  return (
    <View>
      <SelectList
        setSelected={(val) => setCity(val.toLowerCase())}
        data={cities}
        save="value"
        boxStyles={{ marginBottom: 20 }}
      />
    </View>
  );
}

export default CityFilter;
