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
      if (!user) return;
      getRetailers(user.userId)
        .then((data) => {
          setRetailers(data);
        })
        .catch(() =>
          setErrors({ ...errors, retailers: "Couldn't get retailers" })
        );
    };
    getStores();
  }, [user?.userId]);

  const handlePress = (item) => {
    navigation.navigate(`salesorder`, {
      retailerName: item.name,
      retailerId: item.userid,
    });
  };

  const filteredRetailers = useMemo(() => {
    return (
      retailers &&
      retailers.filter(
        (retailer) =>
          filterText === "" || retailer.name.toLowerCase().includes(filterText)
      )
    );
  }, [filterText, city, retailers]);

  const renderRetailer = useCallback(({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
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
          <Text style={{ fontWeight: "700", fontSize: 18, paddingBottom: 3 }}>
            Select Customer
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Search Customers"
            onChangeText={(text) => setFilterText(text.toLowerCase())}
          />
         {/* <CityFilter cities={cities} setCity={setCity} /> */}
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
    marginBottom: 5,
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
