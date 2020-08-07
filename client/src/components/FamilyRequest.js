import React, { useState } from 'react';
import './FamilyRequest.css'
import { Button, ButtonGroup, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG'
import { Rating } from './Rating';
import { Container, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

function FamilyRequest(props) {
  const [rating, setRating] = useState(4);
  const worker = props.workers.find(item => item.id === props.value.workerId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (

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

      <div className='pre-session-button'>

        {props.value.status === 'PENDING' && (
          <Col md={2}>
            <FormGroup>
              <ButtonGroup>
                <Button disabled color="secondary">{props.value.status}</Button>
                <ButtonDropdown isOpen={isDropdownOpen} toggle={() => { setIsDropdownOpen(prev => !prev) }}>
                  <DropdownToggle caret />
                  <DropdownMenu>
                    <DropdownItem>Delete</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </ButtonGroup>
            </FormGroup>
          </Col>

        )

        }
        {props.value.status === 'ACCEPTED' &&
          <Button disabled color="success">{props.value.status}</Button>
        }
        {props.value.status === 'REJECTED' &&
          <Button disabled color="danger">{props.value.status}</Button>
        }

      </div>
    </Row >
  );
}


export default FamilyRequest;
