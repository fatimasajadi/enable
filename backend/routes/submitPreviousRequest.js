const express = require('express');
const router = express.Router();


module.exports = db => {

  router.post('/', (req, res) => {
    const {contractId, rating, comments} = req.body;
    const query = {
      text: 'UPDATE contracts SET rating = $1, comments = $2 WHERE id = $3 RETURNING *;',
      values: [rating, comments, contractId]
    }
    db.query(query)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      });
  });
  return router;

}