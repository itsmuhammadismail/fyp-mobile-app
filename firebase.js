
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB-3XRNbsmoC4AHZ8ktxgM6zW2MGMdeb8k",
  authDomain: "fyp2-final.firebaseapp.com",
  projectId: "fyp2-final",
  storageBucket: "fyp2-final.appspot.com",
  messagingSenderId: "774069750235",
  appId: "1:774069750235:web:ae5c7aa1ef368164e33ffe",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const database = firebase.database()

export { auth, database };

