import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginMethod from "../types/LoginMethod";
import LoginMethodButton from "./LoginMethodButton";

function LoginMethods(props: any) {
    return (
        <div className="p-2 md:p-8 lg:p-12 w-full flex flex-col items-center space-y-2">
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.GUEST);}} icon={<FontAwesomeIcon className="w-full h-full text-gray-300" icon={faUser}></FontAwesomeIcon>}>
                Guest
            </LoginMethodButton>
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.EMAIL);}} icon={<FontAwesomeIcon className="w-full h-full text-gray-600" icon={faEnvelope}></FontAwesomeIcon>}>
                Email and Password
            </LoginMethodButton>
            <LoginMethodButton clickHandler={() => { props.setLoginMethod(LoginMethod.GOOGLE); }} icon={<img className="w-full h-full" src='google.svg' />}>
                Google Account
            </LoginMethodButton>
        </div>
    );
}

export default LoginMethods;