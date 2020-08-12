const express = require('express');
const router = express.Router();

//To display the completed sessions of family
module.exports = db => {
  router.get('/', (req, res) => {

    const { from_date, to_date, patient_id } = req.query;
    const query = {
      text: `SELECT c.id, w.firstname as worker_firstname, w.lastname as worker_lastname, u.firstname, u.lastname, c.worker_id, u.address, c.check_in, c.check_out, c.from_date, c.to_date, rate, c.type_of_pay, p.bill_amount, p.bill_image
      FROM contracts c
      LEFT JOIN users u
      ON u.id = c.patient_id
      LEFT JOIN users w
      ON w.id = c.worker_id
      LEFT JOIN purchases p
      ON c.id = p.contract_id
      WHERE c.patient_id = $1 AND c.from_date >= $2 AND c.to_date <= $3 AND status='ACCEPTED'
      ORDER BY c.id ASC`,
      values: [patient_id, new Date(from_date), new Date(to_date)]
    };
    db.query(query)
      .then(result => {
        const normalized = result.map(
          ({ firstname, lastname, address, worker_firstname, worker_lastname, ...rest }) => ({
            ...rest,
            worker: {
              firstname: worker_firstname,
              lastname: worker_lastname
            },
            patient: {
              firstname,
              lastname,
              address
            }
          })
        );

        res.json(normalized);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      });
  });
  return router;
}
