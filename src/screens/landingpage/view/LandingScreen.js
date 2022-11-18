import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import CityFilter from "../../../component/CityFilter";
import { CustomerPracticeApi } from "../../../CustomerPracticeApi";

export default function LandingScreen({ navigation }) {
  const [data, setData] = useState(CustomerPracticeApi);

  const handlePress = (item) => {
    navigation.navigate(`salesorder`, {
      retailerName: item.name,
      retailerId: item.id,
    });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.pagecontainer}>
          <Text
            style={{ fontWeight: "700", fontSize: 18, paddingBottom: "5%" }}
          >
            Vignesh Foods
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "white", fontSize: 15 }}>
              Select Customer
            </Text>
          </TouchableOpacity>
          <Text style={{ paddingBottom: 4, fontWeight: "600", fontSize: 15 }}>
            Select City
          </Text>
          <CityFilter />
          <TextInput style={styles.input} placeholder="Search Customers" />
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handlePress(item.name)}>
              <View style={styles.list}>
                <Text style={{ fontSize: 15, fontWeight: "600" }}>
                  {item.name}
                </Text>
              </View>
            </TouchableOpacity>
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
    width: "100%",
  },
  pagecontainer: {
    width: "100%",
    padding: 10,
  },
  btn: {
    width: "100%",
    padding: 20,
    backgroundColor: "darkblue",
    alignItems: "center",
    marginBottom: "5%",
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
  },
  list: {
    width: "95%",
    height: "auto",
    padding: 20,
    borderRadius: 15,
    marginBottom: "3%",
    alignItems: "center",
    marginLeft: "3%",
    backgroundColor: "#fafafa",
    borderColor: "silver",
    borderWidth: 1,
  },
});
