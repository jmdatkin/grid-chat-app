import { FirebaseApp } from "firebase/app";
import { Database, DataSnapshot, getDatabase, onValue, push, ref, set } from "firebase/database";
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
    set(submitNewTextRef, {...text});
};

const onFetchTexts = function(db: Database, cb: (snapshot:DataSnapshot) => void) {
    const textsRef = ref(db, 'texts');
    onValue(textsRef, cb);
};

export { connect, postText, onFetchTexts };