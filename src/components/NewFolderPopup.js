import {React, useState} from 'react'

const NewFolderPopup = ({ setOpen }) => {

    const [name, setName] = useState('');

    const placeholder = 'Enter folder name';

    const submitFolderName = () => {
        if(name) {
            setOpen(false);
            console.log(`Created folder ${name}`);
        }
    }

    return (
        <div className="popup">
            <span>Create folder</span>
            <input 
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)} 
                placeholder={placeholder}
            />
            <button onClick={() => setOpen(false)}>Close</button>
            <button disabled={!name} onClick={submitFolderName}>Create</button>
        </div>
    )
}

export default NewFolderPopup
