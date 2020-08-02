import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import './Register.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { AuthContext } from '../components/AuthProvider';

function Register() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [type, setType] = useState('');


  function submit() {
    axios
      .post('/api/register', { firstName, lastName, email, password, address, phoneNumber, type })
      .then(result => {
        console.log("server says", result.data)
        auth.setUser(result.data);
        const state = { msg: 'Registeration is successful!' };

        if (result.data.type === 'Admin') {
          history.replace('/admin', state)
        } else if (result.data.type === '') {
          history.replace('/worker-dashboard', state)
        } else {
          history.replace('/worker-dashboard', state)
        }

      })
      .catch(error => {
        console.log(error);
      });


  }


  return (
    <div className="registerContainer">


      <Form>
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="firstName" name="firstName" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="lastName" name="lastName" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="select">Select</Label>
          <Input type="select" name="select" id="select" value={type} onChange={(e) => setType(e.target.value)} >
            <option value="">select</option>
            <option value="Support Worker">Support Worker</option>
            <option value="Family">Family</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="phoneNumber">Phone Number</Label>
          <Input type="phoneNumber" name="phoneNumber" placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input type="address" name="address" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input type="password" name="confirmPassword" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <Button outline color="primary" onClick={submit}>Register</Button>
      </Form>
    </div>
  );
}

export default Register;
