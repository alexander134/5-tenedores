import React, { useState, useRef } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Input,Icon,Button,Avatar} from "react-native-elements"
import * as firebase from "firebase"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser(props) {
    const {userInfo: {photoURL,displayName,email},toasRef} = props;
    // console.log(photoURL)
    // console.log(displayName)
    // console.log(email)
    const changeAvatar= async()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const resultPermissionsCamera= resultPermissions.permissions.camera.status;
        // console.log(resultPermissionsCamera)
        if(resultPermissionsCamera=== "denied"){
            toasRef.current.show("you need to accept gallery permissions")
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            console.log(result)
        }
    }

    return(
        <View style={styles.viewUserInfo}>
            <Avatar rounded size="large"
                    showEditButton
                    onEditPress={changeAvatar}
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