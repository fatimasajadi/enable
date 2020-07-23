import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import {
  BrowserRouter as Router, Switch, Route,
  Link
} from 'react-router-dom';
import Nav from './components/Nav'
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Nav />

        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <div></div>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
