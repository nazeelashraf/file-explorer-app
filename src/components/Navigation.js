import React from 'react'
import NavigationOption from './NavigationOption';

const Navigation = (props) => {

    const listToDisplay = props.options.map((option) => 
        <NavigationOption key={option.folderName} option={option} />
    );

    return (
        <div className='navigation' data-testid='navigation'>
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
