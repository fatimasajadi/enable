import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import './Nav.css';
import { Button } from 'reactstrap';

function Nav() {
  return (
    <>
      <div className="nav">
        <Link to="/"><img src={Logo} alt='logo' /></Link>

        <div className='button'>
          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink">Our Team</Link>
          <Link className="navLink">About us </Link>
          <Link className="navLink">FAQ</Link>
          <Link className="navLink">Contact</Link>
          <Button outline color="primary" tag={Link} to="/login">Login</Button>
          <Button outline color="primary" tag={Link} to="/register">Register</Button>

        </div>
      </div>
    </>
  );
}

export default Nav;
