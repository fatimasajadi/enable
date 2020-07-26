import React from 'react';
import './FamilyRequest.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG'

function FamilyRequest() {
  return (
    <div className='pre-session-container'>
      <div className='pre-session-rating'>
        <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img>
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

      <div className='description-rate'>
        <p>Date: </p>
        <p>Time: </p>
      </div>

      <div className='pre-session-button'>

        <Button color="danger">Rejected</Button>
      </div>

    </div>

  );
}


export default FamilyRequest;
