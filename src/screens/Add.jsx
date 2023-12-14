import { Button } from '@rneui/themed'
import React,{ useState } from 'react'
import { View,Text,ScrollView,TextInput,StyleSheet} from 'react-native'
import {EmojiKeyboard} from 'rn-emoji-keyboard'
import {database} from '../config/firebase'
import {useNavigation} from '@react-navigation/native'
import {collection, addDoc} from 'firebase/firestore'

export const Add = () => {
  const navigation = useNavigation()
    const [product,setProduct] = useState({
        name: "",
        price: 0,
        emoji: "*",
        isSold:false,
        createdAt: new Date()
    })
    console.log(product)
    const handlePrice = (price) =>{
      const newPrice = parseFloat(price).toFixed(2);
      setProduct({...product,price: newPrice})
    }
    const onSend = async() =>{
      await addDoc(collection(database, 'products'),product)
      navigation.goBack()
    }
  return (
    <View style={{flex:1}}>
        <Text style={{textAlign:"center",fontWeight:"500"}}>Add new product to sell</Text>
        <Text style={{fontSize:60,textAlign:"center"}}>{product.emoji}</Text>
        <ScrollView style={{flex:0.4,marginTop: 5}}>
            <EmojiKeyboard onEmojiSelected={(obj)=>setProduct({...product,emoji:obj.emoji})} onRequestClose={()=>setIsOpen(false)}/>
        </ScrollView>
        <View style={styles.inputContainer}>
        <TextInput placeholder='name of the product' onChangeText={(text)=>setProduct({...product,name:text})} style={[styles.input,{backgroundColor: product.name.length == 0 ? "#FFC300" : "#46FF00"}]}/>
        <TextInput placeholder='$ price' keyboardType='number-pad' onChangeText={handlePrice} style={[styles.input,{backgroundColor: product.price == 0 ? "#FFC300" : "#46FF00"}]}/>
        </View>
        <View style={styles.spaceButton}>
        <Button disabled={product.name == "" || product.price == 0 || product.emoji=="*" ? true : false} title={"Publish"} onPress={onSend} style={styles.publish} color={"#46FF00"} radius={"lg"} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  inputContainer:{
    marginHorizontal:15,
  },
  input:{
    padding: 10,
    marginVertical:10,
    borderRadius: 16,
    color:"#FFF",
    fontWeight:"600"
  },
  spaceButton:{
    alignItems:"center"
  },
  publish:{
    borderRadius: 16,
  }
})
