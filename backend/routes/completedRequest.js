const express = require('express');
const router = express.Router();

//To display the completed sessions of family
module.exports = db => {
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {
      text: `SELECT * FROM contracts WHERE  status = 'ACCEPTED' AND to_date < CURRENT_TIMESTAMP AND patient_id = $1 AND rating IS NULL;`,
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