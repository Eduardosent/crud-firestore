import React, {useState, useEffect, useLayoutEffect } from 'react'
import {View , Text, ScrollView} from 'react-native'
import {Button} from '@rneui/themed'
import {useNavigation} from '@react-navigation/native';
import { database } from '../config/firebase';
import { collection, onSnapshot , orderBy, query } from 'firebase/firestore';
import { Product } from '../components/Product';

export const Home = () => {
    const navigation = useNavigation();
    const [products,setProducts] = useState([]);

    useLayoutEffect(()=>{
      navigation.setOptions({
        headerRight: ()=> <Button title='Add' onPress={()=>navigation.navigate("Add")} color={"transparent"} titleStyle={{color:"blue",fontWeight:"700"}}/>
      })
    },[])

    useEffect(()=>{
      const collectionRef = collection(database,'products');
      const q = query(collectionRef, orderBy('createdAt','desc'));

      const unsubscribe = onSnapshot(q, querySnapshot =>{
        setProducts(
          querySnapshot.docs.map(doc=> ({
            id: doc.id,
            emoji: doc.data().emoji,
            name: doc.data().name,
            price: doc.data().price,
            isSold: doc.data().isSold,
            createdAt: doc.data().createdAt,
          }))
        )
      })
      return unsubscribe;
    },[])
    console.log(products)
  return (
    <View style={{flex:1}}>
      <View style={{flex:1}}>
        <Text style={{fontSize:22,textAlign:"center"}}>Products:</Text>
        <ScrollView style={{flex:1}}>
        {
          products.map((product)=>(
            <Product key={product.id} {...product}/>
          ))
        }
        </ScrollView>
      </View>
    </View>
  )
}
/*        <Button onPress={()=>navigate("Add")}>
            <Text>Go to Add</Text>
        </Button>*/