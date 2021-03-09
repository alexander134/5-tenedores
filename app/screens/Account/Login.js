import React from 'react'
import { StyleSheet,View,ScrollView,Text,Image} from 'react-native';
import { Divider} from "react-native-elements"
import {useNavigation } from "@react-navigation/native"

export default function Login(){
    return(
        <ScrollView centerContent={true} style={styles.viewBody}>
             <Image 
                source={require("../../../assets/img/5tenedoresletrasiconologo.png")}
                resizeMode="contain"   
                style={styles.logo}  
            />
            <View style={styles.viewContainer}>
                <Text>Login form....</Text>
                <CreateAccount/>
            </View>
            <Divider style={styles.divider}/>
            <Text>Social login....</Text>
        </ScrollView>
        
    )
}

function CreateAccount(){
    const navigation= useNavigation();
    return(
        <Text style={styles.textRegister}>
            Aun no tienes una cuenta
            <Text style={styles.btnRegister} onPress={()=>navigation.navigate("register")}> Registrate</Text>
        </Text>
        
    );
}

const styles= StyleSheet.create({
    logo:{
        width:"100%",
        height:150,
        marginTop:20
    },
    viewContainer:{
        marginRight:40,
        marginLeft:40
    },
    textRegister:{
        marginTop:15,
        marginLeft:10,
        marginRight:10
    },
    btnRegister:{
        color:"#00a680",
        fontWeight: "bold"
    },
    divider:{
        margin:40,
        backgroundColor:"#00a680"
    }
});