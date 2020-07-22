import React, { useState } from 'react';
import './Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submit() {
    //Ajax to API
  }

  return (
    <div className="loginContainer">
      <Form>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormGroup>
        <Button outline color="primary">Login</Button>
      </Form>
    </div>

  );
}

export default Login;
