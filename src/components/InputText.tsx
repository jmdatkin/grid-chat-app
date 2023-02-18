import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, useState } from "react";
import {styles} from '@/styles/InputText.module.css';

function InputText(props: any) {

    const [value, setValue] = useState('');

    const onChangeHandler: ChangeEventHandler = function(e) {
        setValue((e.target as HTMLInputElement).value);
    }

    return ( 
        <div className="InputText">
            {props.icon ?
            <FontAwesomeIcon icon={props.icon}></FontAwesomeIcon> : <></>}
            <input type={props.password ? 'password' : 'text'} placeholder={props.placeholder} onChange={onChangeHandler}></input>
        </div>
     );
}

export default InputText;