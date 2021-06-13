export const handleClick = (e, [setShow]) => {
    e.preventDefault();
    setShow(false);
};

export const handleMenu = (e, [props, setClickContext, setShow, setItems, setX, setY, clipboard]) => {
    e.preventDefault();

    setClickContext(e.target);

    // if popup is open, don't open menu
    if(props.popupOpen) {
        setShow(false);
        return;
    }

    // check if folder is right clicked
    let currentElement = e.target;
    let isFolder = false;

    while(currentElement) {
        isFolder = currentElement.classList.contains('folder');
        if(isFolder) break;
        currentElement = currentElement.parentElement;
    }

    // remove items if folder is not right-clicked on
    if(!isFolder) {
        setItems(props.items.filter((item) => item.id === 'CREATE' || (clipboard && item.id === 'PASTE')));
    } else {
        setItems(props.items.filter((item) => item.id !== 'PASTE'));
        setClickContext(currentElement);
    }

    const displayContainer = props.displayInContainer.current;
    
    // if click originated outside the desired container, return
    if(displayContainer && !displayContainer.contains(e.target)){
        setShow(false);
        return;
    }
    
    setX(`${e.pageX}px`);
    setY(`${e.pageY}px`);
    setShow(true);
}
