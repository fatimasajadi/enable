const express = require('express');
const router = express.Router();

//To display the completed sessions of family
module.exports = db => {
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {
      text: 'SELECT * FROM contracts WHERE to_date < CURRENT_TIMESTAMP AND status = "ACCEPTED" AND patient_id = $1;',
      values: [userId]
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      });
  });
  return router;
}