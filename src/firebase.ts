// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { User, getAuth, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { connect } from "./services/firebase-firestore";
import Text from "./types/Text";
import { DataSnapshot, DatabaseReference, get, onChildAdded, onChildChanged, onChildRemoved, onDisconnect, onValue, push, ref, remove, runTransaction, set } from "firebase/database";
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

let userPresenceRef: DatabaseReference | null = null;

//Requirements
// get all texts
// get room data
// get all texts from room
// post text to room
// get all open rooms
// get all users users by room

const onUserEnterRoom = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);
  return onChildAdded(usersInRoomRef, cb);
}

const onUserInRoomUpdate = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);
  onChildChanged(usersInRoomRef, cb);
}


const isSelfInRoom = async function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);

  let userAlreadyInRoom = false;

  const usersInRoom = await get(usersInRoomRef)

  if (!usersInRoom.exists()) return Promise.resolve(userAlreadyInRoom);

  Object.values(usersInRoom.val()).forEach((user: any) => {
    console.log(user.uid, auth.currentUser!.uid);
    if (user.uid === auth.currentUser!.uid)
      userAlreadyInRoom = true;
  })

  console.log('userAlreadyInRoom', userAlreadyInRoom);

  return Promise.resolve(userAlreadyInRoom);
};

const getOwnPresenceKey = async function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);

  let presenceKey = null;

  const usersInRoom = await get(usersInRoomRef);

  if (usersInRoom.exists()) {
    Object.entries(usersInRoom.val()).forEach((entry: any) => {
      const [key, val] = entry;
      if (val.uid === auth.currentUser!.uid)
        presenceKey = key;
    });
  }

  return presenceKey;
}

const initializeUser = async function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);

  let newUserRef = null;


  //TODO: fix problem of closing browser window but key remains in localStorage that points to non-existent presence

  if (localStorage.getItem('grid-chat.presence-ref-key')) {
    newUserRef = ref(db, `rooms/${room}/users/${localStorage.getItem('grid-chat.presence-ref-key')}`);
    if (!(await get(newUserRef)).exists()) {
      newUserRef = null;
    }
  } else {
    newUserRef = await getOwnPresenceKey(room);
  }

  if (newUserRef === null) {
    const presenceKey = await getOwnPresenceKey(room);
    if (presenceKey === null) {
      newUserRef = push(usersInRoomRef, {
        uid: auth.currentUser!.uid,
        displayName: auth.currentUser!.displayName,
        email: auth.currentUser!.email,
      });
    } else {
      newUserRef = ref(db, `rooms/${room}/users/${presenceKey}`);
    }
    localStorage.setItem('grid-chat.presence-ref-key', newUserRef.key!);
  }

  userPresenceRef = newUserRef;

  return newUserRef;
}

const userSignOut = function () {
  localStorage.removeItem('grid-chat.presence-ref-key');
  if (userPresenceRef !== null) {
    return remove(userPresenceRef!).then(() => signOut(auth))
  }
  else {
    return signOut(auth);
  }
};

const _updateProfile = function(user: User, data: {displayName?: string, photoUrl?: string}) {
  updateProfile(user, data)
  .then(() => {
    set(userPresenceRef!, {
      displayName: data.displayName
    })
  })
}

const removeSelfFromConnectedRoom = async function (room: string) {
  const usersInRoomRef = ref(db, `rooms/${room}/users`);

  const users = await get(usersInRoomRef);

  users.forEach(snapshot => {
    const uid = snapshot.val().uid;
    if (uid !== auth.currentUser!.uid) return;
    const removeUserRef = ref(db, `rooms/${room}/users/${snapshot.key}`);
    remove(removeUserRef);
  });
};

const onUserDisconnect = function (room: string, userKey: string) {
  const presenceRef = ref(db, `rooms/${room}/users/${userKey}`);
  return onDisconnect(presenceRef).remove();
};

const onUsersReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/users`;
  const usersRef = ref(db, pathString);
  return onValue(usersRef, cb);
}


const onAllTextsReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/texts`;
  const textsRef = ref(db, pathString);
  return onValue(textsRef, cb);
}

const onTextReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const pathString = room == '' || !room ? 'texts' : `rooms/${room}/texts`;
  const textsRef = ref(db, pathString);
  return onChildAdded(textsRef, cb);
}

const onRoomDataReceived = function (room: string, cb: (snapshot: DataSnapshot) => void) {
  const roomRef = ref(db, `rooms/${room}`);
  return onValue(roomRef, cb);
};

const createRoom = function (room: string) {
  const roomRef = ref(db, `rooms/${room}`);
  set(roomRef, {
    owner: auth.currentUser!.uid,
    texts: [],
    usersUsers: [],
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

export {
  onUserEnterRoom,
  onUserInRoomUpdate,
  onAllTextsReceived,
  onTextReceived,
  onUsersReceived,
  createRoom,
  postTextToRoom,
  onRoomDataReceived,
  roomExists,
  isSelfInRoom,
  removeSelfFromConnectedRoom,
  onUserDisconnect,
  userSignOut,
  initializeUser,
  _updateProfile as updateProfile,
  auth
};