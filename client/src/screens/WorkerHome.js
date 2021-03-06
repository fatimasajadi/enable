import React, { useContext, useState, useEffect } from 'react';
import {
  Card, CardHeader, CardBody, Col, Row, Container
} from 'reactstrap';
import './WorkerHome.css';
import ProfilePicture from '../images/profilePicture.PNG';
import { AuthContext } from '../components/AuthProvider';
import { Alert } from 'reactstrap';
import { useLocation, useHistory } from 'react-router-dom';


function WorkerHome() {
  const auth = useContext(AuthContext);

  const location = useLocation();
  const history = useHistory();
  const [flashMessage] = useState(location.state && location.state.msg);
  useEffect(() => {
    history.replace(location.pathname);
  }, []);

  return (
    <Container className="pt-5">
      <Row>
        <Col md={12}>
          {
            flashMessage && <Alert color="success">
              {flashMessage}
            </Alert>
          }
        </Col>
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
      </Row>
    </Container>
  );
}

export default WorkerHome;

