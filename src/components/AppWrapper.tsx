import { DataSnapshot } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import { onFetchTexts } from "../firebase";
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

type AppWrapperProps = {

};

function AppWrapper(props: React.ComponentProps<any>) {

    const [pos, setPos] = useState<Point3D>({ x: 0, y: 0, z: 1 });
    const [inputPos, setInputPos] = useState<Point2D>({ x: 0, y: 0 });

    const [texts, setTexts] = useState<Text[]>([]);
    const [textsLoaded, setTextsLoaded] = useState<boolean>(false);

    const [sidebarHidden, setSidebarHidden] = useState(true);

    const user = useContext(UserContext);

    let location = useLocation();

    useEffect(() => {
        onFetchTexts((snapshot: DataSnapshot) => {
            let textsArray: Text[] = Object.values(snapshot.val());
            setTexts([...textsArray, ...texts]);
            setTextsLoaded(true);
        });
        console.log(location.pathname);
    }, []);


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
                    <Modal>
                        <ModalLoginForm></ModalLoginForm>
                    </Modal> : <></>
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