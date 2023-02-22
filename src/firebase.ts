// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { connect, onFetchTexts, onFetchTextsFromRoom, postText, postTextToRoom } from "./services/firebase-firestore";
import Text from "./types/Text";
import { DataSnapshot } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYfYe0wamepTsZHbFemTOPyCtmYfmij6w",
  authDomain: "grid-chat-app.firebaseapp.com",
  databaseURL: "https://grid-chat-app-default-rtdb.firebaseio.com",
  projectId: "grid-chat-app",
  storageBucket: "grid-chat-app.appspot.com",
  messagingSenderId: "95163677897",
  appId: "1:95163677897:web:577421a2bc49f58599a118",
  measurementId: "G-59XERQDFWD"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = connect(app);

const auth = getAuth(app);

const postTextToDb = (text: Text) => postText(db,text);
const postTextToRoomToDb = (room: string, text: Text) => postTextToRoom(db, room, text);

const fetchTextsFromDb = (cb: (snapshot: DataSnapshot) => void) => onFetchTexts(db, cb)
const fetchTextsFromRoomDb = (room:string, cb: (snapshot: DataSnapshot) => void) => onFetchTextsFromRoom(db, room, cb)

export { postTextToDb as postText, fetchTextsFromDb as onFetchTexts, fetchTextsFromRoomDb as onFetchTextsFromRoom, postTextToRoomToDb as postTextToRoom, auth };