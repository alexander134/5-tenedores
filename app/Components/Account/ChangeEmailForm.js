import React, {useState} from "react";
import {View,StyleSheet,Text} from  "react-native"
import {Button,Input} from "react-native-elements"
import * as firebase from "firebase";
import {validateEmail} from "../../utils/validations"
import {reauthenticate} from "../../utils/api"


export default function ChangeEmailForm(props){
    const {email,setShowModal,setRealoadUserInfo,toastRef}= props
    const [error, setError] = useState({});
    const [showPass, setShowPass] = useState(false)
    const [formData, setFormData] = useState(defaultValueform());
    const [isLoading, setIsLoading] = useState(false)

    const onChange= (e,type)=>{



        setFormData({...formData, [type]: e.nativeEvent.text})
        // console.log(formData)
    } 

    const onSubmit= ()=>{
        setError({})
        if(!formData.email || email === formData.email){
            setError({
                email:"El email no ha cambiado."
            })
        }else if(!validateEmail(formData.email)){
            setError({
                email:"email Incorrecto."
            })
        }else if(!formData.password){
            setError({
                password:"la contraseña no puede estar vacia."
            })
        }else{
            setIsLoading(true)
            reauthenticate(formData.password).then(response =>{
                console.log(response)
                firebase.auth()
                .currentUser.updateEmail(formData.email)
                .then(()=>{
                    setIsLoading(false)
                    setRealoadUserInfo(true)
                    toastRef.current.show("Email Actualizado correctamente")
                    setShowModal(false)
                }).catch(()=>{
                    setError({
                        email:"error al actualizar el Email."
                    })
                    setIsLoading(false)
                })
                
            }).catch(()=>{
                setError({
                    password:"la contraseña no es correcta."
                })
                setIsLoading(false)
            })
        }
        
    }
    return(
        <View style={style.view} >
            <Input 
                placeholder="correo Electronico"
                containerStyle={style.input}
                rightIcon={{
                    type:"material-community",
                    name:"at",
                    color:"#c2c2c2",
                }}
                defaultValue={email || ""}
                onChange={(e)=>onChange(e,"email")}
                errorMessage={error.email}
            />
            <Input 
                placeholder="Contraseña"
                containerStyle={style.input}
                password={true}
                secureTextEntry={showPass ? false:true}
                rightIcon={{
                    type:"material-community",
                    name: showPass ? "eye-off-outline" :"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPass(!showPass)
                }}
                onChange={(e)=>onChange(e,"password")}
                errorMessage={error.password}
            />
            <Button
                title="Cambiar correo Electronico"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
    </View>
    )
}

function defaultValueform() {
    return{
        email:"",
        password:""

    }
}

const style= StyleSheet.create({
    view:{
        alignItems:"center",
        paddingBottom:10,
        paddingBottom:10,
    },
    input:{
        marginBottom:10,
    },
    btnContainer:{
        marginTop:20,
        width:"95%",
    },
    btn:{
        backgroundColor:"#00a680",

    }

});