import React, { useContext } from 'react'
import { PopupContext } from './Explorer';
import Folder from './Folder'

const Directory = ({folders, setFolders}) => {
    
    const [popupOpen] = useContext(PopupContext);

    const foldersToShow = folders
        .map((folder) => 
            <Folder key={folder.folderName} folderName={folder.folderName} />
    );

    const handleDrop = (e) => {
        if(popupOpen) return;
        
        const origin = e.dataTransfer.getData("id");
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
        >
            { foldersToShow }
        </div>
    )
}

export default Directory
