import React, { useState } from 'react';
import './PreviousAssistanceFamily.css';
import { Card, Row, Col, Button, FormGroup, Label, Input } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG';
import Rating from '../components/Rating';

function PreviousAssistanceFamily(props) {

  const worker = props.workers.find(item => item.id === props.doneRequests.workerId);
  const [rating, setRating] = useState(4);


  return (
    <div className='container pre-assistance-family-container'>
      <Row>
        <Col sm="6">
          <Card body>
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
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <Rating value={rating} onChange={setRating} />
            <Button outline color="primary" className='submit-comments-button'>Submit</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PreviousAssistanceFamily;
