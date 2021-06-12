import { React, useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

const Menu = (props) => {

    const [x, setX] = useState('0px');
    const [y, setY] = useState('0px');
    const [show, setShow] = useState(false);
    const [items, setItems] = useState(props.items);
    const [clickContext, setClickContext] = useState(null);

    const contextMenuRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        setShow(false);
    };

    const handleMenu = (e) => {
        e.preventDefault();

        setClickContext(e);

        // if popup is open, don't open menu
        if(props.popupOpen) {
            setShow(false);
            return;
        }

        // remove items if folder is not right-clicked on
        if(!e.target.classList.contains('folder')) {
            setItems(props.items.filter((item) => item.id === 'CREATE'));
        } else {
            setItems(props.items.filter((item) => item.id !== 'CREATE'));
        }

        const displayContainer = props.displayInContainer.current;
        let offsetX = 0;
        let offsetY = 0;
        
        if(displayContainer){
            // if click originated outside the desired container, return
            if(!displayContainer.contains(e.target)){
                setShow(false);
                return;
            }

            offsetX = displayContainer.offsetLeft;
            offsetY = displayContainer.offsetTop;
        }
        
        setX(`${e.pageX - offsetX}px`);
        setY(`${e.pageY - offsetY}px`);
        setShow(true);
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleMenu);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleMenu);
        }
    });

    const itemsToDisplay = items.map((item) => 
        <li key={item.id}>
            <button id={item.id} onClick={(e) => item.onClick(e, clickContext)}>
                {item.text}
            </button>
        </li>
    );

    return (
        show &&
            <div ref={contextMenuRef} className='context' style={{position: 'absolute', top: y, left: x}}>
                <ul style={{listStyleType: 'none', margin: '0', padding: '0'}}>
                    { itemsToDisplay }
                </ul>
            </div>
    )
}

Menu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        onClick: PropTypes.func
    })).isRequired
};

export default Menu