import React from 'react';

function Header (props)  {
    const headerStyle = { backgroundColor: "mediumblue", color:'white'}
    return (
        <header style={headerStyle}>
            <h1>{props.title}</h1>
        </header>
    );
}

export default Header;