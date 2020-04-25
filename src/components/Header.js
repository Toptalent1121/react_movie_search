import React from 'react';

const Header = props => {
    return (
        <div className="app-header">
            <h2>{props.text}</h2>
        </div>
    )
}

export default Header;