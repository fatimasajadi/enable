import React, { useContext, useState } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button, Row, Col, Container } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';
import Upload from '../components/Upload';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Rating } from './Rating';

function PreviousSession(props) {
  const [rating, setRating] = useState(3);
  const auth = useContext(AuthContext);
  const patient = props.patients.find(item => item.patient_id === props.completedAssistance.patientId);
  return (
    <Container>
      <Row className='pre-session-container'>
        <Col md={12}>
          <Row >
            <Col md={4}>
              <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img> {patient.patient.firstname}{patient.patient.lastname}
              <Rating value={rating} onChange={setRating} />
            </Col>

            <Col md={4}>
              <p>Description: {props.completedAssistance.description}</p>
              <p>Rate: {props.completedAssistance.rate}</p>
            </Col>
            <Col md={4}>
              <p>Check-in: <Datetime dateFormat={false} /></p>
              <p>Check-out: <Datetime dateFormat={false} /></p>
            </Col>
          </Row>
        </Col>

        <Col md={6}>
          <Upload />
        </Col>
      </Row>
    </Container>
  );
}

export default PreviousSession;
