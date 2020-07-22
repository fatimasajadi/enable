const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;



module.exports = db => {

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.send("Entering Register")
  });

  router.post('/', (req, res) => {
    const {firstName, lastName, address, phoneNumber, email, type, username, password} = req.body;
    const query = {
      text: `INSERT INTO users (firstName, lastName, address, phoneNumber, email, type, username, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`,
      values: [firstName, lastName, address, phoneNumber, email, type, username, bcrypt.hashSync(password, saltRounds)]
    };

    db
      .query(query)
      .then(result => res.json(result[0]))
      .catch(err => console.log(err));

    // return the newly created user back

  });

  return router;

};