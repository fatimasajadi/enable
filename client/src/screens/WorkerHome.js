import React, { useContext } from 'react';
import './WorkerHome.css';
import ProfilePicture from '../images/profilePicture.PNG';
import { AuthContext } from '../components/AuthProvider';

function WorkerHome() {
  const auth = useContext(AuthContext);
  return (
    <>
      <img className='avatar' src={ProfilePicture}></img>
      <div className='worker-info'>
        <p className='worker-home'>{auth.user.firstname}</p>
        <p className='worker-home'>{auth.user.lastname}</p>
        <p className='worker-home'>{auth.user.email}</p>
        <p className='worker-home'>{auth.user.address}</p>
        <p className='worker-home'>{auth.user.phoneNumber}</p>
        <p className='worker-home'>{auth.user.type}</p>
      </div>
    </>
  );
}

export default WorkerHome;

