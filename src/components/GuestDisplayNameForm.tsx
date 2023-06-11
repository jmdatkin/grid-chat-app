import InputText from "./InputText";
import '../styles/FadeAnimation.css';
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";

function GuestDisplayNameForm(props: any) {

    const [transitionClass, setTransitionClass] = useState('fade-slide-enter')

    const uniqueNameGen = useRef(uniqueNamesGenerator({
        dictionaries: [colors, adjectives, animals],
        style: 'capital',
        separator: ''
    }));

    const [displayName, setDisplayName] = useState(uniqueNameGen.current);

    useEffect(() => {
        setTimeout(() => setTransitionClass('fade-slide-enter-active'), 100);
    }, []);

    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        props.login({displayName});
    };

    return (
        <div className={`${transitionClass} !static w-full transition-all duration-200`}>
            <Button label="Back" style="outline" handleClick={() => props.setLoginMethod(null)} className="absolute left-4 top-4"></Button>
            <div className="w-full flex flex-col items-center">
                <form className="w-3/4">
                    <div className="space-y-2 w-full flex flex-col">
                    <InputText value={displayName} icon={faUser} placeholder="Display Name" handleChange={(e: any) => setDisplayName(e.target.value)}></InputText>
                    <Button className="self-end" label="Sign In" handleClick={() => props.login({displayName})}></Button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default GuestDisplayNameForm;