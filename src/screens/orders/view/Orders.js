import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import CityFilter from "../../../component/CityFilter";
import DatePicker from "../../../component/DatePicker";
import CitySmallFilter from "../../../component/CitySmallFilter";
import StatusFilter from "../../../component/StatusFilter";

export default function Orders({ route, navigation }) {
  const data = [
    { name: "Ganesh Stores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
    { name: "Krishna tores" },
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
                <DatePicker />
              </View>
            </View>

            <View style={styles.locationcontainer}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>To :</Text>
              <View>
                <DatePicker />
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
            <View style={styles.locationcontainer}>
              <Text style={{ fontWeight: "600", fontSize: 15 }}>Status :</Text>
              <View style={{ marginTop: -10, marginBottom: 5 }}>
                {<StatusFilter />}
              </View>
            </View>
          </View>

          <TextInput style={styles.input} placeholder="Search Retailers" />


          <View
            style={{ width: "100%", borderBottomWidth: 1, marginTop: 10 }}
          ></View>
        </View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.listcontainer}>
              <Text style={{ fontWeight: "600", paddingBottom: 10 }}>
                {item.name}
              </Text>
              <Text style={{ fontWeight: "400" }}>
                26 Oct Status : Delivered
              </Text>
              <View style={styles.rightitems}>
                <Text style={{ paddingTop: 10 }}>Amt : Rs.100</Text>
                <TouchableOpacity>
                  <AntDesign name="edit" size={25} style={{ paddingTop: 10 }} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
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
    marginTop:"3%"
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
    borderColor:"silver",
    borderWidth:1
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
});
