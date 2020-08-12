import React, { useState } from 'react';
import './PreviousSession.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { Button, Row, Col, Collapse, Label, FormGroup } from 'reactstrap';
import { Rating } from './Rating';
import axios from 'axios';
import CurrencyInput from 'react-currency-input-field';
import DatePicker from 'react-datetime';
import { Alert } from 'reactstrap';
import { download, getFilePath } from '../utils/download';
import moment from 'moment';

function PreviousSession(props) {
  const [rating, setRating] = useState(3);
  const [alert, setAlert] = useState(null);
  const [amount, setAmount] = useState(props.completedAssistance.billAmount);
  const [fromTime, setFromTime] = useState(props.completedAssistance.check_in || props.completedAssistance.fromDate);
  const [toTime, setToTime] = useState(props.completedAssistance.check_out || props.completedAssistance.toDate);
  const [file, setFile] = useState();
  const [fileName, setFilename] = useState('Choose file');
  const patient = props.patients.find(item => item.patient_id === props.completedAssistance.patientId);
  const [isOpen, setIsOpen] = useState(false);

  const sessionCompleted = Boolean(props.completedAssistance.check_in) || (alert && alert.type === 'success');

  function onFileChange(e) {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (fromTime.isAfter(toTime)) {
      setAlert({
        type: 'danger',
        message: 'Start time cannot be after end time'
      });
      return;
    }

    if (file && !amount) {
      setAlert({
        type: 'danger',
        message: 'Please enter the expense amount'
      });
      return;
    }
    if (!file && amount) {
      setAlert({
        type: 'danger',
        message: 'Please upload the receipt image if you want to report an expense'
      });
      return;
    }

    if (file && !/^image\//.test(file.type)) {
      setAlert({
        type: 'danger',
        message: 'You can only upload an image file (e.g. jpg or png)'
      });
      return;
    }

    try {
      let fileName;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        fileName = res.data.fileName;
      }

      const result = await axios
        .post('/api/previous-sessions', {
          bill_image: fileName,
          bill_amount: amount,
          check_in: fromTime,
          check_out: toTime,
          contract_id: props.completedAssistance.id
        });
      setAlert({
        type: 'success',
        message: "Successfully submitted!"
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
    <Row className='pre-session-container p-3'>
      {alert && <Col md={12}>
        <Alert color={alert.type}>
          {alert.message}
        </Alert>
      </Col>
      }
      <Col md={2}>
        <img src={ProfilePicture} alt='pending-req-pic' className='previous-session-profile-picture'></img> {patient.patient.firstname}{patient.patient.lastname}
        <Rating value={rating} onChange={setRating} />
      </Col>

      <Col md={4}>
        <p>Description: {props.completedAssistance.description}</p>
        <p>Rate: ${props.completedAssistance.rate}</p>
      </Col>
      <Col md={4}>
        <p>Description: {props.completedAssistance.fromDate.format('ddd Do of MMM, LT')}</p>
        <p>Rate: ${props.completedAssistance.toDate.format('ddd Do of MMM, LT')}</p>
      </Col>


      <Col sm={2} className="d-flex align-items-center justify-content-end">
        <Button color="success" onClick={() => setIsOpen(prev => !prev)}>{isOpen ? 'Close' : sessionCompleted ? 'Show details' : 'End session'}</Button>
      </Col>

      <Col sm={12}>
        <Collapse isOpen={isOpen}>
          <form onSubmit={onSubmit}>
            <Row>
              <Col md={6}>

                <FormGroup>
                  <Label for="checkIn">Check-in</Label>
                  <DatePicker
                    id="checkIn"
                    timeFormat="hh:mm A"
                    value={fromTime}
                    onChange={val => setFromTime(val)}
                    inputProps={{ required: true }}
                    dateFormat
                    inputProps={{ disabled: sessionCompleted }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Check-out</Label>
                  <DatePicker
                    timeFormat="hh:mm A"
                    value={toTime}
                    onChange={val => setToTime(val)}
                    inputProps={{ required: true }}
                    dateFormat
                    inputProps={{ disabled: sessionCompleted }}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>

                {
                  !sessionCompleted || props.completedAssistance.billAmount ? (
                    <FormGroup>
                      <Label>Expense amount</Label>
                      <CurrencyInput
                        className="form-control"
                        placeholder="$0.00"
                        prefix="$"
                        allowDecimals={true}
                        decimalsLimit={2}
                        value={amount}
                        onChange={setAmount}
                        disabled={sessionCompleted}
                      />
                      <small id="passwordHelpInline" class="text-muted">
                        (optional) You can claim an expense
                      </small>
                    </FormGroup>
                  ) : null
                }
                {
                  !sessionCompleted && (
                    <FormGroup>
                      <Label>Upload bill image</Label>
                      <label className="btn btn-block btn-outline-primary mt-2">
                        {fileName}
                        <input type='file' onChange={onFileChange} style={{ display: "none" }} />
                      </label>
                    </FormGroup>)
                }
                {sessionCompleted && props.completedAssistance.billImage ? (
                  <img src={getFilePath(props.completedAssistance.billImage)} className="uploadedImage" onClick={() => download(props.completedAssistance.billImage)} />
                ) : null}

              </Col>
              <Col sm={12}>

                {sessionCompleted ?
                  <Button disabled color="success">Submitted</Button> :
                  <Button color="success" >Submit</Button>
                }
              </Col>
            </Row>
          </form>
        </Collapse>
      </Col>
    </Row>
  );
}

export default PreviousSession;
