import React from 'react'
import './Navbar.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faBars} from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  return (
    <div id='navbar'>
      <div id="name">
        CUREMANEA
      </div>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Ask</a></li>
            <li><a href="#">Questions</a></li>
            <li><a href="#">Profile</a></li>
        </ul>
    </div>
  )
}

export default Navbar