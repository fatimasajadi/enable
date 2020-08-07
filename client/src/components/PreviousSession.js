import React, { useState } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button, Row, Col, Container } from 'reactstrap';
import Datetime from 'react-datetime';
import moment from 'moment';
import { Rating } from './Rating';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';

function PreviousSession(props) {
  const [rating, setRating] = useState(3);
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState('');
  const [fromTime, setFromTime] = useState();
  const [toTime, setToTime] = useState();
  // const patient = props.patients.find(item => item.patient_id === props.completedAssistance.patientId);

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
          bill_amount: amount,
          check_in: fromTime,
          check_out: toTime,
          contract_id: props.completedAssistance.id



        })
        .then((result) => {
          setValue((prev) => [
            ...prev,
            {
              bill_image: fileName,
              bill_amount: amount,
              check_in: fromTime,
              check_out: toTime,
              contract_id: props.completedAssistance.id

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
                {/* <img src={ProfilePicture} alt='pending-req-pic' className='previous-session-profile-picture'></img> {patient.patient.firstname}{patient.patient.lastname} */}
                <Rating value={rating} onChange={setRating} />
              </Col>

              <Col md={4} className='profile-container'>
                <p>Description: {props.completedAssistance.description}</p>
                <p>Rate: ${props.completedAssistance.rate}</p>
              </Col>
              <Col md={4}>
                <p>Check-in: <Datetime
                  timeFormat="hh:mm A"
                  value={fromTime}
                  onChange={val => setFromTime(val)}
                  inputProps={{ required: true }}
                  dateFormat={false}
                />
                </p>
                <p>Check-out: <Datetime
                  timeFormat="hh:mm A"
                  value={toTime}
                  onChange={val => setToTime(val)}
                  inputProps={{ required: true }}
                  dateFormat={false}
                />
                </p>
              </Col>
            </Row>
          </Col>

          <Col md={6} className='profile-container-upload'>
            <CurrencyInput
              className="form-control"
              placeholder="$0.00"
              prefix="$"
              allowDecimals={true}
              decimalsLimit={2}
              value={amount}
              onChange={setAmount}
            />

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
