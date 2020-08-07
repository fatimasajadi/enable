import React, { useState, useEffect } from 'react';
import './PreviousSessions.css';
import axios from 'axios';
import moment from 'moment';
import PreviousSession from '../components/PreviousSession';

function PreviousSessions() {
  const [completedAssistance, setCompletedAssistance] = useState(null);
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    axios
      .get('/api/pending-requests')
      .then(result => {
        setPatients(result.data)
        console.log("sag", result.data)
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('/api/completed-assistance')
      .then(result => {
        console.log("ajab", result.data)
        setCompletedAssistance(result.data.map(item => ({
          description: item.description,
          typeOfPay: item.type_of_pay,
          rate: item.rate,
          patientId: item.patient_id,
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
      {completedAssistance &&
        completedAssistance.map(item => <PreviousSession key={item.id} completedAssistance={item} patients={patients} />)
      }
    </>
  );
}

export default PreviousSessions;