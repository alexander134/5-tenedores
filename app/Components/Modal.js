import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props){
    const {isVisible,setIsVisible,children}=props;
    const closeModal= () =>setIsVisible(false)
    return(
        <Overlay 
            isVisible={isVisible}
            windowBackgroundColor="rgba(0,0,0,0.5)"
            overlayBackgroundColor="transparent"
            overlayStyle={styles.overlay}
            onBackdropPress={closeModal}
        >
            {children}
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay:{
        height:"auto",
        width:"90%",
        backgroundColor:"#fff",
        borderColor:"#00a680",
        borderWidth:2,
        borderRadius:10,
    },
    view:{
       flex:1,
       alignItems:"center",
       justifyContent:"center", 
    },
    text:{
        color: "#00a680",
        textTransform:"uppercase",
        marginTop:10
    }
})