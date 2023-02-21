import InputText from "./InputText";
import '../styles/LoginForm.css';
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { useState } from "react";
import { AuthErrorCodes, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function LoginForm(props: any) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const signInAction = function () {
        console.log(username, password);
        createUserWithEmailAndPassword(auth, username, password)
            // .then(userCredential => {
            //     // props.setUser(userCredential.user);
            // })
            .catch(error => {
                if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                    signInWithEmailAndPassword(auth, username, password)
                    .catch(console.log)
                        // .then(userCredential => {
                        //     props.setUser(userCredential.user);
                        // });
                } else {
                    console.log(error.code, error.message);
                }
            });
    }


    return (
        <div className="LoginForm">
            <strong>Sign In</strong>
            <form className="space-y-2">
            <InputText icon={faUser} placeholder="Email" handleChange={(e: any) => setUsername(e.target.value)}></InputText>
            <InputText icon={faKey} placeholder="Password" handleChange={(e: any) => setPassword(e.target.value)} password></InputText>
            <Button label="Sign In" handleClick={signInAction}></Button>
            </form>
        </div>
    );
}

export default LoginForm;