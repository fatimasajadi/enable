const express = require('express');
const router = express.Router();


module.exports = db => {

  //To get the details of Previous work
  router.get('/', (req, res) => {
    let userId = req.body.worker_id;
    if (req.session['user_id'] === userId) {
      const query = {
        text: 'SELECT * FROM contracts where to_date < CURRENT_TIMESTAMP and worker_id = $1;',
        values: [userId]
      };
      db.query(query)
        .then(result => res.json(result))
        .catch(err => console.log(err));
    } else {
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

    const { contract_id, check_in, check_out, bill_amount, bill_image } = req.body

    const updateContractsQuery = {
      text: 'UPDATE contracts SET check_in = $1, check_out = $2 WHERE id = $3 RETURNING *;',
      values: [new Date(check_in), new Date(check_out), contract_id]
    }

    const insertPurchaseQuery = {
      text: 'INSERT INTO purchases (contract_id, bill_amount, bill_image) VALUES ($1, $2, $3) RETURNING *;',
      values: [contract_id, bill_amount, bill_image]
    }

    let contractResult;
    let purchaseResult;

    db.query(updateContractsQuery)
      .then(constractsUpdateResult => {
        contractResult = constractsUpdateResult[0];

        if (bill_amount && bill_image) {
          return db.query(insertPurchaseQuery);
        }
      })
      .then(purchaseInsertResult => {
        purchaseResult = purchaseInsertResult && purchaseInsertResult[0];
        res.json({
          contract: contractResult,
          purchase: purchaseResult
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err)
      })

  });

  return router;

}