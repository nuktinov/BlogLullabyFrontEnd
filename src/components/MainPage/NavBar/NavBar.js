import React from 'react';
import { Link } from 'react-router-dom'

import './NavBar.css'

function NavBar ({logIn, userName}) {
    return (
        <nav id="navBar">
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/blog'>Blogs</Link></li>
                <li><Link to='/post'>Posts</Link></li>
                { logIn && <li><Link to='/dialog'>Dialogs</Link></li>}
                { logIn && <li><Link to={'/blog/' + userName}>My blog</Link></li> }
            </ul>
            
        </nav>
    )
};

export default NavBar;