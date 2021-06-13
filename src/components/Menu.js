import { React, useState, useEffect, useRef, useContext } from 'react'
import { PropTypes } from 'prop-types';
import { ClipboardContext } from './Explorer';
import { handleClick, handleMenu } from '../helper/MenuHelper';

const Menu = (props) => {

    const [x, setX] = useState('0px');
    const [y, setY] = useState('0px');
    const [show, setShow] = useState(false);
    const [items, setItems] = useState(props.items);
    const [clickContext, setClickContext] = useState(null);

    const contextMenuRef = useRef(null);

    const [clipboard] = useContext(ClipboardContext);

    const handleLeftClick = (e) => {
        handleClick(e, [setShow]);
    }

    const handleMenuClick = (e) => {
        handleMenu(
            e,
            [props, setClickContext, setShow, setItems, setX, setY, clipboard]
        );
    }

    useEffect(() => {
        document.addEventListener("click", handleLeftClick);
        document.addEventListener("contextmenu", handleMenuClick);
        return () => {
            document.removeEventListener("click", handleLeftClick);
            document.removeEventListener("contextmenu", handleMenuClick);
        }
    });

    const itemsToDisplay = items.map((item) => 
        <li key={item.id}>
            <button id={item.id} onClick={(e) => item.onClick(e, clickContext)} data-testid={`context-${item.id}`}>
                {item.text}
            </button>
        </li>
    );

    return (
        show &&
            <div ref={contextMenuRef} className='context' style={{top: y, left: x}} data-testid='context'>
                <ul className='list'>
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