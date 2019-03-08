const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { authenticate } = require('../auth/authenticate');
const Users = require('../config/users-model.js')


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


//REGISTER: implement user registration
function register(req, res) {

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // generates hash for user's password
  user.password = hash;//overrides user.password w/ hash

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
  
}



//LOGIN:implement user login
function login(req, res) {
  
}


//GET for jokes:
function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
