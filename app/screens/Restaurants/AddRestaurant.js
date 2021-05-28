import React, {useState,useRef} from 'react'
import { View } from "react-native"
import Toast from "react-native-easy-toast";
import Loading from "../../Components/Loading"
import AddRestautantForm from "../../Components/Restaurants/AddRestautantForm"

export default function AddRestaurant(props) {
    const { navigation} = props
    const [isLoading, setIsLoading] = useState(false);
    const toastRef = useRef();
    return(
        <View>
            <AddRestautantForm 
            toastRef={toastRef}
            setIsLoading={setIsLoading}
            navigation={navigation}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            {/* <Loading isVsible={isLoading} text="Creando Restaurante" /> */}
        </View>
    )
}