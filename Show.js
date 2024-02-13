import { View, Text, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Show({navigation, route}) {
    const [uril, setUri] = useState(null)
    const [ap, setAp] = useState(1);
    useEffect(() => {
        try {
        const title = route.params.item;
        console.log("Title is " + title);
         AsyncStorage.getItem(title, (err, res) => {
          console.log(res);
          setUri(res);
         })
         AsyncStorage.getItem("ap-" + title, (err, res) => {
          setAp(parseFloat(res))
         })
        } catch (err) {
          console.log("Error in showing image " , err.message)
        }
         })

  return (
    <View>
        {/* <Text>{title}</Text> */}
        <View style={{display:"flex", height: "100%",justifyContent: "center", alignItems:"center"}}>
        {uril && <Image source={{uri: uril}} style={{width: 380, aspectRatio : ap }} />}
        </View>
    </View>
  )
}