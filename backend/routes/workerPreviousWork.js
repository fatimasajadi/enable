const express = require('express');
const router = express.Router();

module.exports = db => {

  router.get('/', (req, res) => {
    let userId = req.body.worker_id;
    if(req.session['user_id'] === userId){
      const query = {
        text: 'SELECT * FROM contracts where service_date < CURRENT_DATE and worker_id = $1;',
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
  return router;
};