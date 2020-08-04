const express = require('express');
const router = express.Router();

module.exports = db => {

  //Get request when worker clicks on Pending request
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {

      text: 'SELECT contracts.*, users.firstName, users.lastName FROM contracts LEFT JOIN users ON users.id = contracts.patient_id where status = $1 and worker_id = $2;',
      values: ["PENDING", userId]
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


  //When user clicks accept button

  router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.body.worker_id;
    console.log(userId)

    if (req.session['user_id'] === userId) {
      const query = {
        text: 'UPDATE contracts set status = $1 where worker_id = $2;',
        values: ["ACCEPTED", userId]
      };
      db.query(query)
        .then({ status: "ACCEPTED" })
        .catch(err => console.log(err));

    } else {
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });


  //When user clicks reject button

  router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.body.worker_id;

    if (req.session['user_id'] === userId) {
      const query = {
        text: 'UPDATE contracts set status = $1 where worker_id = $2;',
        values: ["REJECTED", userId]
      };
      db.query(query)
        .then({ status: "REJECTED" })
        .catch(err => console.log(err));

    } else {
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });

  return router;
};