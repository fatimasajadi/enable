import './Admin.css'

import React from 'react';
import { Table } from 'reactstrap';

const Admin = (props) => {
  return (
    <div className='container admin-worker-table'>
      <Table>
        <thead>
          <tr>
            <th>Contract_ID</th>
            <th> Worker's Name</th>
            <th> Family's Name </th>
            <th>Appointment Date</th>
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
            <th>Type of Rate</th>
            <th>Expenses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Admin;
