import React, { useContext } from 'react';
import Logo from '../images/logo.png';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';
import { Button } from 'reactstrap';
import { AuthContext } from './AuthProvider';

function Nav() {
  const { user, setUser } = useContext(AuthContext);

  let location = useLocation();

  function getActiveClassname(path) {
    if (location.pathname === path) {
      return 'navDashboard active';
    }

    return 'navDashboard';
  }

  function logOut() {
    setUser(null);

  }

  return (
    <>
      <div className="nav">
        <Link to="/"><img src={Logo} alt='logo' /></Link>
        {user && user.type === "Support Worker" && (
          <>
            <Link className={getActiveClassname('/worker-dashboard')} to="/worker-dashboard">  {user && `Home`}</Link>
            <Link className={getActiveClassname('/pending-requests')} to="/pending-requests">  {user && `Pending requests`}</Link>
            <Link className={getActiveClassname('/previous-sessions')} to="/previous-sessions">  {user && `Previous sessions`}</Link>
            <Link className={getActiveClassname('/worker-availability')} to="/worker-availability"> {user && `Availability`}</Link>
          </>
        )
        }

        {user && user.type === "Family" && (
          <>
            <Link className={getActiveClassname('/family-dashboard')} to="/family-dashboard">  {user && `Home`}</Link>
            <Link className={getActiveClassname('/my-requests')} to="/my-requests">  {user && `My requests`}</Link>
            <Link className={getActiveClassname('/previous-assistance')} to="/previous-assistance">  {user && `Previous requests`}</Link>
          </>
        )
        }
        {user && user.type === "Admin" && (
          <>
          </>
        )
        }

        <div className='button'>

          <Link className="navLink" to="/">Home</Link>
          <Link className="navLink">Our Team</Link>
          <Link className="navLink">About us </Link>
          <Link className="navLink">FAQ</Link>
          <Link className="navLink">Contact</Link>
          <p className="navWelcome">  {user && `Welcome ${user.firstname}!`}</p>
          {
            !user && (
              <>
                <Button outline color="primary" tag={Link} to="/login">Login</Button>
                <Button outline color="primary" tag={Link} to="/register">Register</Button>
              </>
            )
          }
          {
            user && (
              <Button outline color="primary" onClick={logOut} tag={Link} to="/">Logout</Button>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Nav;
