import React, { useContext } from 'react'
import { ActiveFolderContext } from './Window';

const Folder = ({folderName}) => {

    const [active, setActive] = useContext(ActiveFolderContext);

    const handleDrag = (e, data) => {
        e.dataTransfer.setData("id", data);
    }

    return (
        <div 
            draggable='true' 
            onDragStart={(e) => handleDrag(e, folderName)}
            onClick={() => setActive([active, '/', folderName].join(''))}
            id={folderName} 
            className='folder'
        >
            <img src='https://image.flaticon.com/icons/png/512/760/760759.png' alt=''/>
            <div>{folderName}</div>
        </div>
    )
}

export default Folder
