import React from 'react';
import { Link } from "react-router-dom";
import '../css/header.css';


function Header(){
    return(
        <div id = "navbar"  position="fixed">
             <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-title'>Competitions</div></Link>
             <Link to="/track" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-track'>Track</div></Link>
             <Link to="/create" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-create'>Create Competition</div></Link>
             <Link to="/modify" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-modify' >Modify Competition</div></Link>
        </div>
    );
}

export default Header;