const express = require('express');
const router = express.Router();


module.exports = db => {

  //To get the details of Previous work
  router.get('/', (req, res) => {
    let userId = req.body.family_id;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'SELECT * FROM contracts where from_date < CURRENT_TIMESTAMP and to_date < CURRENT_TIMESTAMP and patient_id = $1;',
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
}