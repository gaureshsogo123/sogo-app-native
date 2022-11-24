import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextInput, Text, Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import DatePicker from "../../../component/DatePicker";
import CitySmallFilter from "../../../component/CitySmallFilter";
import StatusFilter from "../../../component/StatusFilter";
import { useAuthContext } from "../../../contexts/authContext";
import { getOrders } from "../helpers/ordersHelper";
import statuses from "../../../constants/statusOptions";

function formatDate(string) {
  const date = new Date(string);
  return `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  }-${date.getFullYear()}`;
}

function oneMonthAgo() {
  let date = new Date();
  if (date.getMonth === 0) {
    date.setMonth(11);
    date.setFullYear(date.getFullYear() - 1);
  } else date.setMonth(date.getMonth() - 1);
  return date;
}

export default function Orders({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState(oneMonthAgo());
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("");
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
    return orders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchFilter.toLowerCase()) &&
        (status === "All" ||
          status === "" ||
          order.orderstatus.toLowerCase() === status.toLowerCase()) &&
        new Date(order.orderdate) >= startDate &&
        new Date(order.orderdate) <= endDate
    );
  }, [orders, searchFilter, startDate, endDate, status]);

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
          <TextInput
            style={styles.input}
            value={searchFilter}
            onChangeText={(text) => setSearchFilter(text)}
            placeholder="Search Retailers"
          />
          {showFilters && (
            <>
              <View style={styles.datecontainer}>
                <Text
                  variant="titleMedium"
                  style={{ textAlignVertical: "center" }}
                >
                  From:{" "}
                </Text>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                  text={"From"}
                  showFlag={true}
                />
                <Text
                  variant="titleMedium"
                  style={{ textAlignVertical: "center" }}
                >
                  To:{" "}
                </Text>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                  text={"To"}
                  showFlag={true}
                />
              </View>

              <View>
                <View style={styles.newlocationcontainer}>
                  {/* <Text
                    variant="titleMedium"
                    style={{ textAlignVertical: "center" }}
                  >
                    Location :
                  </Text>
                  <View style={{ marginTop: -10, marginBottom: 5 }}>
                    {<CitySmallFilter />}
                  </View> */}
                </View>
                <View style={styles.locationcontainer}>
                  <Text
                    variant="titleMedium"
                    style={{ textAlignVertical: "center" }}
                  >
                    Status :
                  </Text>
                  <View style={{ marginTop: -10, marginBottom: 5 }}>
                    <StatusFilter options={statuses} setValue={setStatus} />
                  </View>
                </View>
              </View>
            </>
          )}
          <Button
            mode="contained"
            onPress={() => setShowFilters(!showFilters)}
            style={{ borderRadius: 3 }}
          >
            {showFilters ? "HIDE FILTERS" : "SHOW FILTERS"}{" "}
          </Button>
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
  pagecontainer: {
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: 5,
  },
  datecontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
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
