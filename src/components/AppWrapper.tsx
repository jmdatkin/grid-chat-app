import { DataSnapshot } from "firebase/database";
import { useEffect, useState } from "react";
import { onFetchTexts } from "../firebase";
import Text from "../types/Text";
import FloatingInput from "./FloatingInput";
import MainCanvasWrapper from "./MainCanvasWrapper";
import Toolbar from "./Toolbar";

function AppWrapper() {

    const [pos, setPos] = useState({ x: 0, y: 0 });
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