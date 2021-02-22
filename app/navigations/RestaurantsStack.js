import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Restaurants from "../screens/Restaurants";

const stack =createStackNavigator();

export default function RestaurantsStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="restaurants" component={Restaurants} options={{title:"Restaurantes"}} />
            <stack.Screen name="add-restaurants" component={Restaurants} options={{title:"Añadir Restaurantes"}} />
        </stack.Navigator>
    );
}