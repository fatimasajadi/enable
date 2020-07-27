import React, { useContext } from 'react';
import './PreviousAssistanceFamily.css';
import {
  Card, CardTitle, CardText, Row, Col, CardBody,
  Button, Form, FormGroup, Label, Input, FormText
}
  from 'reactstrap';
import ProfilePicture from '../images/profilePicture.PNG';
import { AuthContext } from '../components/AuthProvider';

function PreviousAssistanceFamily() {
  const auth = useContext(AuthContext);
  return (
    <div className='container pre-assistance-family-container'>
      <Row>
        <Col sm="6">
          <Card body>
            <div className="avatar-container">

              <div className='avatar-name'>
                <img className='avatar' src={ProfilePicture}></img>
                <p className="name">
                  {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
                </p>
              </div>

              <div className='date-time'>
                <p>[Date placeholder]</p>
                <p>[Time placeholder]</p>
              </div>

            </div>

            <FormGroup>
              <Label>Comments</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <div className='star'>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </div>

            <Button outline color="primary" className='submit-comments-button'>Submit</Button>
          </Card>
        </Col>
        <Col sm="6">
          <Card body>
            <div className="avatar-container">

              <div className='avatar-name'>
                <img className='avatar' src={ProfilePicture}></img>
                <p className="name">
                  {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
                </p>
              </div>

              <div className='date-time'>
                <p>[Date placeholder]</p>
                <p>[Time placeholder]</p>
              </div>
            </div>
            <FormGroup>
              <Label>Comments</Label>
              <Input type="textarea" name="text" id="exampleText" />
            </FormGroup>
            <div className='star'>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
              <i class="fa fa-star" aria-hidden="true"></i>
            </div>

            <Button outline color="primary" className='submit-comments-button'>Submit</Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PreviousAssistanceFamily;
