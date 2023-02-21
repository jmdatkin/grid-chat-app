import LoginMethodButton from "./LoginMethodButton";
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { AuthError, GoogleAuthProvider, signInAnonymously, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import '../styles/FadeAnimation.css';
import InputText from "./InputText";
import { CSSTransition } from 'react-transition-group';
import LoginMethod from "../types/LoginMethod";
import LoginMethods from "./LoginMethods";
import EmailLoginForm from "./EmailLoginForm";


function ModalLoginForm(props: any) {

    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [inProp, setInProp] = useState(false);
    const [loginMethod, setLoginMethod] = useState<LoginMethod | null>(null);

    const [loginComponent, setLoginComponent] = useState<any>(null);
    const loginComponentEl = useRef(null);

    useEffect(() => {
        switch (loginMethod) {
            case LoginMethod.EMAIL:
                setLoginComponent(<EmailLoginForm setLoginMethod={setLoginMethod} login={login}></EmailLoginForm>);
                break;

            case LoginMethod.GOOGLE:
                login();
                break;

            case LoginMethod.GUEST:
                login();
                break;

            default:
                setLoginComponent(<LoginMethods setLoginMethod={setLoginMethod}></LoginMethods>);

        }
    }, [loginMethod])

    const login = function (params?: any) {
        switch (loginMethod) {
            case LoginMethod.GUEST:
                signInAnonymously(auth)
                    .catch((error: AuthError) => {
                        setErrorCode(error.code);
                        setErrorMessage(error.message);
                        console.error(errorCode, errorMessage);
                    });
                break;
            case LoginMethod.EMAIL:
                signInWithEmailAndPassword(auth, params.email, params.password)
                    .catch((error: AuthError) => {
                        console.log(error);
                        setErrorCode(error.code);
                        setErrorMessage(error.message);
                        console.error(errorCode, errorMessage);
                    });
                break;
            case LoginMethod.GOOGLE:
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider)
                    .catch((error: AuthError) => {
                        setErrorCode(error.code);
                        setErrorMessage(error.message);
                        console.error(errorCode, errorMessage);
                    });
                break;
        }
    };

    return (
        <div className="w-full h-3/4 bg-white border rounded shadow-md grid grid-rows-2 desktop:grid-rows-1 desktop:grid-cols-2">
            <div className="bg-zinc-800 flex flex-col justify-around items-center">
                <span className="text-white text-4xl font-semibold">Grid Chat</span>
            </div>
            <div className="flex flex-col justify-around items-center relative h-full">
                {loginComponent}
            </div>
        </div>
    );
}

export default ModalLoginForm;