import React,{useState, useEffect} from 'react'
import {StyleSheet, View, Text,ScrollView,Alert,Dimensions } from "react-native"
import {Icon, Avatar,Image,Input,Button} from "react-native-elements"
import {map,size, filter} from "lodash";
import * as Permissions from "expo-permissions"
import * as ImagePicker from "expo-image-picker"
import * as Location from "expo-location";
import MapView from "react-native-maps"
import Modal from "../Modal"

const widthScreen= Dimensions.get("window").width;

export default function AddRestautantForm(props) {
    const {toastRef,setIsLoading,navigation }=props
    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAdress, setRestaurantAdress] = useState("")
    const [restaurantDescription, setRestaurantDescription] = useState("")
    const [imagesSelect, setImagesSelect] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    
    const addRestautant =()=>{
        console.log("OK--")
        // console.log(restaurantName)
        // console.log(restaurantAdress)
        // console.log(restaurantDescription)
        console.log(imagesSelect)
    }
    return(
        <ScrollView style={style.scrollView}>
            <ImageRestaurant imagesSelect={imagesSelect[0]} />
            <FormAdd setRestaurantName={setRestaurantName} setRestaurantAdress={setRestaurantAdress} setRestaurantDescription={setRestaurantDescription} setIsVisibleMap={setIsVisibleMap} />
            <UploadImage toastRef={toastRef} setImagesSelect={setImagesSelect} imagesSelect={imagesSelect}/>
            <Button title="Crear Restaurante" onPress={addRestautant} buttonStyle={style.btnAddRestaurant} />
            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} toastRef={toastRef} />
        </ScrollView>
    )
}

 function Map(props) {
     const {isVisibleMap, setIsVisibleMap,toastRef}= props
     const [location, setLocation] = useState(null);
    useEffect(() => {
        (async ()=>{
            const resultPermissionss= await Permissions.askAsync(
                Permissions.LOCATION
            )
            const statusPermissions=resultPermissionss.permissions.location.status

            if(statusPermissions!== "granted"){
                toastRef.current.show("Es necesario aceptar los permisos de localizacion para crear un restaurante.",3000)
            }else{
                const loc= await Location.getCurrentPositionAsync({})
                console.log(loc.coords.latitude);
                console.log(loc.coords.longitude);
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                })
            }
        })()
    }, [])

     return(
         <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap} >
             <View>
                 {location && (
                     <MapView style={style.mapStyle} initialRegion={location} showsUserLocation={true} onRegionChange={(region)=> setLocation(region)}>
                         <MapView.Marker   coordinate={{
                             latitude:location.latitude,
                             longitude:location.longitude
                         }}
                         draggable
                         />
                     </MapView>
                 )}
             </View>
         </Modal>
     )
 }


function ImageRestaurant(props) {
    const {imagesSelect}= props
    return(
        <View style={style.ViewPhoto}>
            <Image
                source={imagesSelect? {uri: imagesSelect}: require("../../../assets/img/no-image.png")}
                style={{width:widthScreen, height: 200}}
            />
        </View>
    )
}


function FormAdd(props) {
    const {setRestaurantName, setRestaurantAdress ,setRestaurantDescription,setIsVisibleMap}=props
    return(
        <View style={style.viewForm}>
            <Input placeholder="Nombre del restaurante" containerStyle={style.input} onChange={e=> setRestaurantName(e.nativeEvent.text)} />
            <Input placeholder="Dirección"
             containerStyle={style.input}
             onChange={(e)=> setRestaurantAdress(e.nativeEvent.text)} 
             rightIcon={{
                type:"material-community",
                name:"google-maps",
                color:"#c2c2c2",
                onPress:()=>setIsVisibleMap(true)
            }}
             />
            <Input placeholder="Descrpción del restaurante" multiline={true} inputContainerStyle={style.textArea} onChange={(e)=> setRestaurantDescription(e.nativeEvent.text)} />
        </View>
    )
    
}

function UploadImage(props){
    const {toastRef,setImagesSelect,imagesSelect }=props
    const imageSelect= async ()=>{
        // const resultPermissions= await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA);
        const resultPermissionsCamera= resultPermissions.permissions.camera.status;
        // console.log(resultPermissions)
        if(resultPermissionsCamera=== "denied"){
            toastRef.current.show("Es necesario aceptar los permisos de galeria, si los haz rechazdo deberas ir a ajustes y activarlo manualmente.",3000)
        }else{
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing:true,
                aspect:[4,3]
            })
            console.log(result)
            if(result.cancelled){
                toastRef.current.show("has cancelado a la seleccion de imagen",2000)
            }else{
                // setImagesSelect(result.uri)
                setImagesSelect([...imagesSelect,result.uri])
            }
        }
    }
    
    const removeImage=(image) =>{
        // console.log(image)
        const arrayImage= imagesSelect;
        Alert.alert(
            "Eliminar Imagen",
            "¿Estas seguro de eliminar esta image?",
            [
                {
                    text:"Cancel",
                    style:"cancel"
                },
                {
                    text:"Eliminar",
                    onPress:()=>{
                        // console.log("imagen eliminada")
                        setImagesSelect(filter(imagesSelect,(imageURL)=>imageURL!==image))
                    }
                }
            ],
            {cancelable:false}
        )
    }
    return(
        <View style={style.viewImage}>
            {size(imagesSelect) <4 && (
            <Icon type="material-community" name="camera" color="#7a7a7a" containerStyle={style.containerIcon} onPress={imageSelect}/>
            )}
            {
            map(imagesSelect,(imagenesRestaurantes,index)=>(
                <Avatar key={index} style={style.avatarMiniature} source={{uri:imagenesRestaurantes}} onPress={()=>removeImage(imagenesRestaurantes)} />
            ))
            }
        </View>
    )
}


const style =StyleSheet.create({
    scrollView:{
        height:"100%"
    },
    viewForm:{
        marginLeft:10,
        marginRight:10
    },
    input:{
       marginBottom:10 
    },
    textArea:{
        height:100,
        width:"100%",
        padding:0,
        margin:0
     },
     btnAddRestaurant:{
         backgroundColor:"#00a680",
         margin: 20
     },
      viewImage:{
         flexDirection:"row",
         marginLeft:20,
         marginRight:20,
         marginTop:30
      },
      containerIcon:{
         alignItems:"center",
         justifyContent:"center",
         marginRight:10,
         height:70,
         width:70,
         backgroundColor:"#e3e3e3"
      },
      avatarMiniature:{
        width:70,
        height:70,
        marginRight:10
      },
      ViewPhoto:{
          alignItems:"center",
          height:200,
          marginBottom:20
      },
      mapStyle:{
          width:"100%",
          height:550
      }

})