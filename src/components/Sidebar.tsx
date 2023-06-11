import IconButton from "./IconButton";
import '../styles/Sidebar.css';
import { faRightFromBracket, faTimes, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext, RoomContext } from "../App";
import { Tooltip } from "react-tooltip";
import LoginForm from "./LoginForm";
import { User, signOut } from "firebase/auth";
import { auth, onUserEnterRoom, userSignOut } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "react-router-dom";
import Avatar from "./Avatar";
import { usePrevious } from "react-use";
import { DataSnapshot } from "firebase/database";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function,
    setUser: Function,
    setDialogModalOpen: Function
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

    const [userString, setUserString] = useState<string | null>(null);

    useEffect(() => {
        if (user === null) {
            setUserString('');
        }
        else if (user?.isAnonymous) {
            setUserString(user.displayName || "Guest");
        } else {
            setUserString(user.displayName || user.email);
        }
    }, [user?.displayName]);

    const previousRoom = usePrevious(room);

    const usersList = function () {
        if (room && room.users) {
            return Object.values(room.users).map((user: any, index: number) => {
                return (<span key={index}>{user.displayName || user.uid.substring(0, 8)}</span>);
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

                    </div>
                    <div className="flex">
                        <IconButton icon={faRightFromBracket} clickHandler={signOutHandler}></IconButton>
                        <IconButton icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}></IconButton>
                    </div>
                </div>
                <div className="SidebarInfo flex flex-col">
                </div>
            </div>
            <div className="SidebarSectionBody flex-grow">
                <section className="border-b p-4">
                    <div className="w-full text-dark text-sm">
                        <div className="font-bold mb-2">In Room</div>
                        <div className="flex flex-col">
                            {usersList()}
                        </div>
                    </div>
                </section>
            </div>
            <div className="SidebarSectionFooter h-14 bg-zinc-800 w-full p-2 px-4 flex justify-between items-center">
                <div className="text-zinc-50 space-x-2 flex items-center">
                    <Avatar onClick={() => props.setDialogModalOpen(true)}></Avatar>
                    <span>{userString}</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;