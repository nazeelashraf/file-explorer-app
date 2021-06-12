import { React, useState, useEffect, useRef } from 'react'
import { PropTypes } from 'prop-types';

const Menu = (props) => {

    const [x, setX] = useState('0px');
    const [y, setY] = useState('0px');
    const [show, setShow] = useState(false);

    const contextMenuRef = useRef(null);

    const handleClick = (e) => {
        e.preventDefault();
        setShow(false);
    };

    const handleMenu = (e) => {
        e.preventDefault();
        setX(e.pageX);
        setY(e.pageY);
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

    const items = props.items.map((item) => 
        <li key={item.id}>
            <button id={item.id} onClick={item.onClick}>
                {item.text}
            </button>
        </li>
    );

    return (
        show &&
            <div ref={contextMenuRef} id='context' style={{position: 'absolute', top: y, left: x}}>
                <ul style={{listStyleType: 'none', margin: '0', padding: '0'}}>
                    { items }
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