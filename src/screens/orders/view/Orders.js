import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

 export default function Orders({ route, navigation }) {

  

  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      
        <Text style={{fontWeight:"700",fontSize:20}}>{route.params == undefined ? "Please Select Customer":route.params.nm}</Text>
    </View>
  )
}

