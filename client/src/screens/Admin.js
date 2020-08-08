import './Admin.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './MyRequests.css';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Datetime from 'react-datetime';


const Admin = (props) => {
  const [fromDate, setFromDate] = useState(moment().subtract(30, 'days'));
  const [toDate, setToDate] = useState(moment());
  const [families, setFamilies] = useState(null);
  const [patientId, setPatientId] = useState('');
  const [contracts, setContracts] = useState([])

  useEffect(() => {
    axios
      .get('/api/family')
      .then(result => {
        setFamilies(result.data);
        console.log("result", result.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    axios
      .get(`/api/admin?from_date=${fromDate}&to_date=${toDate}&patient_id=${patientId}`)
      .then((result) => {
        setContracts(result.data)
        console.log("contracts", result.data)
      })
  }

  return (

    <div className='container admin-container'>
      <Form onSubmit={onSubmit}>
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
          <Input required type="select" name="select" value={patientId} onChange={(e) => setPatientId(e.target.value)} >
            <option value="">Select a family</option>
            {families && families.map(item => <option value={item.id} key={item.id}>{item.firstname} {item.lastname}</option>)}
          </Input>
        </FormGroup>

        <Button color="primary" className="submit-request-button" >Query</Button>
      </Form>
    </div>
  );
}

export default Admin;
