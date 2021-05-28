import React,{useState} from 'react'
import {StyleSheet, View, Text,ScrollView,Alert,Dimensions } from "react-native"
import { Icon, Avatar,Image,Input,Button} from "react-native-elements"


export default function AddRestautantForm(props) {
    const {toastRef,setIsLoading,navigation }=props
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAdress, setRestaurantAdress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")
    const addRestautant =()=>{
        console.log("OK--")
        console.log(restaurantName)
        console.log(restaurantAdress)
        console.log(restaurantDescription)
    }
    return(
        <ScrollView style={style.scrollView}>
            <FormAdd setRestaurantName={setRestaurantName} setRestaurantAdress={setRestaurantAdress} setRestaurantDescription={setRestaurantDescription} />
            <Button title="Crear Restaurante" onPress={addRestautant} buttonStyle={style.btnAddRestaurant} />
        </ScrollView>
    )
}

function FormAdd(props) {
    const {setRestaurantName, setRestaurantAdress ,setRestaurantDescription}=props
    return(
        <View style={style.viewForm}>
            <Input placeholder="Nombre del restaurante" containerStyle={style.input} onChange={e=> setRestaurantName(e.nativeEvent.text)} />
            <Input placeholder="Dirección" containerStyle={style.input}  onChange={(e)=> setRestaurantAdress(e.nativeEvent.text)} />
            <Input placeholder="Descrpción del restaurante" multiline={true} inputContainerStyle={style.textArea} onChange={(e)=> setRestaurantDescription(e.nativeEvent.text)} />
        </View>
    )
    
}

const style =StyleSheet.create({
    scrollView:{
        height:"100%"
    },
    viewForm:{
        marginLeft:10,
        marginRight:10
    },
    input:{
       marginBottom:10 
    },
    textArea:{
        height:100,
        width:"100%",
        padding:0,
        margin:0
     },
     btnAddRestaurant:{
         backgroundColor:"#00a680",
         margin: 20
     }
})