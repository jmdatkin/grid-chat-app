import { DataSnapshot } from "firebase/database";
import React, { useEffect, useState } from "react";
import { onFetchTexts } from "../../lib/firebase";
import { ToastContainer, Zoom } from "react-toastify";
import Point3D from "../types/Point3D";
import Text from "../types/Text";
import CanvasWrapper from "./CanvasWrapper";
import Toolbar from "./Toolbar";
import Point2D from "../types/Point2D";
import Sidebar from "./Sidebar";

type AppWrapperProps = {

};

function AppWrapper(props: React.ComponentProps<any>) {

    const [pos, setPos] = useState<Point3D>({ x: 0, y: 0, z: 1 });
    const [inputPos, setInputPos] = useState<Point2D>({ x: 0, y: 0 });

    const [texts, setTexts] = useState<Text[]>([]);
    const [textsLoaded, setTextsLoaded] = useState<boolean>(false);

    const [sidebarHidden, setSidebarHidden] = useState(true);


    useEffect(() => {
        onFetchTexts((snapshot: DataSnapshot) => {
            let textsArray: Text[] = Object.values(snapshot.val());
            setTexts([...textsArray, ...texts]);
            setTextsLoaded(true);
        });
    }, []);


    return (
        <div className="AppWrapper">
            <div className="AppLayer" onClick={() => setSidebarHidden(true)}>
                <Sidebar sidebarHidden={sidebarHidden} setSidebarHidden={setSidebarHidden}></Sidebar>
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