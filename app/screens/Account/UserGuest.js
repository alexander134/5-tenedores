import React, { useState, useEffect } from 'react';
import { StyleSheet,View,ScrollView,Text,Image} from 'react-native';
import {Button} from "react-native-elements";
import {useNavigation } from "@react-navigation/native"

export default function UserGuest() {
    const navigation= useNavigation();
    console.log(navigation);
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
            <Image 
                source={require("../../../assets/img/userGuest.jpg")}
                resizeMode="contain"   
                style={styles.image}  
            />
            
            <Text style={styles.title}>cossulta tu perfil...</Text>
            <Text style={styles.descripcion}>Las descripciones de producto son textos que
                explican las características y características de los productos. Por regla
                general, las descripciones de producto se utilizan en las tiendas online 
                con el objetivo de informar a los clientes potenciales y fomentar su intención de compra.</Text>
            <View style={styles.viewbtn}>
                <Button
                title="Ver tu perfill"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainer}
                onPress={()=> navigation.navigate("login")}
                />
            </View>
            
        </ScrollView>
        
    );
}

const styles= StyleSheet.create({
    viewBody:{
        marginLeft:30,
        marginRight:30,
    },
    image:{
        height:300,
        width:"100%",
        marginBottom:40,
    },
    title:{
        fontWeight:"bold",
        fontSize:19,
        marginBottom:10,
        textAlign:"center"
    },
    descripcion:{
        textAlign:"center",
        marginBottom:20,
    },
    viewbtn:{
        flex:1,
        alignItems:"center"
    },
    btnStyle:{
        backgroundColor:"#00a680"
    },
    btnContainer:{
        width:"70%"
    }
});

