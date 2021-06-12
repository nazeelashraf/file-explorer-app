import {React, useEffect, useRef, useState} from 'react'

const NewFolderPopup = ({ setOpen, createNewFolder }) => {

    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
    })

    const placeholder = 'Enter folder name';

    const submitFolderName = () => {
        if(name) {
            const error = createNewFolder(name);
            if(!error) {
                setOpen(false);
                return;
            }
            setError(error);
        }
    }

    const updateName = (e) => {
        error && setError('');
        setName(e.target.value);
    }

    const keyUp = (e) => {
        e.key === 'Enter' && submitFolderName(); 
        e.key === 'Escape' && setOpen(false);
    }

    return (
        <div className="popup">
            <span className="popup-header">Create folder</span>
            <span className="popup-error">{error}</span>
            <input 
                ref={nameRef}
                type='text'
                value={name}
                onChange={updateName} 
                onKeyUp={keyUp}
                placeholder={placeholder}
            />
            <button onClick={() => setOpen(false)}>Close</button>
            <button disabled={error || !name} onClick={submitFolderName}>Create</button>
        </div>
    )
}

export default NewFolderPopup
