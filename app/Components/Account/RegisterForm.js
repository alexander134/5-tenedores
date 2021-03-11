import React, { useState } from 'react'
import { StyleSheet, View, Text } from "react-native";
import {Input,Icon,Button} from "react-native-elements"
import Loading from "../Loading";
import {validateEmail} from "../../utils/validations"
import {size,isEmpty} from "lodash"
import * as firebase from "firebase";
import {useNavigation} from "@react-navigation/native"

export default function RegisterForm(props){
    const {toastRef}= props
    const [showPass, setShowPass] = useState(false)
    const [showPassRepit, setShowPassRepit] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue())
    const navigation = useNavigation();
    const [loading, setloading] = useState(false)
    // console.log(formData)

    const onsubmit=()=>{
        // console.log(formData)
        // console.log(validateEmail(formData.email))

        if(isEmpty(formData.email)||isEmpty(formData.passwordRepit)||isEmpty(formData.password)){
            toastRef.current.show("todos los datos son obligatorios");
        }else if(!validateEmail(formData.email)){
            toastRef.current.show("mail invalido");
        }else if(formData.password!== formData.passwordRepit){
            toastRef.current.show("la contraseña debe ser igual");
        }else if(size(formData.password)<6){
            toastRef.current.show("la contraseña debe tener al menos 6 caracteres");
        }else{
            toastRef.current.show("ok");
            // firebase.auth()
            setloading(true);
            firebase.auth().createUserWithEmailAndPassword(formData.email,formData.password)
            .then(response =>{
                // console.log(response);
                // toastRef.current.show("registro exitoso");
                setloading(false);
                navigation.navigate("account")
            }).catch((err)=>{
                // console.log(err);
                setloading(false);
                toastRef.current.show("el email ya esta en uso");
            })
        }
    }

    const onchange=(e,type)=>{
        // console.log(e.nativeEvent.text)
        setFormData({...formData,[type]:e.nativeEvent.text})
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
                rightIcon={<Icon type="material-community" name={showPass ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={()=>setShowPass(!showPass)}/>}
            />
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}
                onChange={e=>onchange(e,"passwordRepit")}
                secureTextEntry={showPassRepit ? false : true}
                rightIcon={<Icon type="material-community" name={showPassRepit ? "eye-off-outline" : "eye-outline"} iconStyle={styles.iconRight} onPress={()=>setShowPassRepit(!showPassRepit)}/>}
            />
             <Button
                title="Unirse"
                buttonStyle={styles.btnStyle}
                containerStyle={styles.btnContainerResgiter}
                buttonStyle={styles.btnResgiter}
                onPress={onsubmit}
                />
                <Loading isVisible={loading} text="Creando Cuenta" />
        </View>
        
    )
}

function defaultFormValue() {
    return{
        email:"",
        password:"",
        passwordRepit:"",
    }
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
    btnContainerResgiter:{
        marginTop:20,
        width:"80%"
    },
    btnResgiter:{
        backgroundColor:"#00a680",
        width:"100%"
    },
    iconRight:{
        color:"#c1c1c1"
    },
})
