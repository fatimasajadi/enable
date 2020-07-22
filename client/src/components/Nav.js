import React from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import './Nav.css';
import { Button } from 'reactstrap';

function Nav() {
  return (
    <>
      <div className="nav">
        <img src={Logo} alt='logo' />
        <div className='button'>
          <Button outline color="primary" tag={Link} to="/login">Login</Button>
          <Button outline color="primary">Sign Up</Button>
        </div>

      </div>

    </>
  );
}

export default Nav;
