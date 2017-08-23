const data = require('./userData');

function checkCredentials(req, res, next){
  data.users.find(function(user){
    if (req.body.username === user.name && req.body.password === user.password){
      console.log('user and password found')
      res.authenticated = true;
    } else {
      res.authError = 'Login failed'
      return false
    }
  })
  next();
}

module.exports = {
  checkCredentials: checkCredentials
}
