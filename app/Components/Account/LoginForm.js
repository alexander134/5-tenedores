import React, { useState } from 'react'
import { StyleSheet, View, Text } from "react-native";
import {Input,Icon,Button} from "react-native-elements"
import Loading from "../Loading";
import {validateEmail} from "../../utils/validations"
import {size,isEmpty} from "lodash"
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native"

export default function LoginForm(props){
    const {toastRef}= props
    const navigation = useNavigation();
    const [showPass, setShowPass] = useState(false)
    const [DataLogin, setDataLogin] = useState(defaultFormLogin())
    const [loading, setloading] = useState(false)
    const onchange=(e,type)=>{
        // console.log(e.nativeEvent.text)
        setDataLogin({...DataLogin,[type]:e.nativeEvent.text})
    }

    const onsubmit=()=>{
        // console.log(validateEmail(formData.email))

        if(isEmpty(DataLogin.email)||isEmpty(DataLogin.password)){
            toastRef.current.show("todos los datos son obligatorios");
        }else if(!validateEmail(DataLogin.email)){
            toastRef.current.show("mail invalido");
        }else if(size(DataLogin.password)<6){
            toastRef.current.show("la contraseña debe tener al menos 6 caracteres");
        }else{
            toastRef.current.show("ok");
            setloading(true);
            firebase.auth().signInWithEmailAndPassword(DataLogin.email,DataLogin.password)
            .then(response =>{
                // toastRef.current.show("ingreso exitoso");
                setloading(false);
                navigation.navigate("account")
             }).catch((err)=>{
                // console.log(err);
                setloading(false);
                toastRef.current.show("Email o Contraseña incorrecta");
             })
        }
    }
    return(
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electronico"
                containerStyle={styles.inputForm}
                onChange={e=>onchange(e,"email")}
                rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight}/>}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                onChange={e=>onchange(e,"password")}
                secureTextEntry={showPass ? false : true}
                rightIcon={<Icon type="material-community" name={showPass ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={()=>setShowPass(!showPass)}
                />}
            />
            <Button
                title="Ingresar"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainerLogin}
                buttonStyle={styles.btnLogin}
                onPress={onsubmit}
            />
            <Loading isVisible={loading} text="Validando" />
        </View>
    )
}



const styles = StyleSheet.create({
    formContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        marginTop:30,
    },
    inputForm:{
        width:"100%",
        marginTop:20
    },
    btnContainerLogin:{
        marginTop:20,
        width:"95%"
    },
    btnLogin:{
        backgroundColor:"#00a680",
        width:"100%"
    },
    iconRight:{
        color:"#c1c1c1"
    },
})

function defaultFormLogin() {
    return{
        email:"",
        password:"",
    }
}