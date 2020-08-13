const express = require('express');
const router = express.Router();

//To display the completed sessions of family
module.exports = db => {
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const query = {
      text: `SELECT c.*, p.bill_amount, p.bill_image FROM contracts c LEFT JOIN purchases p ON c.id = p.contract_id WHERE status = 'ACCEPTED' AND to_date < CURRENT_TIMESTAMP AND worker_id = $1 ORDER BY c.id DESC;`,
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