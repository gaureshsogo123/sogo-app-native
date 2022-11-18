import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
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

export default function OrderReport({ route, navigation }) {

  const data = [
    {inm:"dosa batterr",Qty:20,price:200},
    {inm:"Chapati",Qty:30,price:300},
    {inm:"Ata", Qty:20,price:200}
  ]
  
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
            <Text style={{marginTop:-10,marginBottom:5}}>Total : Rs.1000</Text>
                <View style={styles.reportHead}>
                    <Text style={{width:'auto'}}>Item Name</Text>
                    <Text style={{width:'auto'}}>Qty</Text>
                    <Text>Amount</Text>
                </View>


                <>
                    {
                        data.map((itm,i)=>{
                            return (
                                <View style={styles.reportdata} key={i}>
                                    <Text>{itm.inm}</Text>
                                    <Text>{itm.Qty}</Text>
                                    <Text>{itm.price}</Text>
                                </View>
                            )
                        })
                    }
                </>
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
  reportHead:{
    display:"flex",
    flexDirection:"row",
    justifyContent:'space-around',
    width:"100%",
    padding:10,
    backgroundColor:"lightgray"
  },
  reportdata:{
    display:'flex',
    flexDirection:"row",
    justifyContent:"space-around",
    width:'100%',
    backgroundColor:"#fafafa",
    padding:10
  }
});
