import React, { useState } from 'react';
import './MyRequests.css';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import CurrencyInput from 'react-currency-input-field';
import TimeDatePicker from '../components/TimeDatePicker';

function MyRequests(props) {
  const [description, setDescription] = useState('');
  const [typeOfPay, setTypeOfPay] = useState('');
  const [rateOfPay, setRateOfPay] = useState('');
  const [worker, setWorker] = useState('');

  return (

    <div className='container family-request-container'>
      <Form>
        <FormGroup>
          <Label for="exampleAssistanceDescription">Description</Label>
          <Input type="text" name="description" placeholder="Please enter description for the assistance" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>

        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">From</Label>
              <TimeDatePicker />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">To</Label>
              <TimeDatePicker />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label >Rate Of Pay (per hour ?) </Label>
          <CurrencyInput
            className="form-control"
            placeholder="$0.00"
            prefix="$"
            allowDecimals={true}
            decimalsLimit={2}
            value={rateOfPay}
            onChange={setRateOfPay}
          />
        </FormGroup>

        <FormGroup>
          <Label for="select">Type Of Pay</Label>
          <Input type="select" name="select" value={typeOfPay} onChange={(e) => setTypeOfPay(e.target.value)} >
            <option value="">Select The type Of Pay</option>
            <option value="one">option one</option>
            <option value="two">option two</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label for="select">Support Worker</Label>
          <Input type="select" name="select" value={worker} onChange={(e) => setWorker(e.target.value)} >
            <option value="">Select The Support Worker</option>
            <option value="one">option one</option>
            <option value="two">option two</option>
          </Input>
        </FormGroup>



        <Button color="primary">Submit</Button>
      </Form>
    </div>
  );
}


export default MyRequests;
