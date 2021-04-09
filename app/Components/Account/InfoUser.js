import React, { useState, useRef } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Input,Icon,Button,Avatar} from "react-native-elements"
import * as firebase from "firebase"
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"

export default function InfoUser(props) {
    const {userInfo: {uid,photoURL,displayName,email},toastRef,setLoading,setLoadingText} = props;
    // console.log(setLoadingText)
    // console.log(displayName)
    // console.log(email)
    // console.log(props.userInfo);
    const changeAvatar= async()=>{
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const resultPermissionsCamera= resultPermissions.permissions.camera.status;
        // console.log(resultPermissionsCamera)
        if(resultPermissionsCamera=== "denied"){
            toastRef.current.show("you need to accept gallery permissions")
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
            // const result = await ImagePicker.launchCameraAsync({
                // mediaTypes:ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3]
            })
            // console.log(result.uri);
            if(result.cancelled){
                toastRef.current.show("has cancelado a la seleccion de imagen")
            }else{
                uploadImage(result.uri).then(()=>{
                    // console.clear();
                    // console.log("imagen subida")
                    updatePhotoUrl();
                }).catch(()=>{
                    toastRef.current.show("error al actualizar la imagen");
                })
            }
            // console.log(result)
        }
    }

    const uploadImage= async (uri) => {
        // console.log(setLoading)
        setLoadingText("Actualizando Avatar");
        setLoading(true);
        
        // console.clear();
        // const response = await fetch("https://www.uzcategui.cl/ApiReactNativePhp/WhatsApp.jpeg");
        const response = await fetch(uri);
        const blob = await response.blob();

        const ref = firebase.storage().ref().child(`avatar/${uid}`);
        return ref.put(blob)

    }

    const updatePhotoUrl =() =>{
        firebase
        .storage()
        .ref(`avatar/${uid}`)
        .getDownloadURL()
        .then(async (response) => {
            // console.log(response)
            const update={
                photoURL: response,
            };
            await firebase.auth().currentUser.updateProfile(update);
            // console.log("imagen actualizada");
            setLoading(false);
        }).catch(()=>{
            toastRef.current.show("error al actualizar la imagen");
            setLoading(false);
        })
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