const express = require('express');
const router = express.Router();

module.exports = db => {

  let contractId = req.body

  router.post('/', (req, res) => {
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