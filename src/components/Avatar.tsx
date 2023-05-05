import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Avatar(props: any) {
    return (
        <div {...props} className="relative w-10 h-10 rounded-full flex items-center justify-center bg-zinc-700 before:absolute before:block before:w-4 before:h-4 before:bg-green-600 before:rounded-full before:right-0 before:bottom-0 before:border-2 before:border-zinc-800 before:z-[9000]">
            <FontAwesomeIcon className="" icon={faUser}></FontAwesomeIcon>
        </div>
    );
}

export default Avatar;