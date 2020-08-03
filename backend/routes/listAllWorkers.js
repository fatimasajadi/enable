const express = require('express');
const router = express.Router();

module.exports = db => {

  router.get('/', (req, res) => {
    let userId = req.body.family_id;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'SELECT * FROM users WHERE type = $1',
        values:["Support worker"]
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