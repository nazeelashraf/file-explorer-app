import React, { useState } from 'react'
import NavigationOption from './NavigationOption';

const options = [
    { name: 'Music' },
    { name: 'Movies' },
    { name: 'Documents' }
];

const Navigation = () => {

    const [active, setActive] = useState(options[0].name);

    const listToDisplay = options.map((option) => 
        <NavigationOption key={option.name} option={option} active={active} setActive={setActive} />
    );

    return (
        <div className='navigation'>
            <div>
                <div className='circle red-circle'></div>
                <div className='circle amber-circle'></div>
                <div className='circle green-circle'></div>
            </div>
            <ul className='list'>
                {listToDisplay}
            </ul>
        </div>
    )
}

export default Navigation
