import React, { useState, useRef, useEffect } from 'react'
import { View,Text,StyleSheet} from 'react-native'
import {Input,Icon,Button} from "react-native-elements"
import Toast from 'react-native-easy-toast'
import * as firebase from "firebase";
import Loading from "../../Components/Loading";
import InfoUser from "../../Components/Account/InfoUser";


export default function UserLogged() {
    const toasRef = useRef()
    const [userInfo, setUserInfo] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadinfText, setLoadinfText] = useState("")
    useEffect(() => {
        (async()=>{
            const user = await firebase.auth().currentUser;
            setUserInfo(user);
            // console.log(user);
        })()
    }, [])

    return(
        <View style={styles.viewUserInfo}>
            {userInfo && <InfoUser userInfo={userInfo} />}
            
            <Text>AccountOptions...</Text>
            <Button title="Cerrar Sesion" buttonStyle={styles.btnCloseSession} titleStyle={styles.btnCloseSessionText}  onPress={()=> firebase.auth().signOut()}/>
            <Toast ref={toasRef} position="center" opacity={0.9} />
            <Loading text={loadinfText} isVisible={loading} />
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