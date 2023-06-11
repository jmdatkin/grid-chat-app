function DialogContainer(props: any) {
    return (
        // <div className="w-full h-full md:h-3/4 z-[9600 bg-white rounded shadow-md grid grid-rows-2 desktop:grid-rows-1 desktop:grid-cols-2 pointer-events-auto">
        <div onClick={(e) => {e.stopPropagation()}} className="flex flex-col w-full pointer-events-auto lg:w-[24rem] mx-auto h-full md:h-3/4 z-[8600] rounded shadow-md">
            {props.children}
        </div>
    );
}

export default DialogContainer;