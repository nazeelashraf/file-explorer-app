import React from 'react'

const NavigationOption = (props) => {
    const activeClass = props.active===props.option.name ? 'active' : '';
    return (
        <li className='li-margin-bottom'>
            <button 
                className={`${activeClass} nav-button`}
                onClick={() => props.setActive(props.option.name)}
            >
                {props.option.name}
            </button>
        </li>
    )
}

export default NavigationOption
