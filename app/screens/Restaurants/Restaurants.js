import React, { useState, useEffect } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import {firebaseApp} from '../../utils/firebase'
import firebase from "firebase/app"

export default function Restaurants(props) {
    const { navigation } = props
    const [user, setUser] = useState(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo)=>{
            //console.log(userInfo)
            setUser(userInfo)
        })
    }, [])

    return(
        <View style={style.viewBody}>
            <Text>Restaurantes...</Text>
            { user && (
                <Icon 
            reverse
            type="material-community"
            name="plus"
            color="#00a680"
            containerStyle={style.btnContainer} 
            onPress={()=> navigation.navigate("add-restaurants")}
            />
            )}
            
        </View>
    );
}
const style = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:"#fff",
    },
    btnContainer:{
        position: "absolute",
        bottom:0,
        right: 10,
        //shadowColor:"black",
        //textShadowOffset:{ width:2,height:2},
        //shadowOpacity: 0.2,
    }

})