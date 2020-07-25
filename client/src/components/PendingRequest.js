import React from 'react';
import './PendingRequest.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button } from 'reactstrap';

function PendingRequest() {
  return (
    <div className='request-container'>
      <div className='profile-pic-rating'>
        <img src={ProfilePicture} alt='pending-req-pic' className='pending-req-pic'></img>
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
