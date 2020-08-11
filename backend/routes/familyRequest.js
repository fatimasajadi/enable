const express = require('express');
const router = express.Router();

module.exports = db => {

  //Get request when worker clicks on Pending request
  router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.session['user_id'];
    const { description, from_date, to_date, rate, type_of_pay, worker_id } = req.body;

    const query = {
      text: 'INSERT INTO contracts (worker_id, patient_id, from_date, to_date, description, rate, type_of_pay, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values: [worker_id, userId, new Date(from_date), new Date(to_date), description, rate, type_of_pay, "PENDING"]
    };
    db.query(query)
      .then(result => res.json(result[0]))
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      });
  });

  return router;
};