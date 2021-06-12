import React, { useRef, useState } from 'react'
import Directory from './Directory';
import Menu from './Menu'
import NewFolderPopup from './NewFolderPopup';


const Explorer = () => {

    const [popupOpen, setPopupOpen] = useState(false);
    const [folders, setFolders] = useState([]);
    const explorerRef = useRef(null);

    const contextItems = [
        { 
            id: 'CREATE',
            text: 'create',
            onClick: (e) => {
                setPopupOpen(true);
            }
        },
        { 
            id: 'DELETE',
            text: 'delete',
            onClick: (e, clickContext) => {
                setFolders(folders.filter((folder) => folder.folderName !== clickContext.target.id));
            }
        },
        // { 
        //     id: 'RENAME',
        //     text: 'rename',
        //     onClick: (e) => {
        //         console.log("Renaming folder...");
        //     }
        // },
    ];

    const createNewFolder = (folderName) => {

        const folderExists = folders.some((folder) => folder.folderName === folderName);

        if(folderExists)
            return `Folder with name ${folderName} already exists`;

        const newFolder = {
            folderName
        }
        setFolders([...folders, newFolder]);
    };

    return (
        <div className='explorer' ref={explorerRef}>
            <Directory folders={folders} />
            <Menu 
                items={contextItems} 
                displayInContainer={explorerRef} 
                popupOpen={popupOpen} 
                
            />
            { 
                popupOpen && 
                <NewFolderPopup 
                    setOpen={ setPopupOpen }
                    createNewFolder={ createNewFolder } 
                /> 
            }
        </div>
    )
}

export default Explorer
