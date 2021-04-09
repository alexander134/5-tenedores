import React, { useState, useRef } from 'react'
import { View,StyleSheet,Text} from 'react-native'
import { ListItem } from "react-native-elements"
import {map} from "lodash"
import Modal from "../Modal"
import ChangeDiplayNameForm from "./ChangeDisplayNameForm"
import ChangeEmailForm from "./ChangeEmailForm"

export default function AccountOptions(props) {
    const {userInfo,toastRef,setRealoadUserInfo} = props;
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)
    // console.log(userInfo)
    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDiplayNameForm 
                        displayName={userInfo.displayName}
                        setShowModal={setShowModal} 
                        toastRef={toastRef}  
                        setRealoadUserInfo={setRealoadUserInfo} 
                    />);
                setShowModal(true)
                break;
            case "email":
                setRenderComponent(<ChangeEmailForm 
                    email={userInfo.email}
                    setShowModal={setShowModal} 
                    toastRef={toastRef}  
                    setRealoadUserInfo={setRealoadUserInfo} 
                />);
                setShowModal(true)
                break;
            case "password":
                setRenderComponent(<Text>cmabiando constraseña</Text>);
                setShowModal(true)
                break;
            default:
                setRenderComponent(null)
                setShowModal(false)
                break;
        }
    };
    const menuOptions= arrayMenu(selectedComponent);
    

    return(
        <View>
            {map(menuOptions,(menu,index)=>(
                <ListItem   key={index} 
                            title={menu.title} 
                            leftIcon={{type: menu.iconType,name:menu.iconNameLeft,color:menu.iconColorleft}}
                            rightIcon={{type: menu.iconType,name:menu.iconNameRight,color:menu.iconColorRight}}
                            containerStyle={styles.menuItem}
                            onPress={menu.onPress}
                />
            ))}
            {renderComponent && (
                <Modal isVisible={showModal} setIsVisible={setShowModal}>
                    {renderComponent}
                </Modal>
            )}
           
        </View>
    )
}

function arrayMenu(selectedComponent){
    return[
        {
            title:"Cambiar Nombre y Apellido",
            iconType:"material-community",
            iconNameLeft:"account-circle",
            iconColorleft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("displayName"),
        },
        {
            title:"Cambiar Email",
            iconType:"material-community",
            iconNameLeft:"at",
            iconColorleft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("email"),
        },
        {
            title:"Cambiar Contraseña",
            iconType:"material-community",
            iconNameLeft:"lock-reset",
            iconColorleft:"#ccc",
            iconNameRight:"chevron-right",
            iconColorRight:"#ccc",
            onPress: () => selectedComponent("password"),
        }
    ]
}


const styles= StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#e3e3e3"
    },
    userInfoAvatar:{
        marginRight:20,
    },
    
});