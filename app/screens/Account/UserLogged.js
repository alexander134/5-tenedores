import React, { useState, useRef, useEffect } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Input,Icon,Button} from "react-native-elements"
import Toast from 'react-native-easy-toast'
import * as firebase from "firebase";
import Loading from "../../Components/Loading";
import InfoUser from "../../Components/Account/InfoUser";
import AccountOptions from "../../Components/Account/AccountOptions"

export default function UserLogged() {
    const toastRef = useRef()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [realoadUserInfo, setRealoadUserInfo] = useState(false)
    useEffect(() => {
        (async()=>{
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
            // console.log(user);
        })()
        setRealoadUserInfo(false);
    }, [realoadUserInfo])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} setLoading={setLoading} setLoadingText={setLoadingText} />}
            
            <AccountOptions userInfo={userInfo} toastRef={toastRef} realoadUserInfo={realoadUserInfo}  setRealoadUserInfo={setRealoadUserInfo}/>
            <Button title="Cerrar Sesion" buttonStyle={styles.btnCloseSession} titleStyle={styles.btnCloseSessionText}  onPress={()=> firebase.auth().signOut()}/>
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loading text={loadingText} isVisible={loading} />
        </View>
    );
}

const styles= StyleSheet.create({
    viewUserInfo:{
        minHeight:"100%",
        backgroundColor:"#f2f2f2",
    },
    btnCloseSessionText:{
        color:"#00a680",
    },
    btnCloseSession:{
        marginTop:30,
        borderRadius:0,
        backgroundColor:"#fff",
        borderTopWidth:1,
        borderTopColor:"#e3e3e3",
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3",
        paddingTop:10,
        paddingBottom:10,

    },
});