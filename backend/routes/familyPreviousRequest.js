const express = require('express');
const router = express.Router();


module.exports = db => {

  //To get the details of Previous work
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {
      text: 'SELECT * FROM contracts WHERE from_date < CURRENT_TIMESTAMP AND  CURRENT_TIMESTAMP < to_date AND patient_id = $1;',
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