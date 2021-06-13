import React, { useContext } from 'react'
import { ActiveFolderContext } from './Window';

const NavigationOption = (props) => {
    
    const [active, setActive] = useContext(ActiveFolderContext);

    const activeClass = active.split('/')[0]===props.option.folderName ? 'active' : '';
    return (
        <li className='li-margin-bottom'>
            <button 
                className={`${activeClass} nav-button`}
                onClick={() => setActive(props.option.folderName)}
                data-testid={`nav-${props.option.folderName}`}
            >
                {props.option.folderName}
            </button>
        </li>
    )
}

export default NavigationOption
