import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDPuiVtAcUMj0JlsoL17b5canmQDsXNmMw",
  authDomain: "iot-hydro.firebaseapp.com",
  databaseURL: "https://iot-hydro.firebaseio.com",
  projectId: "iot-hydro",
  storageBucket: "iot-hydro.appspot.com",
  messagingSenderId: "631934233453"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  auth,
  db,
};