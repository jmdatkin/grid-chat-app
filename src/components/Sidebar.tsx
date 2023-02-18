import IconButton from "./IconButton";
import {styles} from '@/styles/Sidebar.module.css';
import { faRightFromBracket, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../pages";
import { Tooltip } from "react-tooltip";
import LoginForm from "./LoginForm";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function
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
                        <IconButton style={{ color: 'white' }} icon={faRightFromBracket}></IconButton>
                    </div>
                </div>
                <div className="SidebarInfo">
                    <span className="SidebarTitle">Grid Chat</span>
                    <span>Signed in as: <strong>{user?.isAnonymous ? 'anonymous' : user?.displayName}</strong></span>
                </div>
            </div>
            <div className="SidebarSectionBody">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
}

export default Sidebar;