import React, { useState } from 'react';
import './FamilyRequest.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG'
import { Rating } from './Rating';

function FamilyRequest(props) {
  const [rating, setRating] = useState(1);
  return (
    <div className='pre-session-container'>
      <div className='pre-session-rating'>
        <div className='img-name'>
          <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img>
          <p className='name'>{props.value.worker} </p>
        </div>

        <Rating value={rating} onChange={setRating} />
      </div>
      <div className='description-rate'>
        <p>Description: {props.value.description}</p>
        <p>Rate, Type: {props.value.rateOfPay}, {props.value.typeOfPay}</p>
      </div>

      <div className='description-rate'>
        <p>Date: {props.value.dtFrom.format('ddd Do of MMM, H:m:s')} to {props.value.dtTo.format('YYYY-MM-DD H:m:s')} </p>
        <p>Time: </p>
      </div>

      <div className='pre-session-button'>

        <Button disabled color="secondary">Pending</Button>
      </div>

    </div>

  );
}


export default FamilyRequest;
