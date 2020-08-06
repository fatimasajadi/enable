import React, { useState, useEffect } from 'react';
import './PreviousAssistanceFamilyS.css';
import axios from "axios";
import PreviousAssistanceFamily from './PreviousAssistanceFamily';
import moment from 'moment';
import { Row } from 'reactstrap';

function PreviousAssistanceFamilyS() {

  const [doneRequests, setDoneRequests] = useState(null);
  const [workers, setWorkers] = useState(null);

  useEffect(() => {
    axios
      .get('/api/workers')
      .then(result => {
        setWorkers(result.data)
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('/api/completed-requests')
      .then(result => {
        setDoneRequests(result.data.map(item => ({
          description: item.description,
          typeOfPay: item.type_of_pay,
          rate: item.rate,
          workerId: item.worker_id,
          fromDate: moment(item.from_date),
          toDate: moment(item.to_date),
          status: item.status,
        })))

      })
      .catch(error => {
        console.log(error);
      });

  }, [])

  return (
    <>
      <div className='container pre-assistance-family-container ah'>
        <Row  >
          {doneRequests &&
            doneRequests.map(item => <PreviousAssistanceFamily key={item.id} doneRequests={item} workers={workers} />)
          }
        </Row>
      </div>

    </>
  );
}
export default PreviousAssistanceFamilyS;