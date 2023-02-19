import IconButton from "./IconButton";
import '../styles/Sidebar.css';
import { faRightFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../App";
import { Tooltip } from "react-tooltip";
import LoginForm from "./LoginForm";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function,
    setUser: Function
};

const signOutHandler = function() {
    console.log('HILSADJ')
    signOut(auth)
    .then(() => window.location.href = window.location.href)
    .catch(() => console.log("Error"));
};

const onClickHandler = function(e: any) {
    e.stopPropagation();
};

function Sidebar(props: SidebarProps) {

    const user = useContext(UserContext);

    return (
        <div onClick={onClickHandler} className={`Sidebar ${props.sidebarHidden ? 'hidden' : ''}`}>
            <div className="SidebarSectionHeader">
                <div className="SidebarHeader">
                    <div>

                    </div>
                    <div>
                        <IconButton label="Testing" style={{ color: 'white' }} icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}>
                        </IconButton>
                        <IconButton style={{ color: 'white' }} icon={faRightFromBracket} clickHandler={signOutHandler}></IconButton>
                    </div>
                </div>
                <div className="SidebarInfo">
                    <span className="SidebarTitle">Grid Chat</span>
                    <span>Signed in as: <strong>{user?.isAnonymous ? 'anonymous' : user?.email}</strong></span>
                </div>
            </div>
            <div className="SidebarSectionBody">
                <LoginForm setUser={props.setUser}></LoginForm>
            </div>
        </div>
    );
}

export default Sidebar;