import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './MyRequests.css';
import { Container, Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import DatePicker from 'react-datetime';
import CurrencyInput from 'react-currency-input-field';
import FamilyRequest from '../components/FamilyRequest';
import Loading from '../components/Loading';
import { Alert } from 'reactstrap';

function MyRequests() {
  const [description, setDescription] = useState('');
  const [typeOfPay, setTypeOfPay] = useState('');
  const [rate, setRate] = useState('');
  const [workerId, setWorkerId] = useState('');
  const [fromDate, setFromDate] = useState(moment());
  const [toDate, setToDate] = useState(moment().add(12, 'hour'));
  const [isLoadingShown, setLoadingShown] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [value, setValue] = useState([]);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    axios
      .get('/api/workers')
      .then(result => {
        setWorkers(result.data);
        axios.get('/api/previous-assistance')
          .then(result => {
            setValue(result.data.map(item => ({
              description: item.description,
              typeOfPay: item.type_of_pay,
              rate: item.rate,
              workerId: item.worker_id,
              fromDate: moment(item.from_date),
              toDate: moment(item.to_date),
              status: item.status,
              id: item.id,
            })))
          })

          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    if (fromDate.isAfter(toDate)) {
      setAlert('Start time cannot be after end time!');
      return;
    }
    if (!/^\d+(\.\d{1,2})?$/.test(rate)) {
      setAlert('Rate is not valid');
      return;
    }

    setAlert(null);
    setLoadingShown(true);

    axios
      .post('/api/my-requests', {
        description,
        type_of_pay: typeOfPay,
        rate: rate,
        worker_id: workerId,
        from_date: fromDate,
        to_date: toDate,
        status: 'PENDING',
      })
      .then((result) => {
        setLoadingShown(false)

        setValue((prev) => [
          {
            description,
            typeOfPay: typeOfPay,
            rate: rate,
            workerId: Number(workerId),
            fromDate: fromDate,
            toDate: toDate,
            id: result.data.id,
            status: 'PENDING'
          },
          ...prev,
        ])
      })
      .catch(error => {
        console.log('post', error);

      });
  }

  return (
    <Container className='myrequestContainer'>
      <Row>
        {alert && <Col className="from-date-greater-to-date" md={12}>
          <Alert color="danger">
            {alert}
          </Alert>
        </Col>
        }
        <Col sm={12} className='family-request-container p-4 mt-4'>
          <Form onSubmit={(onSubmit)}>
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
                    value={fromDate}
                    onChange={val => setFromDate(val)}
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
                    value={toDate}
                    onChange={val => setToDate(val)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label >Rate of Pay</Label>
              <CurrencyInput
                className="form-control"
                placeholder="$0.00"
                prefix="$"
                allowDecimals={true}
                decimalsLimit={2}
                value={rate}
                onChange={setRate}
              />
            </FormGroup>

            <FormGroup>
              <Label for="select">Type of hours</Label>
              <Input required type="select" name="select" value={typeOfPay} onChange={(e) => setTypeOfPay(e.target.value)} >

                <option value="">Select the type of hours</option>
                <option value="one">Community development</option>
                <option value="two">Residential respite</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="select">Support Worker</Label>
              <Input required type="select" name="select" value={workerId} onChange={(e) => setWorkerId(e.target.value)} >
                <option value="">Select a worker</option>
                {workers && workers.map(item => <option value={item.id} key={item.id}>{item.firstname} {item.lastname}</option>)}
              </Input>
            </FormGroup>

            <Button color="primary" className="submit-request-button" >Submit</Button>
          </Form>

        </Col>

        {isLoadingShown && <Loading />}

        {
          value.map(item => <FamilyRequest key={item.id} value={item} workers={workers} />)
        }
      </Row>
    </Container>
  );
}


export default MyRequests;
