const express = require('express');
const router = express.Router();

module.exports = db => {

  //To get the details of Previous work
  router.get('/', (req, res) => {
    let userId = req.body.worker_id;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'SELECT * FROM contracts where from_date < CURRENT_TIMESTAMP and to_date < CURRENT_TIMESTAMP and worker_id = $1;',
        values:[userId]
      };
        db.query(query)
          .then(result => res.json(result))
          .catch(err => console.log(err));
      }else{
        res.status(401);
        res.json({ error: "Incorrect user" })
      }
    });

    //To upload the expense of worker
  router.get('/', (req, res) => {
    let userId = req.body.worker_id;
    let contract_id = req.body.contract_id;
    let bill_image = req.body.bill_image;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'INSERT INTO purchases (contract_id, bill_image) VALUES ($1, $2) RETURNING *;',
        values:[contract_id, bill_image]
      };
        db.query(query)
          .then(result => res.json(result))
          .catch(err => console.log(err));
      }else{
        res.status(401);
        res.json({ error: "Incorrect user" })
      }
  });
  return router;
};