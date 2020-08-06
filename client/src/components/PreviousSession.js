import React, { useContext, useState } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button, Row, Col, Container } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';

import Datetime from 'react-datetime';
import moment from 'moment';
import { Rating } from './Rating';
import axios from 'axios';

function PreviousSession(props) {
  const [rating, setRating] = useState(3);
  const [value, setValue] = useState(null);
  const auth = useContext(AuthContext);
  const patient = props.patients.find(item => item.patient_id === props.completedAssistance.patientId);

  const [file, setFile] = useState();
  const [fileName, setFilename] = useState('Choose file');

  function onFileChange(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { fileName } = res.data;

      axios
        .post('/api/previous-sessions', {
          bill_image: fileName,
          // startDate: 1111
        })
        .then((result) => {
          setValue((prev) => [
            ...prev,
            {

            }
          ])
        })
        .catch(error => {
          console.log('post', error);

        });
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server')
      } else {
        console.log(err.response.data.msg)
      }
    }
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <Row className='pre-session-container'>
          <Col md={12}>
            <Row >
              <Col md={4} className='profile-container'>
                <img src={ProfilePicture} alt='pending-req-pic' className='previous-session-profile-picture'></img> {patient.patient.firstname}{patient.patient.lastname}
                <Rating value={rating} onChange={setRating} />
              </Col>

              <Col md={4} className='profile-container'>
                <p>Description: {props.completedAssistance.description}</p>
                <p>Rate: {props.completedAssistance.rate}</p>
              </Col>
              <Col md={4}>
                <p>Check-in: <Datetime inputProps={{ required: true }} dateFormat={false} /></p>
                <p>Check-out: <Datetime dateFormat={false} /></p>
              </Col>
            </Row>
          </Col>

          <Col md={6} className='profile-container-upload'>
            <p>Upload additional expenses</p>

            <label className="btn btn-outline-primary" >
              {fileName}
              <input type='file' onChange={onFileChange} style={{ display: "none" }} />
            </label>

            <Button color="success" >Submit</Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default PreviousSession;
