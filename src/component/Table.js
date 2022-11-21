import React from 'react'
import { View } from 'react-native'
import { DataTable } from 'react-native-paper'


function Table() {

    const data = [
        {inm:"dosa batterr",Qty:20,price:200},
        {inm:"Chapati",Qty:30,price:300},
        {inm:"Ata", Qty:20,price:200},
        {inm:"Ata", Qty:20,price:200},
        {inm:"Ata", Qty:20,price:200},
        {inm:"Ata", Qty:20,price:200},
    
        
      ]
  return (
    <View>
    <DataTable>
        <View style={{backgroundColor:"lightblue"}}>
    <DataTable.Header >    
        <DataTable.Title>Item Name</DataTable.Title>
        <DataTable.Title numeric>Qty</DataTable.Title>
        <DataTable.Title numeric>Amount</DataTable.Title>
    
      </DataTable.Header>
      </View>
      {
        data.map((val,i)=>{
            return (
                <View style={{backgroundColor:"#fafafa",borderWidth:0.5,borderColor:'silver'}}>
                <DataTable.Row key={i}>
                <DataTable.Cell textStyle={{fontWeight:"600"}}>{val.inm}</DataTable.Cell>
                <DataTable.Cell numeric>{val.Qty}</DataTable.Cell>
                <DataTable.Cell numeric>{val.price}</DataTable.Cell>
              </DataTable.Row>
              </View>
            )
        })
      }

    </DataTable>
  
    </View>
  )
}

export default Table