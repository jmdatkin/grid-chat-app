import IconButton from "./IconButton";
import '../styles/Sidebar.css';
import { faRightFromBracket, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext, RoomContext } from "../App";
import { Tooltip } from "react-tooltip";
import LoginForm from "./LoginForm";
import { User, signOut } from "firebase/auth";
import { auth, userSignOut } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function,
    setUser: Function
};

const signOutHandler = function () {
    userSignOut().then(() => window.location.href = window.location.href);
};

const onClickHandler = function (e: any) {
    e.stopPropagation();
};

function Sidebar(props: SidebarProps) {

    const user = useContext(UserContext);
    const location = useLocation();
    const room = useContext(RoomContext);

    const userString = () => user?.isAnonymous ? "Guest" : user?.displayName ?? user?.email;

    const usersList = function() {
        if (room && room.connected) {
            return Object.values(room.connected).map((user: any) => {
                return (<span>{user.uid}</span>);
            });
        }
        return '';
    };

    return (
        <div onClick={onClickHandler} className={`Sidebar flex flex-col h-full bg-white fixed w-[300px] border-l z-[999] shadow-sm  ${props.sidebarHidden ? 'Sidebar-hidden' : ''}`}>
            <div className="SidebarSectionHeader border-b w-full h-16">
                <div className="flex justify-between items-center w-full p-2 pl-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">{room !== null ? room!.name : 'Public'}</span>
                        {/* <span>
                        <span className="font-bold font-mono text-zinc-600 tracking-tight text-sm text-ellipsis">Owner</span>
                        <span className="font-mono">{room !== null ? room!.owner : 'Public'}</span>
                        </span> */}
                    </div>
                    <div className="flex">
                        {/* <IconButton style={{ color: 'white' }} icon={faRightFromBracket} clickHandler={signOutHandler}></IconButton>
                        <IconButton label="Testing" style={{ color: 'white' }} icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}></IconButton> */}
                        <IconButton icon={faRightFromBracket} clickHandler={signOutHandler}></IconButton>
                        <IconButton label="Testing" icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}></IconButton>
                    </div>
                </div>
                <div className="SidebarInfo flex flex-col">
                    {/* <span>Signed in as: <strong>{user?.isAnonymous ? 'anonymous' : user?.email}</strong></span> */}
                </div>
            </div>
            <div className="SidebarSectionBody flex-grow">
                <section className="border-b p-4">
                    <div className="w-full text-dark text-sm font-semibold">
                        <span>In Room</span>
                        <div className="flex flex-col">
                            {usersList()} 
                        </div>
                    </div>
                </section>
            </div>
            <div className="SidebarSectionFooter h-14 bg-zinc-800 w-full p-2 px-4 flex justify-between items-center">
                <div className="text-zinc-50 space-x-2 flex items-center">
                    {/* <FontAwesomeIcon className="" icon={faUser}></FontAwesomeIcon> */}
                    <Avatar></Avatar>
                    <span>{userString()}</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;