import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { TextInput, Text, HelperText } from "react-native-paper";
import { useAuthContext } from "../../../contexts/authContext";
import { getRetailers } from "../helpers/landingPageHelper";

export default function LandingScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(true);
  const [retailers, setRetailers] = useState([]);
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});
  const [filterText, setFilterText] = useState("");

  const { user } = useAuthContext();

  useEffect(() => {
    getStores();
  }, [user?.userId]);

  const getStores = async () => {
    if (!user) return;
    setRefreshing(true);
    getRetailers(user.userId)
      .then((data) => {
        setRetailers(data);
      })
      .catch(() =>
        setErrors({ ...errors, retailers: "Couldn't get retailers" })
      )
      .finally(() => {
        setRefreshing(false);
      });
  };

  const handlePress = (item) => {
    navigation.push(`CreateOrder`, {
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

  const retailerKeyExtractor = (item) => item.userid;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.pagecontainer}>
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              paddingBottom: 3,
              marginLeft: "3%",
            }}
            variant="titleMedium"
          >
            Select Customer
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Search Customers"
            onChangeText={(text) => setFilterText(text.toLowerCase())}
          />
          {/* <CityFilter cities={cities} setCity={setCity} /> */}
          {errors.retailers && (
            <HelperText type="error" visible={errors.retailers}>
              {errors.retailers}{" "}
            </HelperText>
          )}
        </View>
      </View>

      <FlatList
        keyExtractor={retailerKeyExtractor}
        data={filteredRetailers}
        renderItem={renderRetailer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => getStores()}
          />
        }
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
    marginBottom: 5,
    width: "100%",
    height: 50,
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
