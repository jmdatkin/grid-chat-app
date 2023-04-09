import { DataSnapshot } from "firebase/database";
import { createContext, useContext, useRef, useState } from "react";
import { RouteContext } from "react-router/dist/lib/context";
import { onRoomDataReceived } from "../firebase";
import { Room } from "../types/Room";

const RoomContext = createContext<Room | null>(null);

function RoomProvider(props: any) {
    
    const [room, setRoom] = useState<Room | null>(null);
    const roomName = useRef(useContext(RouteContext).matches[0].pathname);
    
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

    return ( 
        <RoomContext.Provider value={room}>
            {props.children}
        </RoomContext.Provider>
     );
}

export default RoomProvider;