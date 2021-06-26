import React from 'react'
import './Header.css';
import Search from './Search';


function Header() {
    return (
        <div className="header">
            <div className="header-title">
                <h1>Search Photos</h1>
            </div>
            
            <Search/>
        </div>
    )
}

export default Header;
