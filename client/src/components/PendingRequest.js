import React, { useContext, useState, useEffect } from 'react';
import './PendingRequest.css';
import ProfilePicture from '../images/profilePicture.PNG'
import { AuthContext } from '../components/AuthProvider';
import { Rating } from './Rating';
import axios from 'axios';
import { Button, Row, Col, Container } from 'reactstrap';
import moment from 'moment'
function PendingRequest() {

  const auth = useContext(AuthContext);
  const [rating, setRating] = useState(4);
  const [contracts, setContracts] = useState(null);
  const [status, setStatus] = useState();

  useEffect(() => {
    axios
      .get('/api/pending-requests')
      .then(result => {
        setContracts(result.data)
        console.log(result)
      })
      .catch(error => {
        console.log(error);
      });

  }, [])

  function onAccept(contractId) {
    axios
      .post('/api/status', {
        status: 'ACCEPTED',
        contract_id: contractId
      })
      .then(result => {
        setContracts(prev => prev.map(contract => {
          if (contract.id === contractId) {
            return {
              ...contract,
              status: 'ACCEPTED',
            }
          }

          return contract;
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function onReject(contractId) {
    axios
      .post('/api/status', {
        status: 'REJECTED',
        contract_id: contractId
      })
      .then(result => {
        setContracts(prev => prev.map(contract => {
          if (contract.id === contractId) {
            return {
              ...contract,
              status: 'REJECTED',
            }
          }

          return contract;
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }
  console.log("ho", contracts)

  return (
    <Container>
      {
        contracts && contracts.map(contract => (
          <Row className="request-container p-3" key={contract.id}>
            <Col sm={2} className='profile-pic-rating'>
              <img src={ProfilePicture} alt='pending-req-pic' className='pending-req-pic'></img> {contract.patient.firstname} {contract.patient.lastname}
              <Rating value={rating} onChange={setRating} />
            </Col>

            <Col sm={4}>
              <p>Description: {contract.description}</p>
              <p>Rate: ${contract.rate}</p>
            </Col>
            <Col sm={4}>
              <p>From: {moment(contract.from_date).format('ddd Do of MMM, LT')}</p>
              <p>To: {moment(contract.to_date).format('ddd Do of MMM, LT')}</p>
            </Col>

            <Col sm={2} className="d-flex align-items-center justify-content-end">
              {
                contract.status === 'PENDING' && <>
                  <Button color="success" onClick={() => onAccept(contract.id)}>Accept</Button>
                  <Button color="danger" onClick={() => onReject(contract.id)}>Reject</Button>
                </>
              }
              {
                contract.status === 'ACCEPTED' && <Button disabled color="success" >Accepted</Button>

              }
              {
                contract.status === 'REJECTED' && <Button disabled color="danger" >Rejected</Button>
              }
            </Col>
          </Row>
        ))
      }
    </Container>
  );
}

export default PendingRequest;
