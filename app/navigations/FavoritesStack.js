import React from "react";
import {createStackNavigator} from "@react-navigation/stack"
import Favorites from "../screens/Favorites";

const stack =createStackNavigator();

export default function FavoritesStack(){
    return(
        <stack.Navigator>
            <stack.Screen name="Favorites" component={Favorites} options={{title:"favoritos"}} />
            <stack.Screen name="add-favoritos" component={Favorites} options={{title:"Añadir favoritos"}} />
        </stack.Navigator>
    );
}