import React from 'react'
import Folder from './Folder'

const Directory = ({folders}) => {

    const foldersToShow = folders
        .map((folder) => 
            <Folder key={folder.folderName} folderName={folder.folderName} />
        );

    return (
        <div className='directory'>
            { foldersToShow }
        </div>
    )
}

export default Directory
