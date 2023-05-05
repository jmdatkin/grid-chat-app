import { faSave } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import InputText from "./InputText";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";

function ProfileDialog(props: any) {

    const [displayName, setDisplayName] = useState('');

    const save = function () {
        if (auth.currentUser !== null) {
            updateProfile(auth.currentUser, {
                displayName
            });
        }
        props.setDialogModalOpen(false);
    };

    return (
        <div className="md:rounded w-full h-full flex flex-col bg-zinc-50">
            <div className="md:rounded-tl md:rounded-tr w-full border-b p-4 bg-zinc-700 text-zinc-50">
                <h1>Settings</h1>
            </div>
            <div className="grow flex flex-col p-8">
                <h4>Display Name</h4>
                <InputText handleChange={(e: any) => {setDisplayName(e.target.value)}}></InputText>
            </div>
            <div className="flex justify-end p-4">
                <Button handleClick={save} style="outline" icon={faSave}></Button>

            </div>
        </div>
    );
}

export default ProfileDialog;