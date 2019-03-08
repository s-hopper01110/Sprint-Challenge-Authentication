const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const { authenticate } = require('../auth/authenticate');
const Users = require('../config/users-model.js')

const secret = process.env.JWT_SECRET ||'where does the rainbow end?' 


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
function generateToken(user) { 
  const payload = {
      subject: user.id, // sub in payload is what the token is about 
      username: user.username,
      // .... secret stays out of this function 
  }

  const options = {
      expiresIn: '1d'
  }
 
  return jwt.sign(payload, secret, options)
}

//------------------------------------------------

function login(req, res) {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {

      // check that passwords match
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user) // produces  a token 
        //return token 
        res
          .status(200)
          .json({ message: `Welcome ${user.username}!, here's your token...`, token, }); //(token implemented sends token to the client)
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
};






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
