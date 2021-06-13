import React, { useContext } from 'react'
import { PopupContext } from './Explorer';
import { ActiveFolderContext } from './Window';

const Folder = ({folderName, setDraggedFolderName}) => {

    const [active, setActive] = useContext(ActiveFolderContext);
    const [popupOpen] = useContext(PopupContext);

    const handleDrag = (e, data) => {
        setDraggedFolderName(data);
    }

    return (
        <div 
            draggable='true' 
            onDragStart={(e) => !popupOpen && handleDrag(e, folderName)}
            onClick={() => !popupOpen && setActive([active, '/', folderName].join(''))}
            id={folderName} 
            className='folder'
            data-testid={`folder-${folderName}`}
        >
            <img src='https://image.flaticon.com/icons/png/512/760/760759.png' alt=''/>
            <div>{folderName}</div>
        </div>
    )
}

export default Folder
