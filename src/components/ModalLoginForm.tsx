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


function ModalLoginForm(props: any) {

    const [errorCode, setErrorCode] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [inProp, setInProp] = useState(false);
    const [loginMethod, setLoginMethod] = useState<LoginMethod | null>(null);

    const [loginComponent, setLoginComponent] = useState<any>(null);
    const loginComponentEl = useRef(null);

    useEffect(() => {
        switch (loginMethod) {
            case null:
                setLoginComponent((
                    <div ref={loginComponentEl} className="p-24 w-full flex flex-col items-center space-y-2">
                        <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.GUEST); login(); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-300" icon={faUser}></FontAwesomeIcon>}>
                            Guest
                        </LoginMethodButton>
                        <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.EMAIL); login(); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-600" icon={faEnvelope}></FontAwesomeIcon>}>
                            Email and Password
                        </LoginMethodButton>
                        <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.GOOGLE); login(); }} icon={<img className="w-full h-full" src='google.svg' />}>
                            Google Account
                        </LoginMethodButton>
                    </div>
                ));
                break;

            case LoginMethod.EMAIL:
                setInProp(true);
                setLoginComponent((
                    <div ref={loginComponentEl} className="p-24 w-full flex flex-col items-center space-y-2">
                        <InputText></InputText>
                        <InputText></InputText>
                    </div>
                ));
                break;

            default:
                setLoginComponent((<div></div>));

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
            <div className="flex flex-col justify-around items-center">
                <div className="p-2 md:p-8 lg:p-12 w-full flex flex-col items-center space-y-2">
                    <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.GUEST); login(); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-300" icon={faUser}></FontAwesomeIcon>}>
                        Guest
                    </LoginMethodButton>
                    <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.EMAIL); login(); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-600" icon={faEnvelope}></FontAwesomeIcon>}>
                        Email and Password
                    </LoginMethodButton>
                    <LoginMethodButton clickHandler={() => { setLoginMethod(LoginMethod.GOOGLE); login(); }} icon={<img className="w-full h-full" src='google.svg' />}>
                        Google Account
                    </LoginMethodButton>
                </div>
                {/* <CSSTransition nodeRef={loginComponentEl} in={inProp} classNames="fade"> */}
                {/* </CSSTransition> */}
            </div>
        </div>
    );
}

export default ModalLoginForm;