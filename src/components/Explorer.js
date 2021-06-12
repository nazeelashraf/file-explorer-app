import React, { useRef, useState } from 'react'
import Menu from './Menu'
import NewFolderPopup from './NewFolderPopup';


const Explorer = () => {

    const [popupOpen, setPopupOpen] = useState(false);
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
            onClick: (e) => {
                console.log("Deleting folder...");
            }
        },
    ];

    return (
        <div className='explorer' ref={explorerRef}>
            Explorer
            <Menu items={contextItems} displayInContainer={explorerRef} popupOpen={popupOpen} />
            { popupOpen && <NewFolderPopup setOpen={ setPopupOpen } /> }
        </div>
    )
}

export default Explorer
