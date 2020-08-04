import React, { useContext, useState, useEffect } from 'react';
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
  const [contracts, setContracts] = useState(null);


  useEffect(() => {
    axios
      .get('/api/pending-requests')
      .then(result => {
        setContracts(result.data)
        console.log(result)
      })
      .catch(error => {
        console.log(error);
      });

  }, [])


  return (
    <>
      {
        contracts && contracts.map(contract => (
          <div className='request-container' key={contract.id}>
            <div className='profile-pic-rating'>
              <img src={ProfilePicture} alt='pending-req-pic' className='pending-req-pic'></img> {contract.patient.firstname} {contract.patient.lastname}
              <Rating value={rating} onChange={setRating} />
            </div>

            <div className='description-rate'>
              <p>Description: {contract.description}</p>
              <p>Rate: ${contract.rate}</p>
            </div>

            <div className='pending-req-button'>
              <Button color="success" >Accept</Button>
              <Button color="success" >Reject</Button>
            </div>

          </div>
        ))
      }
    </>
  );
}

export default PendingRequest;
