import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { styles } from './Main'; 
import { TextInput, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export  function Form({navigation, route}) {
  
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [ap, setAp] = useState(1);
  
  

  const chooseImage = async () => {
    try {
      const data = await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes: ImagePicker.MediaTypeOptions.All
        }
      )
      
    if (!data.canceled) {
      setImage(data.assets[0].uri);
      console.log(data.assets[0])
      console.log(image)
      setAp(data.assets[0].width / data.assets[0].height)
    }
    } catch (Err) {
      console.log(Err)
    }
  }

  const submit = () => {
    if (title == "") {
      Alert.alert("Field Missing" ,"Title is Required",[{text: "OK"}])
      return;
    }
    AsyncStorage.setItem(title, image);
    AsyncStorage.setItem("ap-" + title, ap + "");
    console.log("Data Added")
    route.params.updateList();
    Alert.alert("Success", "Item Added Successfully", [{text:"Ok", onPress: () => navigation.navigate("Home")}])
    return;
  }
// npm install --global eas-cli && eas init --id 19bb3592-3af0-4544-ae21-eea5034933a6
  return (
    <View style={styles.container}>
    <View style={styles.headbox}>
      <Text style={styles.head}>Add Data</Text>
    </View>
    <View style={sy.bodybox}>
      <View style={sy.form}>
      <TextInput placeholder='Title     eg.Schedule' style={sy.input} defaultValue={title} onChangeText={(text) => setTitle(text) } />
      <Button title='Add Image' style={sy.btn} onPress={chooseImage} />
      <View style={sy.imageBox}>
      {image && <Image source={{uri : image}} style={{ width: 350, height: 350, borderRadius: 25 }}  />}
      </View>
      {image && <Button title='Save' onPress={submit} />}
      </View>
    </View>
    <View style={styles.tailbox}>
      <Pressable style={styles.btn} onPress={() => {
        navigation.navigate("Home")
      }}>
        <Text style={styles.back}> Back </Text>
      </Pressable>
    </View>
    <StatusBar style="auto" />
  </View>
  )
}

const sy = StyleSheet.create({
  input: {
    borderWidth : 1,
    width: "95%",
    borderRadius: 10,
    padding : 9,
    fontSize: 27
  },
  form : {
    width: "100%",
    paddingTop: 17 ,
    display: "flex",
    justifyContent: "center",
    alignItems : "center",
    rowGap: 10
  },
  bodybox: {
   flex: 6,
   display : "flex",
   width: "97%"
  },
  btn: {
    width: "95%",
  },
  imageBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
})