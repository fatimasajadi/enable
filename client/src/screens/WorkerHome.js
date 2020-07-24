import React from 'react';
import './WorkerHome.css';
import ProfilePicture from '../images/profilePicture.PNG';

function WorkerHome() {
  return (
    <img className='avatar' src={ProfilePicture}></img>
  );
}

export default WorkerHome;

