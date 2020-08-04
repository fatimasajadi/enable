const express = require('express');
const router = express.Router();

module.exports = db => {

//When user clicks accept button

  router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.body.worker_id;
    let status = req.body.status;

    if (req.session['user_id'] === userId) {
      const query = {
        text: 'UPDATE contracts set status = $1 where worker_id = $2;',
        values: [status, userId]
      };
      db.query(query)
        .then({ status: "ACCEPTED" })
        .catch(err => console.log(err));

    } else {
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });

  return router;
};