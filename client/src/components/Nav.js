import React, { useContext } from 'react';
import Logo from '../images/logo.png';
import { Link } from 'react-router-dom';
import './Nav.css';
import { Button } from 'reactstrap';
import { AuthContext } from './AuthProvider';

function Nav() {
  const { user, setUser } = useContext(AuthContext);

  function logOut() {
    setUser(null);

  }

  return (
    <>
      <div className="nav">
        <Link to="/"><img src={Logo} alt='logo' /></Link>
        {user && user.type === "Support Worker" && (
          <>
            <Link className="navDashboard" to="/worker-dashboard">  {user && `Home`}</Link>
            <Link className="navDashboard" to="/pending-requests">  {user && `Pending requests`}</Link>
            <Link className="navDashboard" to="/previous-sessions">  {user && `Previous sessions`}</Link>
            <Link className="navDashboard" to="/worker-availability"> {user && `Availability`}</Link>
          </>
        )
        }

        {user && user.type === "Family" && (
          <>
            <Link className="navDashboard" to="/family-dashboard">  {user && `Home`}</Link>
            <Link className="navDashboard" to="/my-requests">  {user && `My requests`}</Link>
            <Link className="navDashboard" to="/previous-assistance">  {user && `Previous requests`}</Link>
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
