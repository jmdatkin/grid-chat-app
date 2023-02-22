import { FirebaseApp } from "firebase/app";
import { Database, DataSnapshot, get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";
import { REPL_MODE_SLOPPY } from "repl";
import { auth } from "../firebase";
import Text from "../types/Text";

let database: Database | null = null;

const connected = () => {
    if (database === null)
        throw new Error('Database not initialized!');
    return true;
};

const connect = function (app: FirebaseApp) {
    // TODO: Replace the following with your app's Firebase project configuration
    // See: https://firebase.google.com/docs/web/learn-more#config-object
    const firebaseConfig = {
        // ...
        // The value of `databaseURL` depends on the location of the database
        databaseURL: "https://grid-chat-app-default-rtdb.firebaseio.com/",
    };

    // Initialize Realtime Database and get a reference to the service
    const database = getDatabase(app);
    return database;
}

const postText = function (db: Database, text: Text) {
    const textsRef = ref(db, 'texts');
    const submitNewTextRef = push(textsRef);
    set(submitNewTextRef, { ...text })
        .then(() => {
            toast("Message successfully saved!");
        });
};

const onFetchTexts = function (db: Database, cb: (snapshot: DataSnapshot) => void) {
    const textsRef = ref(db, 'texts');
    onValue(textsRef, cb);
};

const onFetchTextsFromRoom = function (db: Database, room: string, cb: (snapshot: DataSnapshot) => void) {
    const roomRef = ref(db, 'rooms/' + room);
    get(roomRef).then(snapshot => {
        console.log(snapshot.exists());
        if (!snapshot.exists())
            postRoom(db, room);
    });
    
    const textsRef = ref(db, `rooms/${room}/texts`);
    onValue(textsRef, cb);
};

// const postRoom = function (db: Database, room: string) {
//     const roomRef = ref(db, 'rooms');
//     const newRoomRef = push(roomRef);
//     set(newRoomRef, {
//         name: room,
//         owner: auth.currentUser!.uid,
//         texts: [],
//     });
// };

const postRoom = function (db: Database, room: string) {
    const roomRef = ref(db, 'rooms/'+room);
    // const newRoomRef = push(roomRef);
    console.log(auth.currentUser!.uid);
    set(roomRef, {
        owner: auth.currentUser!.uid,
        texts: [],
    });
};

const postTextToRoom = function (db: Database, room: string, text: Text) {
    const textsRef = ref(db, 'rooms/' + room + '/texts');
    // get(roomRef).then(snapshot => {
    //     if (!snapshot.exists())
    //         postRoom(db, room);
    // })    const submitNewTextRef = push(textsRef);
    const submitNewTextRef = push(textsRef);
    set(submitNewTextRef, { ...text })
        .then(() => {
            toast("Message successfully saved!");
        });

};

export { connect, postText, onFetchTexts, onFetchTextsFromRoom, postTextToRoom };