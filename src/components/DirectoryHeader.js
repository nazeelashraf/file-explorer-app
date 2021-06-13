import React from 'react'

const DirectoryHeader = ({active, setActive}) => {

    const setNavigation = (index) => {
        const newPath = active.split('/').filter((_, ind) => ind <= index).join('/');
        setActive(newPath);
    }

    const breadcrumbs = active.split('/').map((breadcrumb, index) => 
        <button key={breadcrumb} onClick={()=>{setNavigation(index)}}>{breadcrumb}</button>
    )
    
    return (
        <div className='directory-header'>
            {breadcrumbs}
        </div>
    )
}

export default DirectoryHeader
