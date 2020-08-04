const express = require('express');
const router = express.Router();

module.exports = db => {

  //When user clicks accept button

  router.post('/', (req, res) => {
    console.log("Started")
    const userId = req.session['user_id'];
    const status = req.body.status;
    const id = req.body.contract_id;

    const query = {
      text: 'UPDATE contracts SET status=$1 WHERE worker_id=$2 AND id=$3;',
      values: [status, userId, id]
    };

    db.query(query)
      .then(() => {
        res.json({ status: "ACCEPTED" });
      })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.json({ error: "Error while updating status" })
      });
  });

  return router;
};