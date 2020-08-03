import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './MyRequests.css';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DatePicker from 'react-datetime';
import CurrencyInput from 'react-currency-input-field';
import FamilyRequest from '../components/FamilyRequest';
import Loading from '../components/Loading';

function MyRequests() {
  const [description, setDescription] = useState('');
  const [typeOfPay, setTypeOfPay] = useState('');
  const [rateOfPay, setRateOfPay] = useState('');
  const [worker, setWorker] = useState('');
  const [dtFrom, setDtFrom] = useState(moment());
  const [dtTo, setDtTo] = useState(moment().add(12, 'hour'));
  const [isLoadingShown, setLoadingShown] = useState(false);
  const [workers, setWorkers] = useState(null);

  //the state object looks like this:
  /*{
    "description": description,
    "typeOfPay": typeOfPay,
    "rateOfPay": rateOfPay,
    "worker": worker,
    "dtFrom": dtFrom,
    "dtTo": dtTo
  }
  */
  const [value, setValue] = useState([]);

  useEffect(() => {
    axios
      .get('/api/workers')
      .then(result => {
        setWorkers(result.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Container>

      <div className='family-request-container'>
        <Form onSubmit={event => {
          event.preventDefault();

          setLoadingShown(true);

          Promise.all([
            axios
              .post('/api/my-requests', {
                description,
                type_of_pay: typeOfPay,
                rate: rateOfPay,
                worker_id: worker,
                from_date: dtFrom,
                to_date: dtTo
              }),
            new Promise(r => setTimeout(r, 2000)),
          ])
            .then(([result]) => {
              console.log(result)
              setValue((prev) => [
                ...prev,
                {
                  "description": description,
                  "typeOfPay": typeOfPay,
                  "rateOfPay": rateOfPay,
                  "worker": Number(worker),
                  "dtFrom": dtFrom,
                  "dtTo": dtTo,
                  id: result.data.id
                }
              ])
              setLoadingShown(false);
            })
            .catch(error => {
              console.log(error);
              setLoadingShown(false);
            });


        }}>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input required type="textarea" name="description" placeholder='Please provide a description for your request' value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label>From</Label>

                <DatePicker
                  inputProps={{
                    style: { width: 250 }
                  }}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="hh:mm A"
                  value={dtFrom}
                  onChange={val => setDtFrom(val)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>To</Label>

                <DatePicker
                  inputProps={{
                    style: { width: 250 }
                  }}
                  dateFormat="DD-MM-YYYY"
                  timeFormat="hh:mm A"
                  value={dtTo}
                  onChange={val => setDtTo(val)}
                />

              </FormGroup>
            </Col>
          </Row>

          <FormGroup>
            <Label >Rate of Pay (per hour ?) </Label>
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
            <Label for="select">Type of Pay</Label>
            <Input required type="select" name="select" value={typeOfPay} onChange={(e) => setTypeOfPay(e.target.value)} >

              <option value="">Select the type of pay</option>
              <option value="one">option one</option>
              <option value="two">option two</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="select">Support Worker</Label>
            <Input required type="select" name="select" value={worker} onChange={(e) => setWorker(e.target.value)} >
              <option value="">Select a worker</option>
              {workers && workers.map(item => <option value={item.id} key={item.id}>{item.firstname} {item.lastname}</option>)}
            </Input>
          </FormGroup>

          <Button color="primary" className="submit-request-button" >Submit</Button>
        </Form>

      </div>

      {isLoadingShown && <Loading />}

      {
        value.map(item => <FamilyRequest key={item.id} value={item} workers={workers} />)
      }
    </Container>
  );
}


export default MyRequests;
