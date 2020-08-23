import React from 'react';
import Login from './screens/Login';
import Register from './screens/Register';
import {
  BrowserRouter as Router, Switch, Route,
  Link,
  Redirect
} from 'react-router-dom';
import 'react-datetime/css/react-datetime.css';
import Nav from './components/Nav';
import './App.css';
import AuthProvider, { AuthContext } from './components/AuthProvider';
import Calendar from './components/Calendar';
import WorkerHome from './screens/WorkerHome';
import FamilyHome from './screens/FamilyHome';
import PendingRequest from './components/PendingRequest';
import MyRequests from './screens/MyRequests';
import PreviousAssistanceFamilyS from './screens/PreviousAssistanceFamilyS';
import Admin from './screens/Admin';
import PreviousSessions from './screens/PreviousSessions';
import Invoice from './components/Invoice';
import ErrorBadRequest from './components/ErrorBadRequest';

function App() {
  return (
    <>
      <AuthProvider>
        <AuthContext.Consumer>
          {
            (authValue) => {

              console.log(authValue)
              return (
                <Router>
                  <Nav />
                  <Switch>

                    <Route exact path="/">
                      <div className="backgroundImage">
                        <h2 className="textOnBg">ENABLE brings people together</h2>
                        <p className="pOnBg">We create meaningful partnerships between people with disabilities and support workers based on shared interests</p>
                      </div>
                    </Route>

                    <Route exact path="/error">
                      <ErrorBadRequest />
                    </Route>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/register">
                      <Register />
                    </Route>

                    {!authValue.user && <>
                      <Route path="*">
                        <Redirect to="/login" />
                      </Route>
                    </>
                    }

                    {authValue.user && authValue.user.type === 'Admin' &&
                      <>
                        <Route path="/admin">
                          <Admin />
                        </Route>
                        <Redirect path="/admin" to="/error" />
                      </>
                    }


                    {authValue.user && authValue.user.type === 'Family' &&
                      <>
                        <Route exact path="/family-dashboard">
                          <FamilyHome />
                        </Route>
                        <Route exact path="/my-requests">
                          <MyRequests />
                        </Route>
                        <Route exact path="/previous-assistance">
                          <PreviousAssistanceFamilyS />
                        </Route>
                        <Redirect path="*" to="/error" />

                      </>}
                    {authValue.user && authValue.user.type === 'Support Worker' && <>
                      <Route exact path="/worker-dashboard">
                        <WorkerHome />
                      </Route>
                      <Route exact path="/worker-availability">
                        <Calendar />
                      </Route>
                      <Route exact path="/pending-requests">
                        <PendingRequest />
                      </Route>
                      <Route exact path="/previous-sessions">
                        <PreviousSessions />
                      </Route>
                      <Redirect path="*" to="/error" />
                    </>}


                  </Switch>
                </Router>
              )
            }
          }
        </AuthContext.Consumer>

      </AuthProvider>
    </>
  );
}

export default App;