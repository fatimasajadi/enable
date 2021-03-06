import React, { useState, useEffect } from 'react';
import './FamilyRequest.css'
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu, Container } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG'
import { Rating } from './Rating';
import { FormGroup, Row, Col } from 'reactstrap';
import axios from 'axios';
import { Alert } from 'reactstrap';

function FamilyRequest(props) {
  const [alert, setAlert] = useState(null);
  const [rating, setRating] = useState(4);
  const worker = props.workers.find(item => item.id === props.value.workerId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function onDelete() {
    axios.post('/api/delete', {
      contractId: props.value.id
    })
    setAlert('This request is successfully deleted!')
  }

  return (

    <Container>
      <Row>
        {alert && <Col mt-6 md={12}>
          <Alert color="success">
            {alert}
          </Alert>
        </Col>
        }
        <Col md={12}>
          <Row className='pre-session-container'>
            <Col md={2}>
              <FormGroup>
                <div className='img-name'>
                  <img src={ProfilePicture} alt='pending-req-pic' className='pre-session-pic'></img>
                  <p className='name'>{worker.firstname} {worker.lastname} </p>
                </div>
                <Rating value={rating} onChange={setRating} />
              </FormGroup>
            </Col>

            <Col md={4}>
              <FormGroup className="description-rate-family">
                <p><b>Description: </b> {props.value.description}</p>
                <p><b>Rate: </b>${props.value.rate} /hour</p>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <div className='description-rate-p'>
                  <p><b>From: </b> {props.value.fromDate.format('ddd Do of MMM, LT')} </p>
                  <p><b>To: </b> {props.value.toDate.format('ddd Do of MMM, LT')}</p>
                </div>
              </FormGroup>
            </Col>

            <Col md={2} className="pt-4">
              {props.value.status === 'PENDING' && (
                <FormGroup>
                  <ButtonGroup>
                    <Button disabled color="secondary">{props.value.status}</Button>
                    <ButtonDropdown isOpen={isDropdownOpen} toggle={() => { setIsDropdownOpen(prev => !prev) }}>
                      <DropdownToggle caret />
                      <DropdownMenu>
                        <DropdownItem onClick={onDelete}>Delete</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                  </ButtonGroup>
                </FormGroup>

              )

              }
              {props.value.status === 'ACCEPTED' &&
                <Button disabled color="success">{props.value.status}</Button>
              }
              {props.value.status === 'REJECTED' &&
                <Button disabled color="danger">{props.value.status}</Button>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}


export default FamilyRequest;
