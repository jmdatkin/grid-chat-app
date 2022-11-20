import { DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";
import { onFetchTexts } from "../firebase";
import Point3D from "../types/Point3D";
import Text from "../types/Text";
import FloatingInput from "./FloatingInput";
import MainCanvasWrapper from "./MainCanvasWrapper";
import Toolbar from "./Toolbar";

function AppWrapper() {

    const [pos, setPos] = useState<Point3D>({ x: 0, y: 0, z: 1 });
    const [inputPos, setInputPos] = useState({ x: 0, y: 0 });

    const [texts, setTexts] = useState<Text[]>([]);

    useEffect(() => {
        onFetchTexts((snapshot: DataSnapshot) => {
            let textsArray: Text[] = Object.values(snapshot.val());
            setTexts([...textsArray, ...texts]);
        });
    }, []);

    return (
        <div className="AppWrapper">
            <Toolbar
                pos={pos}
                setPos={setPos}
            ></Toolbar>
            <MainCanvasWrapper
                pos={pos}
                setPos={setPos}
                inputPos={inputPos}
                setInputPos={setInputPos}
                texts={texts}
            ></MainCanvasWrapper>
        </div>
    );
}

export default AppWrapper;