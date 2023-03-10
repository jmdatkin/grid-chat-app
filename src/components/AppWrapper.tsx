import { DataSnapshot } from "firebase/database";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { addSelfToConnectedRoom, onAllTextsReceived, onRoomDataReceived, onTextReceived } from "../firebase";
import { ToastContainer, Zoom } from "react-toastify";
import Point3D from "../types/Point3D";
import Text from "../types/Text";
import CanvasWrapper from "./CanvasWrapper";
import Toolbar from "./Toolbar";
import { useLocation } from "react-router-dom";
import Point2D from "../types/Point2D";
import Sidebar from "./Sidebar";
import Modal from "./Modal";
import ModalLoginForm from "./ModalLoginForm";
import { UserContext } from "../App";
import { CSSTransition } from "react-transition-group";
import '../styles/FadeAnimation.css';
import Spinner from "./Spinner";
import { ClipLoader } from "react-spinners";
import { Room } from "../types/Room";
import RoomContext from "../context/RoomContext";

type AppWrapperProps = {

};

function AppWrapper(props: React.ComponentProps<any>) {

    const [inputPos, setInputPos] = useState<Point2D>({ x: 0, y: 0 });
    const [pos, setPos] = useState<Point3D>({ x: 0, y: 0, z: 1 });
    const getPos = () => pos;

    const [texts, setTexts] = useState<Text[]>([]);
    const [textsLoaded, setTextsLoaded] = useState<boolean>(true);

    const [sidebarHidden, setSidebarHidden] = useState(true);

    const modalRef = useRef(null);

    const user = useContext(UserContext);
    const room = useRef(useContext(RoomContext));

    // Update texts array from Realtime Database
    useEffect(() => {
        console.log(room.current);

        if (room.current === null) return;
        onAllTextsReceived(room.current!.name, (snapshot: DataSnapshot) => {
            const values = snapshot.val();
            let textsArray: Text[] = [];
            if (values) {
                textsArray = Object.values(snapshot?.val());
            };
            setTextsLoaded(true);
            setTexts([...textsArray, ...texts]);
        });

        onTextReceived(room.current!.name, (snapshot: DataSnapshot) => {
            let text: Text = snapshot.val();
            setTexts([text, ...texts]);
            setTextsLoaded(true);
        });

        localStorage.setItem('grid-chat.room', room.current!.name);

    }, []);

    // Periodically save coords to local storage
    useEffect(() => {
        if (room.current === null) return;

        const posFromStorage = JSON.parse(localStorage.getItem('grid-chat.pos')!);
        const roomFromStorage = localStorage.getItem('grid-chat.room');

        console.log(posFromStorage);

        if (posFromStorage && room.current!.name === roomFromStorage)
            setPos(posFromStorage)
    }, []);

    useEffect(() => {
        localStorage.setItem('grid-chat.pos', JSON.stringify(getPos()));
    }, [pos]);

    const loginStage = function () {
        if (localStorage.getItem('grid-chat.credentials-stored') === 'true' && user === null) {
            return (<div className="w-full h-full flex flex-col justify-around items-center">
                {/* <Spinner></Spinner> */}
                <ClipLoader color="rgb(209 213 219)"></ClipLoader>
            </div>)
        } else if (user === null) {
            return <ModalLoginForm></ModalLoginForm>
        } else return (<></>);
    }

    return (
        <div className="AppWrapper">
            <div className="AppLayer" onClick={() => setSidebarHidden(true)}>
                <Sidebar sidebarHidden={sidebarHidden} setSidebarHidden={setSidebarHidden} setUser={props.setUser}></Sidebar>
                <Toolbar
                    pos={pos}
                    setPos={setPos}
                    setSidebarHidden={setSidebarHidden}
                ></Toolbar>
                <CanvasWrapper
                    textsLoaded={textsLoaded}
                    pos={pos}
                    setPos={setPos}
                    inputPos={inputPos}
                    setInputPos={setInputPos}
                    texts={texts}
                ></CanvasWrapper>
            </div>
            {
                user === null ?
                    <CSSTransition nodeRef={modalRef} in={user === null} timeout={200} classNames="fade">
                        <Modal>
                            {/* <Modal> */}
                            {/* <ModalLoginForm></ModalLoginForm> */}
                            {loginStage()}
                        </Modal>
                    </CSSTransition>
                    : <></>
            }
            <ToastContainer
                position="top-right"
                theme="colored"
                autoClose={300}
                transition={Zoom}
            />
        </div>
    );
}

export default AppWrapper;