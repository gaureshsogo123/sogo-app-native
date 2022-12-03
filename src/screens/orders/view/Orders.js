import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import { TextInput, Text, Button, HelperText } from "react-native-paper";
import { format, subDays } from "date-fns";
import DatePicker from "../../../component/DatePicker";
import StatusFilter from "../../../component/StatusFilter";
import { useAuthContext } from "../../../contexts/authContext";
import { getOrders } from "../helpers/ordersHelper";
import statuses from "../../../constants/statusOptions";
import UpdateOrderStatus from "./UpdateOrderStatus";
import { AntDesign } from "@expo/vector-icons";

export default function Orders({ navigation }) {
  const { user } = useAuthContext();
  const [refreshing, setRefreshing] = useState(true);

  const [orders, setOrders] = useState([]);
  const [editStatusData, setEditStatusData] = useState({});

  const [searchFilter, setSearchFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [startDate, setStartDate] = useState(subDays(new Date(), 2));
  const [endDate, setEndDate] = useState(new Date());
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});

  const [visible, setVisible] = useState(false);

  const showUpdateStatus = (orderid, currentStatus) => {
    setEditStatusData({ ...editStatusData, orderid: orderid, currentStatus });
    setVisible(true);
  };
  const hideUpdateStatus = () => {
    setEditStatusData({});
    setVisible(false);
  };

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, [user?.userId]);

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const result = await getOrders(user.userId);
      if (result.data) {
        setOrders(result.data);
        setEndDate(new Date());
        setErrors({ ...errors, getOrders: "" });
      } else setErrors({ ...errors, getOrders: "Failed to fetch orders" });
    } catch (error) {
      setErrors({ ...errors, getOrders: "Failed to fetch orders" });
    } finally {
      setRefreshing(false);
    }
  };

  const redirectToUpdate = (order) => {
    navigation.navigate("UpdateOrder", { order: order });
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
      <TouchableOpacity onPress={() => redirectToUpdate(item)}>
        <View style={styles.listcontainer}>
          <Text
            variant="titleMedium"
            style={{ fontWeight: "600", paddingBottom: 10, width: "60%" }}
          >
            {item.name}
          </Text>
          <View style={styles.leftitems}>
            <Text>
              Order Date : {format(new Date(item.orderdate), "dd-MM-yyyy")}
            </Text>
          </View>
          <View style={styles.rightitems}>
            <Text style={{ paddingTop: 10, paddingBottom: 10 }}>
              Amt : {`\u20B9`} {parseFloat(item.totalamount).toFixed(2)}
            </Text>
            <Text style={{ textAlignVertical: "center" }}>
              Status :{" "}
              <Text
                onPress={() => showUpdateStatus(item.orderid, item.orderstatus)}
                style={{ padding: 5 }}
              >
                {item.orderstatus}
              </Text>
              <AntDesign size={10} name="caretdown" color="gray" />
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

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
          {errors.getOrders && (
            <HelperText visible={errors.getOrders} type="error">
              {errors.getOrders}{" "}
            </HelperText>
          )}
          <Button
            mode="contained"
            onPress={() => setShowFilters(!showFilters)}
            style={{ borderRadius: 3 }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}{" "}
          </Button>
        </View>
      </View>
      <FlatList
        data={filteredOrders}
        renderItem={renderOrder}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchOrders()}
          />
        }
      />
      <UpdateOrderStatus
        value={editStatusData}
        hideModal={hideUpdateStatus}
        setOrders={setOrders}
        visible={visible}
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
    minHeight: 100,
    backgroundColor: "#fafafa",
    borderRadius: 10,
    marginLeft: "3%",
    padding: 10,
    marginBottom: "3%",
    position: "relative",
    borderWidth: 1,
    borderColor: "silver",
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
  popup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
  },
});
