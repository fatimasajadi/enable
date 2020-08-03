import React, { useState } from 'react';
import './FamilyRequest.css'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG'
import { Rating } from './Rating';

function FamilyRequest(props) {
  const [rating, setRating] = useState(1);
  const worker = props.workers.find(item => item.id === props.value.worker);
  console.log('-> worker', worker)

  return (
    <div className='pre-session-container'>
      <div className='pre-session-rating'>
        <div className='img-name'>
          <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img>
          <p className='name'>{worker.firstname} {worker.lastname} </p>
        </div>

        <Rating value={rating} onChange={setRating} />
      </div>
      <div className='description-rate'>
        <p><b>Description: </b> {props.value.description}</p>
        <p><b>Rate: </b>${props.value.rateOfPay} /hour</p>
      </div>

      <div className='description-rate-p'>
        <p><b>From: </b> {props.value.dtFrom.format('ddd Do of MMM, LT')} </p>
        <p><b>To: </b> {props.value.dtTo.format('ddd Do of MMM, LT')}</p>
      </div>

      <div className='pre-session-button'>

        <Button disabled color="secondary">Pending</Button>

      </div>

    </div>

  );
}


export default FamilyRequest;
