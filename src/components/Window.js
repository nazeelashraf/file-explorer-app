import React from 'react'
import Explorer from './Explorer'
import Navigation from './Navigation'

const Window = () => {
    return (
        <div className="window">
            <Navigation />
            <Explorer />
        </div>
    )
}

export default Window
