const data = require('./userData');

function checkCredentials(req, res, next){
  data.users.find(function(user){
    if (req.body.username === user.name && req.body.password === user.password){
      req.authenticated = true;
      res.locals.authenticated = true;
      res.locals.user = user.name
    } else {
      return false
    }
  })
  next();
}

module.exports = {
  checkCredentials: checkCredentials
}
