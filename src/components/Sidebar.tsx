import IconButton from "./IconButton";
import '../styles/Sidebar.css';
import { faRightFromBracket, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../App";
import { Tooltip } from "react-tooltip";
import LoginForm from "./LoginForm";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function,
    setUser: Function
};

const signOutHandler = function () {
    console.log('HILSADJ')
    signOut(auth)
        .then(() => window.location.href = window.location.href)
        .catch(() => console.log("Error"));
};

const onClickHandler = function (e: any) {
    e.stopPropagation();
};

function Sidebar(props: SidebarProps) {

    const user = useContext(UserContext);
    const location = useLocation();

    const userString = () => user?.isAnonymous ? "Guest" : user?.displayName ?? user?.email;

    return (
        <div onClick={onClickHandler} className={`Sidebar flex flex-col h-full bg-white fixed w-[300px] border-l border-zinc-300 z-[999] shadow-md  ${props.sidebarHidden ? 'Sidebar-hidden' : ''}`}>
            <div className="SidebarSectionHeader bg-zinc-800 w-full h-19">
                <div className="flex justify-between items-center w-full p-2 pl-4">
                    <div className="text-zinc-50 space-x-2">
                        <span className="font-bold text-3xl">Grid Chat</span>
                    </div>
                    <div className="flex">
                        <IconButton style={{ color: 'white' }} icon={faRightFromBracket} clickHandler={signOutHandler}></IconButton>
                        <IconButton label="Testing" style={{ color: 'white' }} icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}></IconButton>
                    </div>
                </div>
                <div className="SidebarInfo flex flex-col">
                    {/* <span>Signed in as: <strong>{user?.isAnonymous ? 'anonymous' : user?.email}</strong></span> */}
                </div>
            </div>
            <div className="SidebarSectionBody p-4 flex-grow">
                    <div className="w-full h-8 text-dark font-mono">
                        {location.pathname.substring(1)} 
                    </div>
            </div>
            <div className="SidebarSectionFooter h-14 bg-zinc-800 w-full p-2 px-4 flex justify-between items-center">
                <div className="text-zinc-50 space-x-2">
                    <FontAwesomeIcon className="" icon={faUser}></FontAwesomeIcon>
                    <span>{userString()}</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;