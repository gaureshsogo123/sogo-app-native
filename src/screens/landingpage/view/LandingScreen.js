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
import { CustomerPracticeApi } from "../../../CustomerPracticeApi";

export default function LandingScreen({navigation}) {
    const [data,setData]=useState(CustomerPracticeApi)

    const handlePress = (name)=>{
      
      navigation.navigate("orders",{
        nm : name
      })
    }
  return (

        <View style={styles.container}>
      <View style={styles.pagecontainer}>
        <Text style={{ fontWeight: "700", fontSize: 18, paddingBottom: "5%" }}>
          Vignesh Foods
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: "white", fontSize: 15 }}>Select Customer</Text>
        </TouchableOpacity>

        <TextInput style={styles.input} placeholder="Search Customers" />

        <View style={styles.listcontainer}>
          <FlatList 
          data={data}
          renderItem={({item})=>{
            return (
                <TouchableOpacity onPress={()=>handlePress(item.name)}>
                  <View style={styles.list}>
                  
                  <Text style={{fontSize:15,fontWeight:"600"}}>{item.name}</Text>
                 
              </View>
                </TouchableOpacity>
            )
          }}
          scrollEnabled={true}
          style={{flex:1}}/>
        </View>
      </View>
    </View>
    
 
  );
}

const styles = StyleSheet.create({
  container: {
    
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  pagecontainer: {
    width: "100%",
    padding: 10,
  },
  btn: {
    width: "100%",
    padding: 20,
    height: 60,
    backgroundColor: "darkblue",
    alignItems: "center",
    marginBottom: "10%",
  },
  input: {
    width: "100%",
    height: 60,
  },
  list:{
    
    width:"100%",
    padding:"5%",
    borderBottomColor:"black",
    borderBottomWidth:1
  },
  listcontainer:{
    marginBottom:100,
  }
});
