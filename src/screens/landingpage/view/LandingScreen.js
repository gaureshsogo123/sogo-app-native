import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Text, HelperText } from "react-native-paper";
import CityFilter from "../../../component/CityFilter";
import { useAuthContext } from "../../../contexts/authContext";
import { getRetailers } from "../helpers/landingPageHelper";

export default function LandingScreen({ navigation }) {
  const [retailers, setRetailers] = useState([]);
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});
  const [filterText, setFilterText] = useState("");

  const cities = [
    { key: "1", value: "Mumbai" },
    { key: "2", value: "Delhi" },
    { key: "3", value: "Chennai" },
    { key: "4", value: "Kerla" },
    { key: "5", value: "Madgaon" },
  ];
  const { user } = useAuthContext();

  useEffect(() => {
    const getStores = async () => {
      getRetailers()
        .then((data) => setRetailers(data))
        .catch(() =>
          setErrors({ ...errors, retailers: "Couldn't get retailers" })
        );
    };
    getStores();
  }, []);

  const handlePress = (item) => {
    navigation.navigate(`salesorder`, {
      retailerName: item.name,
      retailerId: item.id,
    });
  };

  const filteredRetailers = useMemo(() => {
    return (
      retailers &&
      retailers.filter(
        (retailer) =>
          filterText === "" || retailer.name.toLowerCase().includes(filterText) //&&
        //retailer.city.toLowerCase() === city
      )
    );
  }, [filterText, city]);

  const renderRetailer = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.name)}>
        <View style={styles.list}>
          <Text variant="titleSmall">{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.pagecontainer}>
          <Text
            style={{ fontWeight: "700", fontSize: 18, paddingBottom: "5%" }}
          >
            {user && user.name}
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={{ color: "white", fontSize: 15 }}>
              Select Customer
            </Text>
          </TouchableOpacity>
          <Text style={{ paddingBottom: 4, fontWeight: "600", fontSize: 15 }}>
            Select City
          </Text>
          <CityFilter cities={cities} setCity={setCity} />
          <TextInput
            style={styles.input}
            placeholder="Search Customers"
            onChangeText={(text) => setFilterText(text.toLowerCase())}
          />
          <HelperText type="error" visible={errors.retailers}>
            {errors.retailers}{" "}
          </HelperText>
        </View>
      </View>

      <FlatList data={filteredRetailers} renderItem={renderRetailer} />
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
    marginLeft: "3%",
    backgroundColor: "#fafafa",
    borderColor: "silver",
    borderWidth: 1,
  },
});
