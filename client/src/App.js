import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import {
  BrowserRouter as Router, Switch, Route,
  Link
} from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';
import AuthProvider from './components/AuthProvider';
import Calendar from './components/Calendar';
import WorkerHome from './screens/WorkerHome';
import PendingRequest from './components/PendingRequest';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Nav />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>

            <Route path="/worker-availability">
              <Calendar />
            </Route>
            <Route path="/pending-requests">
              <PendingRequest />
            </Route>

            <Route path="/worker-dashboard">
              <WorkerHome />
            </Route>

            <Route path="/">
              <div className="backgroundImage">
                <h2 className="textOnBg">ENABLE brings people together</h2>
                <p className="pOnBg">We create meaningful partnerships between people with disabilities and support workers based on shared interests</p>
              </div>
            </Route>

          </Switch>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
