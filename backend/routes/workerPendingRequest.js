const express = require('express');
const router = express.Router();

module.exports = db => {
  
  //Get request when worker clicks on Pending request
  router.get('/', (req, res) => {
    let userId = req.body.worker_id;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'SELECT * FROM contracts where status = $1 and worker_id = $2;',
        values:["PENDING", userId]
      };
  
      db.query(query)
        .then(result => res.json(result))
        .catch(err => console.log(err));
    }else{
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });


  //When user clicks accept button

  router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.body.worker_id;
    console.log(userId)

    if(req.session['user_id'] === userId){
      const query = {
        text: 'UPDATE contracts set status = $1 where worker_id = $2;',
        values:["ACCEPTED", userId]
      };
      db.query(query)
      .then({msg: "one row updated"})
      .catch(err => console.log(err));

    }else{
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });


   //When user clicks reject button

   router.post('/', (req, res) => {
    console.log("Started")
    let userId = req.body.worker_id;

    if(req.session['user_id'] === userId){
      const query = {
        text: 'UPDATE contracts set status = $1 where worker_id = $2;',
        values:["REJECTED", userId]
      };
      db.query(query)
      .then({msg: "one row updated"})
      .catch(err => console.log(err));

    }else{
      res.status(401);
      res.json({ error: "Incorrect user" })
    }
  });

  return router;
};