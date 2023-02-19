import { FirebaseApp } from "firebase/app";
import { Database, DataSnapshot, get, getDatabase, onValue, push, ref, set } from "firebase/database";
import { toast } from "react-toastify";
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

const postText = function(db: Database, text: Text) {
    const textsRef = ref(db, 'texts');
    const submitNewTextRef = push(textsRef);
    set(submitNewTextRef, {...text})
    .then(() => {
        toast("Message successfully saved!");
    });
};

const onFetchTexts = function(db: Database, cb: (snapshot:DataSnapshot) => void) {
    const textsRef = ref(db, 'texts');
    onValue(textsRef, cb);
};

const postRoom = function(db: Database, room: string) {
    const roomRef = ref(db, 'rooms');
    const newRoomRef = push(roomRef);
    set(newRoomRef, {
        name: room
    });
};

const postTextToRoom = function(db: Database, text: Text, room: string) {
   const roomRef = ref(db, 'rooms/' + room);
//    get(roomRef).then(snapshot => {
//     if (!snapshot.exists())
//         postRoom(db, room);
//    })
};

export { connect, postText, onFetchTexts };