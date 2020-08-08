import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import './Login.css';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { AuthContext } from '../components/AuthProvider';
import { Alert } from 'reactstrap';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [danger, setDanger] = useState(false);
  function submit(event) {
    event.preventDefault();
    axios
      .post('/api/login', { email, password })
      .then(result => {

        auth.setUser(result.data);

        const state = { msg: 'Welcome!' };

        if (result.data.type === 'Admin') {
          history.replace('/admin', state)
        } else if (result.data.type === 'Family') {
          history.replace('/family-dashboard', state)
        } else {
          history.replace('/worker-dashboard', state)
        }

      })

      .catch(error => {
        console.log(error);
        setDanger(true);
      });
  }

  return (
    <div className="loginContainer">
      {danger &&
        <Alert color="danger">
          Your username or password is not correct!
     </Alert>
      }
      <Form onSubmit={submit}>
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
