import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from "react-native";
import {Input,Icon,Button} from "react-native-elements"

import { Overlay } from "react-native-elements";

export default function RegisterForm(props){

    const {isVisible,text} = props;

    return(
        
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                secureTextEntry={true}
            />
             <Button
                title="Unirse"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainerResgiter}
                buttonStyle={styles.btnResgiter}
                onPress={()=> console.log("Unirse")}
                />
        </View>
        
    )
}
const styles = StyleSheet.create({
    formContainer:{
        // flex:1,
        // alignItems:"center",
        // justifyContent:"center",
        marginTop:30,
    },
    inputForm:{
        width:"100%",
        marginTop:20
    },
    btnContainerResgiter:{
        marginTop:40,
        width:"100%"
    },
    btnResgiter:{
        backgroundColor:"#00a680"
    },
})
