import React, { useContext, useRef, useState } from 'react'
import Directory from './Directory';
import Menu from './Menu'
import EditFolderPopup from './EditFolderPopup';
import DirectoryHeader from './DirectoryHeader';
import { ActiveFolderContext } from './Window';

export const ClipboardContext = React.createContext();
export const PopupContext = React.createContext();

const Explorer = (props) => {

    const { folders, updateFolders } = props;

    const [popupOpen, setPopupOpen] = useState(false);
    const [mode, setMode] = useState('');
    const [currentFolder, setCurrentFolder] = useState(null);
    const [clipboard, setClipboard] = useState();
    
    const explorerRef = useRef(null);
    const [active, setActive] = useContext(ActiveFolderContext);

    const contextItems = [
        { 
            id: 'CREATE',
            text: 'New Folder',
            onClick: (e) => {
                setMode('create');
                setPopupOpen(true);
            }
        },
        { 
            id: 'DELETE',
            text: 'Delete',
            onClick: (e, clickContext) => {
                updateFolders(folders.filter((folder) => folder.folderName !== clickContext.id));
            }
        },
        { 
            id: 'RENAME',
            text: 'Rename...',
            onClick: (e, clickContext) => {
                const folder = folders.filter((folder) => folder.folderName === clickContext.id)[0];

                setMode('rename');
                setPopupOpen(true);
                setCurrentFolder(folder);
            }
        },
        { 
            id: 'DUPLICATE',
            text: 'Duplicate',
            onClick: (e, clickContext) => {
                const folderToDuplicate = folders.filter((folder) => folder.folderName === clickContext.id)[0];
                
                const newFolder = duplicateFolder(folderToDuplicate);

                updateFolders([...folders, newFolder]);
            }
        },
        { 
            id: 'CUT',
            text: 'Cut',
            onClick: (e, clickContext) => {
                const folderToCut = folders.filter((folder) => folder.folderName === clickContext.id)[0];
                setClipboard(folderToCut);
                updateFolders(folders.filter((folder) => folder.folderName !== clickContext.id));
            }
        },
        { 
            id: 'COPY',
            text: 'Copy',
            onClick: (e, clickContext) => {
                const folderToCut = folders.filter((folder) => folder.folderName === clickContext.id)[0];
                setClipboard(folderToCut);
            }
        },
        { 
            id: 'PASTE',
            text: 'Paste',
            onClick: (e, clickContext) => {

                updateFolders([...folders, duplicateFolder(clipboard)]);
                setClipboard();
            }
        },
    ];

    const duplicateFolder = (folderToDuplicate) => {
        const newFolder = JSON.parse(JSON.stringify(folderToDuplicate));
        newFolder.folderName = `${folderToDuplicate.folderName}`;

        let folderExists = folders.some((folder) => folder.folderName === newFolder.folderName);

        if(folderExists) newFolder.folderName = `${newFolder.folderName}`;

        while(folderExists) {
            newFolder.folderName = `${newFolder.folderName} (copy)`;
            folderExists = folders.some((folder) => folder.folderName === newFolder.folderName);
        }

        return newFolder;
    }

    const createNewFolder = (folderName) => {

        const folderExists = folders.some((folder) => folder.folderName === folderName);

        if(folderExists)
            return `A folder with name ${folderName} already exists`;

        const newFolder = {
            folderName,
            folders: []
        }
        updateFolders([...folders, newFolder]);
    };

    const renameFolder = (newName, folderName) => {

        if(folderName === newName) {
            return;
        }

        const folderExists = folders.some((folder) => 
            folder.folderName === newName
        );

        if(folderExists)
            return `A folder with name ${newName} already exists`;
        
        const newFolders = folders.filter((folder) => folder.folderName !== folderName);
        const folderToUpdate = folders.filter((folder) => folder.folderName === folderName);
        
        updateFolders([...newFolders, { ...folderToUpdate, folderName: newName, folders: [] }]);
    };

    const popupProps = {
        create: {
            callBack: createNewFolder,
            displayText: 'Create folder',
            submitText: 'Create',
        },
        rename: {
            callBack: renameFolder,
            displayText: 'Rename folder',
            submitText: 'Rename',
            lastFolder: currentFolder
        },
    }

    return (
        <ClipboardContext.Provider value={[clipboard, setClipboard]}>
            <div className='explorer' ref={explorerRef}>
                <DirectoryHeader active={active} setActive={setActive}/>
                <PopupContext.Provider value={[popupOpen, setPopupOpen]}>
                    <Directory folders={folders} setFolders={updateFolders} />
                </PopupContext.Provider>
                { 
                    popupOpen && 
                    <EditFolderPopup 
                        setOpen={setPopupOpen}
                        popupProps={popupProps[mode]} 
                    /> 
                }
            </div>
            <Menu 
                items={contextItems} 
                displayInContainer={explorerRef} 
                popupOpen={popupOpen}
            />
        </ClipboardContext.Provider>
    )
}

export default Explorer
