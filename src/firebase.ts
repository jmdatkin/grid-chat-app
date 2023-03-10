// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { connect } from "./services/firebase-firestore";
import Text from "./types/Text";
import { DataSnapshot, get, onChildAdded, onChildChanged, onChildRemoved, onDisconnect, onValue, push, ref, remove, set } from "firebase/database";
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

//Requirements
// get all texts
// get room data
// get all texts from room
// post text to room
// get all open rooms
// get all connected users by room

const onUserEnterRoom = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const usersInRoomRef = ref(db, `rooms/${room}/connected`);
  onChildAdded(usersInRoomRef, cb);
}

const onUserInRoomUpdate = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const usersInRoomRef = ref(db, `rooms/${room}/connected`);
  onChildChanged(usersInRoomRef, cb);
}

const addSelfToConnectedRoom = function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/connected`);
  const newUserRef = push(usersInRoomRef, {
    uid: auth.currentUser!.uid,
    displayName: auth.currentUser?.displayName,
    email: auth.currentUser!.email
  });
  return newUserRef.key;
};

const removeSelfFromConnectedRoom = async function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/connected`);

  const users = await get(usersInRoomRef);

  console.log(users.val());

  users.forEach(snapshot => {
    const uid = snapshot.val().uid;
    if (uid !== auth.currentUser!.uid) return;
    const removeUserRef = ref(db, `rooms/${room}/connected/${snapshot.key}`);
    remove(removeUserRef);
  });

  // const users.forEach()

  // const newUserRef = push(usersInRoomRef, {
  //   uid: auth.currentUser!.uid,
  //   displayName: auth.currentUser?.displayName,
  //   email: auth.currentUser!.email
  // });
};

const onUserDisconnect = function(room: string, userKey: string) {
  const presenceRef = ref(db, `rooms/${room}/connected/userKey`);
  onDisconnect(presenceRef).remove();
};

const onAllUsersInRoomReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/connected`;
  const usersRef = ref(db, pathString);
  onValue(usersRef, cb);
}


const onAllTextsReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/texts`;
  const textsRef = ref(db, pathString);
  onValue(textsRef, cb);
}

const onTextReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/texts`;
  const textsRef = ref(db, pathString);
  onChildAdded(textsRef, cb);
}

const createRoom = function (room: string) {
  const roomRef = ref(db, `rooms/${room}`);
  set(roomRef, {
    owner: auth.currentUser!.uid,
    texts: [],
    connectedUsers: [],
    open: false,
    allowList: [],
  });
};

const roomExists = function (room: string) {
  const roomRef = ref(db, `rooms/${room}`);
  let exists = undefined;
  get(roomRef).then(snapshot => {
    exists = snapshot.exists();
  });
  return exists;
}

const postTextToRoom = function (room: string, text: Text, cb?: any) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/texts`;
  const textsRef = ref(db, pathString);
  const submitNewTextRef = push(textsRef);
  return set(submitNewTextRef, { ...text });
};

export { onUserEnterRoom, onUserInRoomUpdate, onAllTextsReceived, onTextReceived, onRoomDataReceived, createRoom, postTextToRoom, roomExists, addSelfToConnectedRoom, removeSelfFromConnectedRoom, onUserDisconnect, auth };