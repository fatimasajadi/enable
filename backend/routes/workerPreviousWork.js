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

    //const userId = req.session['user_id'];
    const query = {
      text: 'SELECT c.*, p.bill_image FROM contracts c LEFT JOIN purchases p ON c.id = p.contract_id WHERE from_date < CURRENT_TIMESTAMP and c.worker_id = $1;',
      values: [userId]
    };
    db.query(query)
      .then(result => {
        const array = [];
        for (const item of result) {
          const existingItem = array.find(i => i.id === item.id);
          if (existingItem) {
            existingItem.billImages.push(item.bill_image)
          } else {
            const { bill_image, ...rest } = item;
            array.push({
              ...rest,
              billImages: bill_image ? [bill_image] : []
            })
          }
        }

        res.json(result)
      })
      .catch(err => console.log(err));
  });

  //To upload the expense of worker
  router.post('/', (req, res) => {
    let contract_id = req.body.contract_id;
    let bill_image = req.body.bill_image;
    const query = {
      text: 'INSERT INTO purchases (contract_id, bill_image) VALUES ($1, $2) RETURNING *;',
      values: [contract_id, bill_image]
    };
    db.query(query)
      .then(result => res.json(result))
      .catch(err => console.log(err));
  });


  return router;
};