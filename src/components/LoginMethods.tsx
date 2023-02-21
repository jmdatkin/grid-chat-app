import { faChevronRight, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import LoginMethod from "../types/LoginMethod";
import LoginMethodButton from "./LoginMethodButton";
import Tagline from "./Tagline";

function LoginMethods(props: any) {
    const [transitionClass, setTransitionClass] = useState('fade-slide-enter')

    useEffect(() => {
        setTimeout(() => setTransitionClass('fade-slide-enter-active'), 100);
    }, []);

    return (
        <div className={`${transitionClass} transition-all duration-200 p-2 md:p-8 lg:p-12 w-full flex flex-col items-center space-y-2`}>
            {/* <span className="text-gray-400">Join now <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></span> */}
            <Tagline className="text-gray-400">
            </Tagline>
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.GUEST); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-300" icon={faUser}></FontAwesomeIcon>}>
                Guest
            </LoginMethodButton>
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.EMAIL); }} icon={<FontAwesomeIcon className="w-full h-full text-gray-600" icon={faEnvelope}></FontAwesomeIcon>}>
                Email and Password
            </LoginMethodButton>
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.GOOGLE); }} icon={<img className="w-full h-full" src='google.svg' />}>
                Google
            </LoginMethodButton>
        </div>
    );
}

export default LoginMethods;