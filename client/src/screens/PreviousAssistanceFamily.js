import React, { useState, useEffect } from 'react';
import './PreviousAssistanceFamily.css';
import { Card, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG';
import Rating from '../components/Rating';
import axios from 'axios';
import { Alert } from 'reactstrap';

function PreviousAssistanceFamily(props) {

  const worker = props.workers.find(item => item.id === props.doneRequests.workerId);
  const [rating, setRating] = useState(4);
  const [comment, setComment] = useState();
  const [alert, setAlert] = useState(null);
  const [disabled, setDisabled] = useState(false);

  function onsubmit() {
    axios.post('api/submitPreviousRequest', {
      rating: rating,
      comments: comment,
      contractId: props.doneRequests.id
    })
    setAlert("Submitted Successfully!")
    setDisabled(true)

  }

  return (

    <Col md="6" className="done-requests">

      <Card body>
        {alert &&
          <Alert color="success">
            {alert}
          </Alert>

        }
        <div className="avatar-container">

          <div className='avatar-name'>
            <img className='avatar' src={ProfilePicture}></img>
            <p className="name">
              {worker.firstname} {worker.lastname}
            </p>
          </div>

          <div className='date-time'>

            <p>{props.doneRequests.fromDate.format('ddd Do of MMM, LT')}</p>
            <p>{props.doneRequests.toDate.format('ddd Do of MMM, LT')}</p>
            {props.doneRequests.description}
          </div>

        </div>

        <FormGroup>
          <Label>Comments</Label>
          <Input type="textarea" value={comment} name="text" id="exampleText" onChange={(e) => setComment(e.target.value)} />
        </FormGroup>
        <Rating value={rating} onChange={setRating} />
        <Button outline color="primary" disabled={disabled} onClick={onsubmit} className='submit-comments-button'>Submit</Button>
      </Card>
    </Col>
  );
}

export default PreviousAssistanceFamily;
