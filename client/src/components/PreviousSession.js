import React, { useContext, useState } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button, Row, Col, Container } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';
import Upload from '../components/Upload';
import { Rating } from './Rating';

function PreviousSession() {
  const [rating, setRating] = useState(4);
  const auth = useContext(AuthContext);
  return (
    <Container>
      <Row className='pre-session-container'>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img> {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
              <Rating value={rating} onChange={setRating} />
            </Col>

            <Col md={6}>
              <p>Description: </p>
              <p>Rate: </p>
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
