import React from 'react'

const Folder = ({folderName}) => {


    const handleDrag = (e, data) => {
        e.dataTransfer.setData("id", data);
    }

    // const handleDrop = (e) => {
    // }

    return (
        <div 

            draggable='true' 
            onDragStart={(e) => handleDrag(e, folderName)}
            // onDragOver={(e) => handleDrop(e)}
            // onDragEnd={(e) => setHidden(false)}
            id={folderName} 
            className='folder'
        >
            <img src='https://image.flaticon.com/icons/png/512/760/760759.png' alt=''/>
            <div>{folderName}</div>
        </div>
    )
}

export default Folder
