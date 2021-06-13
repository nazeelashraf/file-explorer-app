import {React, useEffect, useRef, useState} from 'react'

const EditFolderPopup = ({ setOpen, popupProps }) => {
    const [name, setName] = useState(popupProps.lastFolder?.folderName || '');
    const [error, setError] = useState('');
    const nameRef = useRef(null);

    useEffect(() => {
        nameRef.current.focus();
    })

    const placeholder = 'Enter folder name';

    const submitFolderName = () => {
        if(name) {
            const error = popupProps.callBack(name, popupProps.lastFolder?.folderName);
            if(!error) {
                setOpen(false);
                return;
            }
            setError(error);
        }
    }

    const updateName = (e) => {
        error && setError('');
        let newName = e.target.value;
        if(newName && newName.includes('/')) {
            setError("Cannot use '/' in folder name");
            return;
        }
        setName(newName);
    }

    const keyUp = (e) => {
        e.key === 'Enter' && submitFolderName(); 
        e.key === 'Escape' && setOpen(false);
    }

    return (
        <div className="popup" data-testid='popup'>
            <span className="popup-header">{popupProps.displayText}</span>
            <span className="popup-error" data-testid='popup-error'>{error}</span>
            <input 
                ref={nameRef}
                type='text'
                value={name}
                onChange={updateName} 
                onKeyUp={keyUp}
                placeholder={placeholder}
                data-testid='input'
            />
            <button 
                className='cancel' 
                onClick={() => setOpen(false)}
                data-testid='cancel'
            >Close</button>
            <button 
                className='action' 
                disabled={error || !name} 
                onClick={submitFolderName}
                data-testid='action'
            >
                {popupProps.submitText}
            </button>
        </div>
    )
}

export default EditFolderPopup
