import React, { useEffect, useRef, useState } from "react";
import { FONT_FAMILY, FONT_SIZE } from "../constants";
import { postText } from "../../lib/firebase";
import { filter } from "../services/profanity-filter";
import Point2D from "../types/Point2D";
import Point3D from "../types/Point3D";

type FloatingInputProps = {
    pos: Point3D,
    inputPos: Point2D
};

function FloatingInput(props: FloatingInputProps) {

    const floatingInputDiv = useRef(null);
    const floatingInput = useRef(null);

    const [value, setValue] = useState('');

    useEffect(() => {
        const inputElement: HTMLInputElement = floatingInput.current!;
        inputElement.style.fontFamily = FONT_FAMILY;
        inputElement.style.fontSize = `${FONT_SIZE}px`; 
    }, []);
    
    useEffect(() => {
        const inputDivElement: HTMLDivElement = floatingInputDiv.current!;
        const inputElement: HTMLInputElement = floatingInput.current!;
        inputDivElement.style.display = "block";
        inputDivElement.style.left = props.inputPos.x+"px";
        inputDivElement.style.top = props.inputPos.y+"px";
        inputElement.value = '';
        inputElement.focus();
    }, [props.inputPos]);

    const onInputChange = function(e: React.FormEvent<HTMLInputElement>) {
        setValue(e.currentTarget.value);
    };

    const onBlur = function(e: React.FormEvent<HTMLInputElement>) {
        const inputDivElement: HTMLDivElement = floatingInputDiv.current!;
        inputDivElement.style.display = "none";
    };

    const onKeyPress = function(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            postText({
                x: props.pos.x + props.inputPos.x*props.pos.z,
                y: props.pos.y + props.inputPos.y*props.pos.z,
                content: filter.clean(value)
            });
            e.currentTarget.blur();
        }
    };

    return (
        <div ref={floatingInputDiv} className="FloatingInputWrapper">
            <input className="FloatingInput"
            ref={floatingInput}
            onChange={onInputChange}
            onKeyDown={onKeyPress}
            onBlur={onBlur}
            ></input>
        </div>
    )
}

export default FloatingInput;