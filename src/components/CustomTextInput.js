import { View, Text,TextInput } from 'react-native'
import React from 'react'


const CustomTextInput = (props) => {
  return (
    <View style={{
      backgroundColor:'#D9D9D9',
      marginVertical:5,
      borderRadius:5,
      height:50,
      justifyContent:'center',
      padding: 5
    }}>
      <TextInput
      { ...props?.textInput }
      />
    </View>
  )
}


export default CustomTextInput