import './Admin.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './MyRequests.css';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DatePicker from 'react-datetime';
import { Table } from 'reactstrap';
import Datetime from 'react-datetime';


const Admin = (props) => {
  const [fromDate, setFromDate] = useState(moment());
  const [toDate, setToDate] = useState(moment());
  const [workers, setWorkers] = useState(null);
  const [workerId, setWorkerId] = useState('');

  useEffect(() => {
    axios
      .get('/api/workers')
      .then(result => {
        setWorkers(result.data);
        console.log("result", result.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (

    <div className='container admin-container'>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label>From</Label>
            <Datetime
              timeFormat="hh:mm A"
              value={fromDate}
              onChange={val => setFromDate(val)}
              inputProps={{ required: true }}
              dateFormat={true}
              timeFormat={false}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>To</Label>

            <Datetime
              timeFormat="hh:mm A"
              value={toDate}
              onChange={val => setToDate(val)}
              inputProps={{ required: true }}
              dateFormat={true}
              timeFormat={false}
            />
          </FormGroup>
        </Col>
      </Row>


      <FormGroup>
        <Label for="select">Family</Label>
        <Input required type="select" name="select" value={workerId} onChange={(e) => setWorkerId(e.target.value)} >
          <option value="">Select a family</option>
          {workers && workers.map(item => <option value={item.id} key={item.id}>{item.firstname} {item.lastname}</option>)}
        </Input>
      </FormGroup>

      <Button color="primary" className="submit-request-button" >Submit</Button>

    </div>
  );
}

export default Admin;
