import InputText from "./InputText";
import '../styles/FadeAnimation.css';
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import Button from "./Button";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

function EmailLoginForm(props: any) {

    const [transitionClass, setTransitionClass] = useState('fade-slide-enter')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setTimeout(() => setTransitionClass('fade-slide-enter-active'), 100);
    }, []);

    return (
        <div className={`${transitionClass} !static w-full transition-all duration-200`}>
            <Button label="Back" style="outline" handleClick={() => props.setLoginMethod(null)} className="absolute left-4 top-4"></Button>
            <div className="w-full flex flex-col items-center">
                <form className="w-3/4">
                    <div className="space-y-2 w-full flex flex-col">
                    <InputText className="" icon={faUser} placeholder="E-mail" handleChange={(e: any) => setUsername(e.target.value)}></InputText>
                    <InputText icon={faKey} placeholder="Password" handleChange={(e: any) => setPassword(e.target.value)} password></InputText>
                    <Button className="self-end" label="Sign In" handleClick={() => props.login({email: username,password})}></Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EmailLoginForm;