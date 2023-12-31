var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('../models/User');


router.use((req, res, next) => {
  next();
});

router.get("/users", (req, res, next) => {
  res.send("GET REQ on Router");
  next();
});

// API endpoint for handling user data
router.post('/users', (req, res, next) => {
  console.log(req.body)
  // Extract user data from the request body
  const { firstName, lastName, email, phoneNumber, address } = req.body;

  // Perform necessary operations to store the user data in the database
  const newUser = new User({
    firstName,
    lastName,
    email,
    phoneNumber,
    address
  });

  console.log("User Data: ",newUser)

  newUser.save()
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to save user data' });
    });
});


module.exports = router;