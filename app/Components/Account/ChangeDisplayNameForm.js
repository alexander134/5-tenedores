import React, {useState} from "react";
import {View,StyleSheet,Text} from  "react-native"
import {Button,Input} from "react-native-elements"
import * as firebase from "firebase";

export default function ChangeDiplayNameForm(props){
    const {displayName,setShowModal,setRealoadUserInfo,toastRef}=props;
    // console.log(setRealoadUserInfo);
    const [newDisplayName, setNewDisplayName] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit=()=>{
        setError(null);
        if(!newDisplayName){
            setError("El nombre no puede estar vacio");
        }else if(newDisplayName===displayName){
            setError("El nombre no puede ser igual al actual");
        }else{
            setIsLoading(true)
            const update={
                displayName:newDisplayName,
            }
            firebase
                .auth()
                .currentUser
                .updateProfile(update)
                .then(()=>{
                    setIsLoading(false)
                    setRealoadUserInfo(true)
                    setShowModal(false)
                    toastRef.current.show("Nombre y Apellido Actualizado correctamente")
                    })
                .catch(()=>{ 
                    setIsLoading(false)
                    setError("Error al actualizar el nombre")
                })
        }
        // console.log(newDisplayName)
    }
        return (
            <View style={style.view} >
                <Input 
                    placeholder="Nombre y Apellido"
                    containerStyle={style.input}
                    rightIcon={{
                        type:"material-community",
                        name:"account-circle-outline",
                        color:"#c2c2c2",
                    }}
                    defaultValue={displayName || ""}
                    onChange={(e)=>setNewDisplayName(e.nativeEvent.text)}
                    errorMessage={error}
                />
                <Button
                    title="Cambiar Nombre"
                    containerStyle={style.btnContainer}
                    buttonStyle={style.btn}
                    onPress={onSubmit}
                    loading={isLoading}
                />
            </View>
        )
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
