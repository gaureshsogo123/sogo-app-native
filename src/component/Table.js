import React from "react";
import { View } from "react-native";
import { DataTable } from "react-native-paper";

function Table({products}) {
  
  return (
    <View>
      <DataTable>
        <View style={{ backgroundColor: "lightblue" }}>
          <DataTable.Header>
            <DataTable.Title>Item Name</DataTable.Title>
            <DataTable.Title numeric>Qty</DataTable.Title>
            <DataTable.Title numeric>Amount</DataTable.Title>
          </DataTable.Header>
        </View>
        {products.map((val, i) => {
          return (
            <View
              key={i}
              style={{
                backgroundColor: "#fafafa",
                borderWidth: 0.5,
                borderColor: "silver",
              }}
            >
              <DataTable.Row key={i}>
                <DataTable.Cell textStyle={{ fontWeight: "600" }}>
                  {val.productname}
                </DataTable.Cell>
                <DataTable.Cell numeric>{val.productquantity}</DataTable.Cell>
                <DataTable.Cell numeric>100</DataTable.Cell>
              </DataTable.Row>
            </View>
          );
        })}
      </DataTable>
    </View>
  );
}

export default Table;
