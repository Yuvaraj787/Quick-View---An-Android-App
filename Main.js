import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export  function Main({navigation}) {
  
    const [items, setItems] = useState([]);

    const updateItems = () => {
      try {
        AsyncStorage.getAllKeys((err, res) => {
         fil_res = res.filter(item => item.slice(0,3) != "ap-")
         setItems(fil_res);
         console.log("RESULTS 2", res);
        })
         // setItems(data);
       } catch(err) {
         console.log("error in fetching", err.message)
       }
    }

    useEffect(() => {
        updateItems();
     }, [])


    const handleLongPress = (itemName="Nothing") => {
      Alert.alert("Delete Item", `Are you sure deleting ${itemName} ? `,[
        {
          text: "Yes",onPress: () => deleteItem(itemName), style:"default"
        },
        {
          text: "Cancel",onPress: ()=>{}, style:"cancel"
        }
    ])
    }

    
    
    const deleteItem = async (itemName) => {
      await AsyncStorage.removeItem(itemName)
      await AsyncStorage.removeItem("ap-"+itemName)
      setItems(prevItems => prevItems.filter(eachItem => eachItem != itemName))
    }

    return (
      <View style={styles.container}>
        <View style={styles.headbox}>
          <Text style={styles.head}>Quick View</Text>
        </View>
        <View style={styles.bodybox}>
          {items.map((item,ind) => {
            return <TouchableOpacity
             style={styles.itemBox}
             id={(ind + 1) + ""}
             onPress={() => navigation.navigate("Show", {item: item})}
             onLongPress={() => {handleLongPress(item)}}
            ><View >
              <Text style={styles.itemText}>{item}</Text>
            </View></TouchableOpacity>
          }
          )}
        </View>
        <View style={styles.tailbox}>
          <Pressable style={styles.btn} onPress={() => {
            navigation.navigate("Form", {updateList : updateItems})
          }}>
            <Text style={styles.symbol}> + </Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
  
  
  
  export const styles = StyleSheet.create({
    container: {
      display:"flex",
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:50,
      height:"97%",
      flexDirection:"column",
      rowGap:13
    },
    head: {
      fontSize:35,
      fontWeight:"bold"
    },
    headbox: {
      flex:1,
      display: "flex",
      justifyContent:"center",
      alignItems:"left",
      paddingLeft: 12,
      width:"95%",
      backgroundColor:"#D4E7C5",
      borderRadius: 20
    },
    bodybox: {
      flex:7,
      width:"95%",
      backgroundColor:"#E1F0DA",
      borderRadius: 10,
      display: "flex",
      alignItems:"center",
      padding: 4,
      rowGap: 7
    },
    tailbox: {
      flex:1,
      display: "flex",
      flexDirection:"row",
      width:"95%"
    },
    symbol: {
      fontSize: 60
    }, 
    btn: {
      backgroundColor:"#99BC85",
      padding : 3,
      borderRadius : 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    itemBox: {
      backgroundColor: "#99BC85",
      width:"97%",
      borderRadius : 10,
      padding: 15
    },
    itemText: {
      fontSize: 30
    },
    back : {
      fontSize: 35,
      fontWeight: "bold"
    }
  });
  