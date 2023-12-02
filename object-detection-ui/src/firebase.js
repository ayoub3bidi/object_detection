import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDmaLwmn7MvJw1SSpu7Nw42xzkJLwhPSI4",
    authDomain: "mqtt-broker-database.firebaseapp.com",
    databaseURL: "https://mqtt-broker-database-default-rtdb.firebaseio.com",
    projectId: "mqtt-broker-database",
    storageBucket: "mqtt-broker-database.appspot.com",
    messagingSenderId: "1014725616265",
    appId: "1:1014725616265:web:ac8c3cafd4e6e7181e5c58"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
