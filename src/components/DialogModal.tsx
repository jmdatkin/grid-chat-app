function DialogModal(props: any) {
    return ( 
        <div ref={props.modalRef} className={`${props.open ? 'block' : 'hidden'}  transition-opacity opacity-1 z-[8000] w-full h-full fixed flex flex-col place-items-center pointer-events-nonei
        before:block before:w-full before:h-full before:bg-black/40 before:fixed
        `}>
            <div className={`${props.open ? 'block' : 'hidden'} h-full w-full xl:h-1/2  md:w-3/4 xl:w-1/2 mx-auto flex justify-center items-center`}>
            {props.children}
            </div>
        </div>
     );
}

export default DialogModal;