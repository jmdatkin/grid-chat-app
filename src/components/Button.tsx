// import '../styles/Button.css';

function Button(props: any) {

    const handleClick = (e: any) => {
        e.preventDefault();
        props.handleClick();
    };

    return ( 
        <button type="submit" className="GridChatButton p-4 bg-blue-500 rounded outline-blue-400 active:bg-blue-600 text-zinc-50" onClick={handleClick}>
            {props.label}
        </button>
     );
}

export default Button;