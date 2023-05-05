import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { DataSnapshot, DatabaseReference, onDisconnect, ref } from 'firebase/database';
import { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.css';
import AppWrapper from './components/AppWrapper';
import MainCanvasWrapper from './components/CanvasWrapper';
import { auth, getOrAddPresenceRef, isSelfInRoom, onRoomDataReceived, onUserDisconnect, removeSelfFromConnectedRoom } from './firebase';
import { Room } from './types/Room';

const RoomContext = createContext<Room | null>(null);
const UserContext = createContext<User | null>(null);

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [presenceRef, setPresenceRef] = useState<DatabaseReference | null>(null);


  const location = useLocation();
  const roomName = useRef(location.pathname.substring(1));

  const connected = useRef(false);

  useEffect(() => {

    console.log(localStorage.getItem('grid-chat.presence-ref-key'));

    let presenceRef: DatabaseReference | null = null;

    onRoomDataReceived(roomName.current, (snapshot: DataSnapshot) => {
      let room = snapshot.val();
      console.log(room);
      if (room) {
        setRoom({
          name: roomName.current,
          ...room
        });
      }
    });

    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        if (!connected.current) {

          presenceRef = await getOrAddPresenceRef(roomName.current);
          onDisconnect(presenceRef).remove();

          if (localStorage.getItem('grid-chat.credentials-stored') !== 'true') toast("Successfully logged in!");
          localStorage.setItem('grid-chat.credentials-stored', 'true');
          connected.current = true;
        }
      } else {
        localStorage.setItem('grid-chat.credentials-stored', 'false');
      }
    });

    return () => {
      unsubscribeAuthStateChanged();
    }
  }, []);

  return (
    <RoomContext.Provider value={room}>
      <UserContext.Provider value={user}>
        <div className="App">
          <AppWrapper></AppWrapper>
        </div>
      </UserContext.Provider>
    </RoomContext.Provider>
  );
}

export { App, UserContext, RoomContext };
