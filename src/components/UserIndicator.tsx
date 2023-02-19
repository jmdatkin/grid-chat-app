import UserContext from "@/context/UserContext";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import IconButton from "./IconButton";

function UserIndicator(props: any) {

    const user = useContext(UserContext)

    const userString = `Signed in as ${user?.isAnonymous ? 'anonymous' : user?.displayName}`;

    const clickHandler = function(e: Event) {
        e.stopPropagation();
        props.setSidebarHidden(false);
    }

    return ( 
        <div className="UserIndicator">
            {/* <IconButton icon={faUser} clickHandler={() => props.setSidebarHidden(false)}> */}
            <IconButton icon={faUser} clickHandler={clickHandler}>

            </IconButton>
        </div>
     );
}

export default UserIndicator;