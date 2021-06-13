import React, { useContext, useRef, useState } from 'react'
import Directory from './Directory';
import Menu from './Menu'
import EditFolderPopup from './EditFolderPopup';
import DirectoryHeader from './DirectoryHeader';
import { ActiveFolderContext } from './Window';
import { getContextItems } from '../helper/ContextHelper';
import { duplicateFolder, createNewFolder, renameFolder } from '../helper/ExplorerHelper';

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

    const contextItems = getContextItems(
        [folders, setMode, setPopupOpen, updateFolders, setCurrentFolder, duplicateFolder, clipboard, setClipboard]
    )

    const popupProps = {
        create: {
            callBack: (folderName) => {
                const result = createNewFolder(folders, folderName);
                if(typeof(result) === 'string') return result;
                updateFolders(result);
            },
            displayText: 'Create folder',
            submitText: 'Create',
        },
        rename: {
            callBack: (newName, folderName) => {
                const result = renameFolder(folders, newName, folderName);
                if(typeof(result) === 'string') return result;
                updateFolders(result);
            },
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
