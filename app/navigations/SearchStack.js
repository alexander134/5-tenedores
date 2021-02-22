import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Search from "../screens/Search";

const stack =createStackNavigator();

export default function SearchStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="search" component={Search} options={{title:"Buscador"}} />
            {/* <stack.Screen name="add-restaurants" component={Search} options={{title:"Añadir Restaurantes"}} /> */}
        </stack.Navigator>
    );
}