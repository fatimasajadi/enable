import React, { useContext, useState } from 'react';
import './PendingRequest.css';
import moment from 'moment';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';
import { Rating } from './Rating';
import axios from 'axios';
function PendingRequest() {
  const auth = useContext(AuthContext);

  const [rating, setRating] = useState(4);

  const [description, setDescription] = useState('');
  const [typeOfPay, setTypeOfPay] = useState('');
  const [rateOfPay, setRateOfPay] = useState('');
  const [worker, setWorker] = useState('');
  const [dtFrom, setDtFrom] = useState(moment());
  const [dtTo, setDtTo] = useState(moment().add(12, 'hour'));

  axios
    .post('/api/my-requests', { description, typeOfPay, rateOfPay, worker, dtFrom, dtTo })
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error);
    });

  return (
    <div className='request-container'>
      <div className='profile-pic-rating'>
        <img src={ProfilePicture} alt='pending-req-pic' className='pending-req-pic'></img> {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
        <Rating value={rating} onChange={setRating} />
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
