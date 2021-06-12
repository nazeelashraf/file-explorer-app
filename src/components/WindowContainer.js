import React from 'react'
import Menu from './Menu';

const contextItems = [
    { 
      id: 'CREATE',
      text: 'create',
      onClick: (e) => {
        console.log("Creating folder...");
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

const WindowContainer = () => {
    
    return (
        <Menu items={contextItems} />
    )
}

export default WindowContainer
