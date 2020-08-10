const express = require('express');
const router = express.Router();

module.exports = db => {


  router.post('/', (req, res) => {
    let contractId = req.body

    const query = {
      text: 'DELETE FROM contracts WHERE id = $1',
      values: [contractId]
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  });

  return router;
};