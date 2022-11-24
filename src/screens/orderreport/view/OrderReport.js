import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import DatePicker from "../../../component/DatePicker";
import CitySmallFilter from "../../../component/CitySmallFilter";
import Table from "../../../component/Table";

function oneMonthAgo() {
  let date = new Date();
  if (date.getMonth === 0) {
    date.setMonth(11);
    date.setFullYear(date.getFullYear() - 1);
  } else date.setMonth(date.getMonth() - 1);
  return date;
}
export default function OrderReport({ route, navigation }) {
  const [startDate, setStartDate] = useState(oneMonthAgo());
  const [endDate, setEndDate] = useState(new Date());
  const data = [
    { inm: "dosa batterr", Qty: 20, price: 200 },
    { inm: "Chapati", Qty: 30, price: 300 },
    { inm: "Ata", Qty: 20, price: 200 },
  ];

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pagecontainer}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: "4%",
            }}
          >
            <View style={styles.locationcontainer}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>From :</Text>
              <View>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  text={"From"}
                  showFlag={true}
                />
              </View>
            </View>

            <View style={styles.locationcontainer}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>To :</Text>
              <View>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  text={"To"}
                  showFlag={true}
                />
              </View>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
            }}
          >
            <View style={styles.newlocationcontainer}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>
                Location :
              </Text>
              <View style={{ marginTop: -10, marginBottom: 5 }}>
                {<CitySmallFilter />}
              </View>
            </View>
          </View>

          <TextInput style={styles.input} placeholder="Search Retailers" />

          <View
            style={{ width: "100%", borderBottomWidth: 1, marginTop: 10 }}
          ></View>
        </View>
      </View>

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.pagecontainer}>
            <Table />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: "100%",
  },
  list: {
    width: "100%",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  pagecontainer: {
    width: "100%",
    padding: 10,
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: "5%",
    marginTop: "3%",
  },
  rightitems: {
    position: "absolute",
    right: 10,
  },
  listcontainer: {
    width: "95%",
    height: 100,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginLeft: "3%",
    padding: 10,
    marginBottom: "3%",
    position: "relative",
    borderColor: "silver",
    borderWidth: 1,
  },
  locationcontainer: {
    display: "flex",
    flexDirection: "row",
  },
  newlocationcontainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: "3%",
  },
  reportHead: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    backgroundColor: "lightgray",
  },
  reportdata: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#fafafa",
    padding: 10,
  },
});
