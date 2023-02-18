import IconButton from "./IconButton";
import '../styles/Sidebar.css';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
    sidebarHidden: boolean,
    setSidebarHidden: Function
};

function Sidebar(props: SidebarProps) {

    return (
        <div className={`Sidebar ${props.sidebarHidden ? 'hidden' : ''}`}>
            <div className="SidebarSectionHeader">
                <div className="SidebarHeader">
                    <div>

                    </div>
                    <div>
                        <IconButton icon={faTimes} clickHandler={() => props.setSidebarHidden(true)}>
                        </IconButton>
                    </div>
                </div>
                <div className="SidebarInfo">
                    <span className="SidebarTitle">Grid Chat</span>
                    <span>Signed in as:</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;