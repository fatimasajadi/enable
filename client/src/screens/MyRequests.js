import React, { useState } from 'react';
import './MyRequests.css';



import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

function MyRequests(props) {
  const [description, setDescription] = useState('');

  const [typeOfPay, setTypeOfPay] = useState('');


  return (
    <div className='container family-request-container'>
      <Form>
        <FormGroup>
          <Label for="exampleAssistanceDescription">Description</Label>
          <Input type="text" name="description" placeholder="Please enter description for the assistance" value={description} onChange={(e) => setDescription(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="select">Type Of Pay</Label>
          <Input type="select" name="select" id="select" value={typeOfPay} onChange={(e) => setTypeOfPay(e.target.value)} >
            <option value="">Select The type Of Pay</option>
            <option value="one">option one</option>
            <option value="two">option two</option>
          </Input>
        </FormGroup>



        <Button>Submit</Button>
      </Form>
    </div>
  );
}


export default MyRequests;
