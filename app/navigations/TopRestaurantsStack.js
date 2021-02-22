import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import TopRestaurants from "../screens/TopRestaurants";

const stack =createStackNavigator();

export default function TopRestaurantsStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="top-restaurants" component={TopRestaurants} options={{title:"los mejores restaurantes"}} />
            <stack.Screen name="add-toprestaurants" component={TopRestaurants} options={{title:"Añadir Top Restaurantes"}} />
        </stack.Navigator>
    );
}