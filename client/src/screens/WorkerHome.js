import React, { useContext } from 'react';
import {
  Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText,
  Col
} from 'reactstrap';
import './WorkerHome.css';
import ProfilePicture from '../images/profilePicture.PNG';
import { AuthContext } from '../components/AuthProvider';

function WorkerHome() {
  const auth = useContext(AuthContext);
  return (
    <div className="container worker-container">
      <Col md={6}>
        <Card>
          <CardHeader>Profile Information</CardHeader>
          <CardBody>
            <div className="avatar-wrapper">
              <img className='avatar' src={ProfilePicture}></img>

              <div>
                {auth.user && auth.user.firstname} {auth.user && auth.user.lastname}
              </div>
            </div>
            <div className="worker-info-entry">
            </div>

            <div className="worker-info-entry">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
              <span>{auth.user && auth.user.email}</span>
            </div>

            <div className="worker-info-entry">
              <i class="fa fa-address-card-o" aria-hidden="true"></i>
              <span>{auth.user && auth.user.address}</span>
            </div>
            <div className="worker-info-entry">
              <i class="fa fa-mobile" aria-hidden="true"></i>
              <span>{auth.user && auth.user.phonenumber}</span>
            </div>

            <p className='worker-info-entry'>
              <i class="fa fa-user" aria-hidden="true"></i>
              <span>{auth.user && auth.user.type}</span>

            </p>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
}

export default WorkerHome;

