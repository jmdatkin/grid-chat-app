import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth';
import { DataSnapshot, onDisconnect } from 'firebase/database';
import { createContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import './App.css';
import AppWrapper from './components/AppWrapper';
import MainCanvasWrapper from './components/CanvasWrapper';
import { addSelfToConnectedRoom, auth, onRoomDataReceived, onUserDisconnect, removeSelfFromConnectedRoom } from './firebase';
import { Room } from './types/Room';

const RoomContext = createContext<Room | null>(null);
const UserContext = createContext<User | null>(null);

function App() {

  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  const location = useLocation();
  const roomName = useRef(location.pathname.substring(1));

  useEffect(() => {

    let userConnectedKey: string | null = null;

    onRoomDataReceived(roomName.current, (snapshot: DataSnapshot) => {
      let room = snapshot.val();
      if (room) {
        setRoom({
          name: roomName.current,
          ...room
        });
      }
    });

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        userConnectedKey = addSelfToConnectedRoom(roomName.current);
        if (localStorage.getItem('grid-chat.credentials-stored') !== 'true') toast("Successfully logged in!");
        localStorage.setItem('grid-chat.credentials-stored', 'true');
      } else {
        localStorage.setItem('grid-chat.credentials-stored', 'false');
      }
    });

    onUserDisconnect(roomName.current, (userConnectedKey as any) as string)

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

export { App, UserContext };
