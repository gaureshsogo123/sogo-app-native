import React from "react";
import { SelectList } from "react-native-dropdown-select-list";

function CityFilter({ cities, setCity }) {
  return (
    <SelectList
      setSelected={(val) => setCity(val.toLowerCase())}
      placeholder="Select City"
      data={cities}
      save="value"
    />
  );
}

export default CityFilter;
