function LoginMethodButton(props: any) {
    return ( 
        <div className="LoginMethodButton w-[4rem] sm:w-full h-[4rem] flex items-center border rounded-sm shadow-sm hover:bg-gray-100 active:bg-gray-200 transition-all duration-75 cursor-pointer" onClick={props.clickHandler}>
            <div className="min-w-[4rem] h-[4rem] p-3">
                {props.icon}
            </div>
            <div className="flex-grow text-left ml-4 hidden sm:block">
                {props.children}
            </div>
        </div>
     );
}

export default LoginMethodButton;