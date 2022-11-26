import { Picker } from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View } from 'react-native'


function Newstatus() {
    const [selectvalue,setSelectvalue]=useState("Placed")

  const [status]=useState([
    "Placed",
    "Accepted",
    "In-Process",
    "Cancelled"
  ])

  return (
    <View>
    <Picker
      style={{marginVertical:10,width:200}}
      selectedValue={selectvalue}
      onValueChange={(val)=>setSelectvalue(val)}>
        {
          status.map((s)=><Picker.Item label={s} value={s}/>)
        }
      </Picker>

    </View>
  )
}

export default Newstatus