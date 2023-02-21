function Modal(props: any) {
    return ( 
        <div className="w-full h-full backdrop-blur-md fixed bg-white/30 flex flex-col place-items-center">
            <div className="h-full w-full md:w-3/4 xl:w-1/2 mx-auto flex place-items-center">
            {props.children}
            </div>
        </div>
     );
}

export default Modal;