// import '../styles/Button.css';


// type ButtonProps = {
//     style: string,
//     className: string,
//     label: string,
//     handleClick: Function
// }

function Button(props: any) {

    const handleClick = (e: any) => {
        e.preventDefault();
        props.handleClick();
    };

    const styles: {[key: string]: string} = {
        'default': 'bg-blue-400 hover:bg-blue-500 active:bg-blue-600 border-blue-400 active:bg-blue-600 text-zinc-50',
        'outline': 'bg-none border hover:bg-gray-100 active:bg-gray-200'
    }

    return ( 
        <button type="submit" className={`${props.className} GridChatButton px-4 py-3 rounded transition-all duration-75 ${props.style ? styles[props.style as string] : styles.default}`} onClick={handleClick}>
            {props.label}
        </button>
     );
}

export default Button;