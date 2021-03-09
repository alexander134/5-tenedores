import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Account from "../screens/Account/Account";
import Login from "../screens/Account/Login"
import Register from "../screens/Account/Register"

const stack =createStackNavigator();

export default function AccountStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="account" component={Account} options={{title:"Mi Cuenta"}} />
            <stack.Screen name="login" component={Login} options={{title:"Iniciar Sesión"}} />
            <stack.Screen name="register" component={Register} options={{title:"Registro"}} />
        </stack.Navigator>
    );
}