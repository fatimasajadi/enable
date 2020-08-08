const express = require('express');
const router = express.Router();

//To display the completed sessions of family
module.exports = db => {
  router.get('/', (req, res) => {

    let userId = req.session['user_id'];
    const {from_date, to_date, patient_id} = req.body;
    const query = {
      text: `select firstname, lastname, c.from_date, c.to_date, rate, c.type_of_pay, p.bill_amount, p.bill_image
      from users u, contracts c, purchases p
      WHERE u.id = c.patient_id
      AND c.id = p.contract_id
      AND c.from_date >= $1 AND c.to_date <= $2
      AND c.patient_id = $3;`,
      values: [from_date, to_date, patient_id]
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
