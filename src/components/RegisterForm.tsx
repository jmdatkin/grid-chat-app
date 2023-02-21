import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Button from "./Button";
import InputText from "./InputText";

function RegisterForm(props: any) {

    const [transitionClass, setTransitionClass] = useState('fade-enter')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setTimeout(() => setTransitionClass('fade-enter-active'), 100);
    }, []);

    return (
        <div className={`${transitionClass} w-full transition-all duration-200`}>
            <a onClick={() => props.setLoginMethod(null)} className="absolute left-4 top-4 hover:underline cursor-pointer transition-all duration-75">Back</a>
            <div className="w-full flex flex-col items-center space-y-2">
                <form className="space-y-2">
                    <InputText icon={faUser} placeholder="E-mail" handleChange={(e: any) => setUsername(e.target.value)}></InputText>
                    <InputText icon={faKey} placeholder="Password" handleChange={(e: any) => setPassword(e.target.value)} password></InputText>
                    <Button label="Register" handleClick={() => props.login({ email: username, password })}></Button>
                </form>

            </div>
        </div>
    );
}

export default RegisterForm;