import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import '../styles/InputText.css';

type InputTextProps = {
    handleChange: Function
};

function InputText(props: any) {

    return ( 
        <div className="InputText">
            {props.icon ?
            <FontAwesomeIcon icon={props.icon} className="mx-3"></FontAwesomeIcon> : <></>}
            <input type={props.password ? 'password' : 'text'} placeholder={props.placeholder} onChange={props.handleChange}></input>
        </div>
     );
}

export default InputText;