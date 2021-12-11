import React from 'react';
import { Link } from "react-router-dom";
import '../css/header.css';


function Header(){
    return(
        <div id = "navbar">
             <Link to="/" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-title'>Competitions</div></Link>
             <Link to="/insert" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-insert'>Create Competition</div></Link>
             <Link to="/view" style={{ textDecoration: 'none', color: 'white' }}><div id = 'navbar-edit' >Modify Competition</div></Link>
        </div>
    );
}

export default Header;