import React, { useContext } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';

function PreviousSession() {
  const auth = useContext(AuthContext);
  return (
    <div className='pre-session-container'>
      <div className='pre-session-rating'>
        <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img> {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
        <div className='star'>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
        </div>
      </div>
      <div className='description-rate'>
        <p>Description: </p>
        <p>Rate: </p>
      </div>

      <div className='pre-session-button'>
        <p>Upload expenses</p>
        <Button color="success" >Upload</Button>
      </div>

    </div>
  );
}

export default PreviousSession;
