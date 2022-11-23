import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "../../../component/DatePicker";
import CitySmallFilter from "../../../component/CitySmallFilter";
import StatusFilter from "../../../component/StatusFilter";
import { useAuthContext } from "../../../contexts/authContext";
import { getOrders } from "../helpers/ordersHelper";

function formatDate(string) {
  const date = new Date(string);
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getFullYear()}`;
}

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [errors, setErrors] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      try {
        const result = await getOrders(user.userId);
        if (result.data) setOrders(result.data);
        else setErrors({ ...errors, getOrders: "Failed to fetch orders" });
      } catch (error) {
        setErrors({ ...errors, getOrders: "Failed to fetch orders" });
      }
    };
    fetchOrders();
  }, [user?.userId]);

  const redirectToUpdate = (order) => {
    navigation.navigate("salesorder", { update: true, order: order });
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) =>
      order.name.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [orders, searchFilter]);

  const renderOrder = useCallback(({ item }) => {
    return (
      <View style={styles.listcontainer}>
        <Text
          variant="titleMedium"
          style={{ fontWeight: "600", paddingBottom: 10, width: "60%" }}
        >
          {item.name}
        </Text>
        <View style={styles.leftitems}>
          <Text variant="titleSmall">{formatDate(item.orderdate)}</Text>
          <Text variant="titleSmall"> Status: {item.orderstatus}</Text>
        </View>
        <View style={styles.rightitems}>
          <Text style={{ paddingTop: 10 }}>
            Amt : {`\u20B9`} {item.totalamount}
          </Text>
          <TouchableOpacity style={{ display: "flex", alignItems: "flex-end" }}>
            <AntDesign
              onPress={() => redirectToUpdate(item)}
              name="edit"
              size={35}
              style={{ paddingTop: 10, paddingRight: 10 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  });

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

          <TextInput
            style={styles.input}
            value={searchFilter}
            onChangeText={(text) => setSearchFilter(text)}
            placeholder="Search Retailers"
          />

          <View
            style={{ width: "100%", borderBottomWidth: 1, marginTop: 10 }}
          ></View>
        </View>
      </View>
      <FlatList data={filteredOrders} renderItem={renderOrder} />
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
  leftitems: {
    width: "60%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
});
