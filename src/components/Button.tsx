import '../styles/Button.css';

function Button(props: any) {
    return ( 
        <button className="GridChatButton" onClick={props.clickHandler}>
            {props.label}
        </button>
     );
}

export default Button;