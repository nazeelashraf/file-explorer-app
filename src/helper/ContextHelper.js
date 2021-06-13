export const getContextItems = (
    [folders, setMode, setPopupOpen, updateFolders, 
        setCurrentFolder, duplicateFolder, clipboard, setClipboard]
    ) => {
    return [
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
                
                const newFolder = duplicateFolder(folders, folderToDuplicate);
    
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
                updateFolders([...folders, duplicateFolder(folders, clipboard)]);
                setClipboard();
            }
        },
    ];
}