import React from 'react'

const Folder = ({folderName}) => {
    return (
        <div id={folderName} className='folder'>
            {folderName}
        </div>
    )
}

export default Folder
