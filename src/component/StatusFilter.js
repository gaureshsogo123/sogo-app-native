import React from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

function StatusFilter({ options, setValue }) {
  return (
    <View>
      <SelectList
        setSelected={(val) => setValue(val)}
        data={options}
        save="value"
        boxStyles={{ borderWidth: 0, borderBottomWidth: 1 }}
      />
    </View>
  );
}

export default StatusFilter;
