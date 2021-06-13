import React, { useEffect, useState } from 'react'
import Explorer from './Explorer'
import Navigation from './Navigation'

const defaultNavigationOptions = 
{
    folders: [
        { folderName: 'Music' , folders: [{folderName: 'Linkin Park' , folders: []}]},
        { folderName: 'Movies' , folders: [{folderName: 'Interstellar', folders: []}] },
        { folderName: 'Documents' , folders: [{folderName: 'Proposals', folders: []}] }
    ]
}

export const ActiveFolderContext = React.createContext();

const Window = () => {

    const [navigationOptions, setNavigationOptions] = useState(defaultNavigationOptions);
    const [active, setActive] = useState(navigationOptions.folders[0].folderName);
    const [activeFolder, setActiveFolder] = useState(navigationOptions.folders[0]);

    useEffect(() => {
        const breadcrumbs = active.split('/');
        let folderToNavigate = navigationOptions.folders[0];
        let currentFolderList = navigationOptions.folders;

        breadcrumbs.forEach((breadcrumb) => {
            folderToNavigate = currentFolderList.filter((folder) => folder.folderName === breadcrumb)[0];
            currentFolderList = folderToNavigate.folders;
        });

        setActiveFolder(folderToNavigate);
    }, [active, navigationOptions]);

    const updateFolders = (folders) => {
        const newDirectory = { folders: [...navigationOptions.folders] };
        const breadcrumbs = active.split('/');
        let folderIndexToUpdate = -1;
        let currentFolderList = newDirectory;

        breadcrumbs.forEach((breadcrumb) => {
            folderIndexToUpdate = currentFolderList.folders.findIndex((folder) => folder.folderName === breadcrumb);
            currentFolderList = currentFolderList.folders[folderIndexToUpdate];
        });

        if(JSON.stringify(currentFolderList.folders) === JSON.stringify(folders))
            return;

        currentFolderList.folders = folders;

        setNavigationOptions(newDirectory);
    }

    return (
        <ActiveFolderContext.Provider value={[active, setActive]}>
            <div className="window" data-testid='window'>
                <Navigation options={navigationOptions.folders}/>
                <Explorer folders={activeFolder.folders} updateFolders={updateFolders}/>
            </div>
        </ActiveFolderContext.Provider>
    )
}

export default Window
