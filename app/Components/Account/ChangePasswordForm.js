import React, {useState} from "react";
import {View,StyleSheet,Text} from  "react-native"
import {Button,Input} from "react-native-elements"
import {size} from "lodash"
import * as firebase from "firebase";
import {reauthenticate} from "../../utils/api"


export default function ChangePasswordForm(props){
    const {setShowModal,setRealoadUserInfo,toastRef}= props
    const [formData, setFormData] = useState(defaultValueform());
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false)


    const onChange= (e,type)=>{
        setFormData({...formData, [type]: e.nativeEvent.text})
        
    } 
    const onSubmit= async ()=>{
        let isSetErrors= true;
        let errorsTemp = {};
        setErrors({});
        if(!formData.password || !formData.newPassword || !formData.repeatNewPassword){
            errorsTemp={
                password: !formData.password ? "La contraseña no puede estar vacia.":"",
                newPassword: !formData.newPassword ? "La contraseña no puede estar vacia.":"",
                repeatNewPassword: !formData.repeatNewPassword ? "La contraseña no puede estar vacia.":"",
            }
        }else if(formData.newPassword !== formData.repeatNewPassword){
            errorsTemp={
                newPassword:"La contraseña no son iguales.",
                repeatNewPassword:"La contraseña no son iguales.",
            }
        }else if(size(formData.newPassword) < 6){
            errorsTemp={
                newPassword:"La contraseña debe ser mayor a 6 caracteres.",
                repeatNewPassword:"La contraseña debe ser mayor a 6 caracteres.",
            }
        }else{
            setIsLoading(true)
            // await reauthenticate(formData.password).then(response =>{
            await reauthenticate(formData.password).then(async() =>{
                await firebase.auth()
                 .currentUser.updatePassword(formData.newPassword)
                 .then( ()=>{
                    isSetErrors =false;
                    setShowModal(false)
                    setIsLoading(false)
                    firebase.auth().signOut();
                 }).catch(()=>{
                    errorsTemp={
                        others:"error al actualizar la contraseña.",
                    }
                    setIsLoading(false)
                 })
            }).catch(()=>{
                errorsTemp={
                    password:"La contraseña no es correcta.",
                }
                setIsLoading(false)
            })
        }
        isSetErrors && setErrors(errorsTemp)
        // console.log(formData)
    
    }
    return(
        <View style={style.view}>
            <Input 
                placeholder="Contraseña actual"
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
                errorMessage={errors.password}
            />
            <Input 
                placeholder="Nueva Contraseña"
                containerStyle={style.input}
                password={true}
                secureTextEntry={showPass ? false:true}
                rightIcon={{
                    type:"material-community",
                    name: showPass ? "eye-off-outline" :"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPass(!showPass)
                }}
                onChange={(e)=>onChange(e,"newPassword")}
                errorMessage={errors.newPassword}
            />
            <Input 
                placeholder="Repetir Nueva Contraseña"
                containerStyle={style.input}
                password={true}
                secureTextEntry={showPass ? false:true}
                rightIcon={{
                    type:"material-community",
                    name: showPass ? "eye-off-outline" :"eye-outline",
                    color:"#c2c2c2",
                    onPress: ()=>setShowPass(!showPass)
                }}
                onChange={(e)=>onChange(e,"repeatNewPassword")}
                errorMessage={errors.repeatNewPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.others}</Text>
        </View>
    );
}


function defaultValueform() {
    return{
        password:"",
        newPassword:"",
        repeatNewPassword:""
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
