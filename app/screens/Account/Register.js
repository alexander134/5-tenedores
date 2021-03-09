import React, { useState, useEffect } from 'react'
import {  StyleSheet,View,ScrollView,Text,Image} from 'react-native'
import ResgiterForm from "../../Components/Account/RegisterForm"
export default function Register() {
    return(
        <View>
            <Image 
                source={require("../../../assets/img/5tenedoresletrasiconologo.png")}
                resizeMode="contain"   
                style={styles.logo}  
            />
            <View style={styles.viewForm} >
                <ResgiterForm/>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewForm:{
        marginLeft:40,
        marginRight:40,
    },
});
