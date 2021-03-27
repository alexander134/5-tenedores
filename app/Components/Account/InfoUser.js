import React, { useState, useRef } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Input,Icon,Button,Avatar} from "react-native-elements"

export default function InfoUser(props) {
    const {userInfo: {photoURL,displayName,email}} = props;
    console.log(photoURL)
    console.log(displayName)
    console.log(email)
    return(
        <View style={styles.viewUserInfo}>
            <Avatar rounded size="large"
                    showEditButton
                    containerStyle={styles.userInfoAvatar}
                    source={
                        photoURL 
                        ? { uri :photoURL}
                        : require("../../../assets/img/avatardefault.jpg")
                    }
            />
            <View style={styles.displayName}>
                <Text>
                    {
                        displayName 
                        ? displayName
                        : "Anónimo"
                    }
                </Text>
                <Text>
                    {
                        email 
                        ? email
                        : "Social Login"
                    }
                </Text>
            </View>
        </View>
    );
}

const styles= StyleSheet.create({
    viewUserInfo:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        backgroundColor:"#f2f2f2",
        paddingTop:30,
        paddingBottom:30
    },
    userInfoAvatar:{
        marginRight:20,
    },
    
});