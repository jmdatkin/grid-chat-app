function DialogModal(props: any) {
    return ( 
        <div ref={props.modalRef} className="transition-opacity opacity-1 z-[10000] w-full h-full fixed flex flex-col place-items-center">
            <div className="h-full w-full md:w-3/4 xl:w-1/2 mx-auto flex place-items-center">
            {props.children}
            </div>
        </div>
     );
}

export default DialogModal;