import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native'
import { database } from '../config/firebase'
import { doc , deleteDoc, updateDoc } from 'firebase/firestore'
import {AntDesign} from '@expo/vector-icons'
import { Button } from '@rneui/themed'

export const Product = ({
    id,
    emoji,
    name,
    price,
    isSold
}) => {
  function onEdit(){
    const docRef = doc(database,'products',id);
    updateDoc(docRef,{
      isSold: true,
    })
  }
  const onDelete = () =>{
    const docRef = doc(database,'products',id);
    deleteDoc(docRef);
  }
  return (
    <View style={styles.productConatiner}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text style={styles.emoji}>{emoji}</Text>
        <TouchableOpacity>
          <AntDesign name='delete' onPress={onDelete} size={25} style={{paddingRight:5,paddingTop:5}} color={"red"}/>
        </TouchableOpacity>
      </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>${price}</Text>
        <Button disabled={isSold} background={isSold == false && "blue"} onPress={onEdit} style={{margin:5}} radius={"md"}>
          <Text style={{color:"#FFF",fontWeight:"500"}}>Purchase</Text>
        </Button>
    </View>
  )
}
const styles = StyleSheet.create({
    productConatiner:{
      backgroundColor:"#FFF",
      marginHorizontal:8,
      marginVertical:4
    },
    emoji:{
      fontSize:120
    },
    name:{
      color: "green",
      fontSize:20,
      paddingLeft:10
    },
    price:{
      fontSize:20,
      paddingLeft:10
    }
})
