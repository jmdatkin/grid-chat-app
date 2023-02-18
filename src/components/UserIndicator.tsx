import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../App";
import IconButton from "./IconButton";

function UserIndicator(props: any) {

    const user = useContext(UserContext)

    const userString = `Signed in as ${user?.isAnonymous ? 'anonymous' : user?.displayName}`;

    return ( 
        <div className="UserIndicator">
            <IconButton icon={faUser} clickHandler={() => props.setSidebarHidden(false)}>

            </IconButton>
        </div>
     );
}

export default UserIndicator;