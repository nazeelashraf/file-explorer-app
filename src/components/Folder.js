import React from 'react'

const Folder = ({folderName}) => {
    return (
        <div id={folderName} className='folder'>
            <img src='https://image.flaticon.com/icons/png/512/760/760759.png' alt=''/>
            <div>{folderName}</div>
        </div>
    )
}

export default Folder
