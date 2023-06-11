import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
// import '../styles/InputText.css';

type InputTextProps = {
    handleChange: Function
};

function InputText(props: any) {

    return ( 
        <div className={`flex items-center ${props.className}`}>
            {props.icon ?
            <FontAwesomeIcon icon={props.icon} className="w-4 mx-3 text-gray-300"></FontAwesomeIcon> : <></>}
            <input className="p-2 w-full outline-none border bg-zinc-50 text-black rounded-sm focus:ring-2 ring-blue-500/40" value={props.value} type={props.password ? 'password' : 'text'} placeholder={props.placeholder} onChange={props.handleChange}></input>
        </div>
     );
}

export default InputText;