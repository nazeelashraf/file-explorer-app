export const duplicateFolder = (folders, folderToDuplicate) => {
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

export const createNewFolder = (folders, folderName) => {

    const folderExists = folders.some((folder) => folder.folderName === folderName);

    if(folderExists)
        return `A folder with name ${folderName} already exists`;

    const newFolder = {
        folderName,
        folders: []
    }
    return [...folders, newFolder];
};

export const renameFolder = (folders, newName, folderName) => {

    if(folderName === newName) {
        return folders;
    }

    const folderExists = folders.some((folder) => 
        folder.folderName === newName
    );

    if(folderExists)
        return `A folder with name ${newName} already exists`;
    
    const newFolders = folders.filter((folder) => folder.folderName !== folderName);
    const folderToUpdate = folders.filter((folder) => folder.folderName === folderName);
    
    return [...newFolders, { ...folderToUpdate, folderName: newName, folders: [] }];
};