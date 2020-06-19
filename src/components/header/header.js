import React from "react";
import {Link} from "react-router-dom";

import './header.css';

const Header = () => {
    return (
        <header className='header d-flex align-items-center'>
            <h1>
                <Link to='/'>IMAGES-STORAGE</Link>
                <span>test</span>
            </h1>
            <ul className='d-flex align-items-center'>
                <li>
                    <Link to='/imagesList'>Images List</Link>
                </li>
                <li>
                    <Link to='/addImage'>Add Images</Link>
                </li>
            </ul>
        </header>
    )
};

export default Header;