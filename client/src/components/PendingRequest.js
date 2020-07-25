import React, { useContext } from 'react';
import './PendingRequest.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';

function PendingRequest() {
  const auth = useContext(AuthContext);
  return (
    <div className='request-container'>
      <div className='profile-pic-rating'>
        <img src={ProfilePicture} alt='pending-req-pic' className='pending-req-pic'></img> {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
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

      <div className='pending-req-button'>
        <Button color="success" >Accept</Button>
        <Button color="success" >Reject</Button>
      </div>

    </div>
  );
}

export default PendingRequest;
