import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
//import { Button, TextInput } from "react-native-paper";
//import DatePicker from "../../../component/DatePicker";
import Table from "../../../component/Table";

import { getOrderReport } from "../helper/OederReportHelper";
import { useAuthContext } from "../../../contexts/authContext";

export default function OrderReport() {
  const [date, setDate] = useState(new Date());
 // const [flag, setFlag] = useState(false);
  const [products, setProducts] = useState([]);

  const { user } = useAuthContext();
  let userId = user.userId;

  useEffect(() => {
    getOrderReport(userId, date).then((res) => {
      setProducts(res.data);
    });
  }, [userId, date]);

  return (
    <>
      {/* <View style={styles.container}>
        <View style={styles.pagecontainer}>
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

          {flag && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginBottom: "4%",
              }}
            >
              <View style={styles.locationcontainer}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 15,
                    textAlignVertical: "center",
                  }}
                >
                  Date :
                </Text>
                <View>
                  <DatePicker
                    date={date}
                    setDate={setDate}
                    text={"From"}
                    showFlag={true}
                  />
                </View>
              </View>
            </View>
          )}

          <Button
            onPress={() => setFlag(!flag)}
            mode="contained"
            style={{ borderRadius: 3 }}
          >
            {flag ? "Hide Filters" : "Show Filters"}
          </Button>

          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              marginTop: 15,
              marginBottom: 12,
              borderColor: "silver",
            }}
          ></View>
          <Text style={{ fontSize: 17, fontWeight: "600", marginLeft: "3%" }}>
            Total : Rs.2000
          </Text>
        </View>
      </View>*/}

      <ScrollView>
        <View style={styles.container}>
          <View style={styles.pagecontainer}>
            <Table products={products} />
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
  },
  input: {
    width: "100%",
    height: 50,
    marginBottom: "1%",
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
