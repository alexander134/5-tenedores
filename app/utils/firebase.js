 import firebase from "firebase/app"

const firebaseConfig={
    apiKey: "AIzaSyD4XTp23YCnBvsLqLxrBV5xr1A4HxHKbag",
    authDomain: "tenedores-3d7c2.firebaseapp.com",
    projectId: "tenedores-3d7c2",
    storageBucket: "tenedores-3d7c2.appspot.com",
    messagingSenderId: "683474096650",
    appId: "1:683474096650:web:4b62820bc4526df73ac5f3"
  };

  export const firebaseApp =firebase.initializeApp(firebaseConfig);