import React from 'react'

const DirectoryHeader = ({active, setActive}) => {

    const setNavigation = (index) => {
        const newPath = active.split('/').filter((_, ind) => ind <= index).join('/');
        setActive(newPath);
    }

    const breadcrumbs = active.split('/').map((breadcrumb, index) => 
        <button 
            key={breadcrumb} 
            onClick={()=>{setNavigation(index)}}
            data-testid={`breadcrumb-${breadcrumb}`}
        >
            {breadcrumb}
        </button>
    )
    
    return (
        <div className='directory-header' data-testid='directory-header'>
            {breadcrumbs}
        </div>
    )
}

export default DirectoryHeader
