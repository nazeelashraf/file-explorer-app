import React, { useContext, useState } from 'react'
import { PopupContext } from './Explorer';
import Folder from './Folder';

const Directory = ({folders, setFolders}) => {
    
    const [draggedFolderName, setDraggedFolderName] = useState('Test');

    const [popupOpen] = useContext(PopupContext);

    const foldersToShow = folders
        .map((folder) => 
            <Folder 
                key={folder.folderName} 
                folderName={folder.folderName} 
                setDraggedFolderName={setDraggedFolderName}
            />
    );

    const handleDrop = (e) => {
        if(popupOpen) return;
        
        const origin = draggedFolderName;
        const target = e.target.id;

        if(!target || target === origin) return;

        const foldersWithoutOrigin = folders.filter((folder) => folder.folderName !== origin);
        const folderToBeMovedIndex = folders.findIndex((folder) => folder.folderName === origin);

        const index = foldersWithoutOrigin.findIndex((folder) => folder.folderName === target);

        if(index > -1) {
            const newFolders = [
                ...foldersWithoutOrigin.slice(0, index), 
                folders[folderToBeMovedIndex], 
                ...foldersWithoutOrigin.slice(index)
            ];
            setFolders(newFolders);
        }
        
    }

    return (
        <div 
            className='directory'
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e)}
            data-testid='directory'
        >
            { foldersToShow }
        </div>
    )
}

export default Directory
