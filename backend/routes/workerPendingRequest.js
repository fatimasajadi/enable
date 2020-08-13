const express = require('express');
const router = express.Router();

module.exports = db => {

  //Get request when worker clicks on Pending request
  //api/pending-requests
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {

      text: 'SELECT contracts.*, users.firstName, users.lastName FROM contracts LEFT JOIN users ON users.id = contracts.patient_id where  worker_id = $1 ORDER BY contracts.id DESC;',
      values: [userId]
    };

    db.query(query)
      .then(result => {
        res.json(result.map(({ firstname, lastname, ...item }) => ({
          ...item,
          patient: {
            firstname,
            lastname
          }
        })))
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      });
  });

  return router;
};