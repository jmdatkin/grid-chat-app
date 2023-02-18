import InputText from "./InputText";
import '../styles/LoginForm.css';
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

function LoginForm(props: any) {
    return ( 
        <div className="LoginForm">
            <strong>Sign In</strong>
            <InputText icon={faUser} placeholder="Email"></InputText>
            <InputText icon={faKey} placeholder="Password" password></InputText>
            <Button label="Sign In"></Button>
        </div>
     );
}

export default LoginForm;