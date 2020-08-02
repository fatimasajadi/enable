const express = require('express');
const router = express.Router();

module.exports = db => {
  
  //Get request when worker clicks on Pending request
  router.get('/', (req, res) => {
    console.log("Started")
    let userId = req.body.family_id;
    const {description, from_date, to_date, rate, type_of_pay, worker_id} = req.body;
    
    if(req.session['user_id'] === userId){
      const query = {
        text: 'INSERT INTO contracts (worker_id, patient_id, from_date, to_date, description, rate, type_of_pay, status)VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        values:[worker_id, userId, from_date, to_date, description, rate, type_of_pay, "PENDING"]
      };
      db.query(query)
      .then(result => res.json(result[0]))
      .catch(err => console.log(err));

    }else{
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });
    return router;
  
  };