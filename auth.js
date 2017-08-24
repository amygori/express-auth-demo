const data = require('./userData');

function checkCredentials(req, res, next){
  let confirmedUser;
  req.session.authenticated = false;
  data.users.find((function(user){
    if (user.name === req.body.username){
      console.log('user found')
      return confirmedUser = user
    } else {
      req.authError = 'user match failed'
      return next();
    }
  }));
  if (confirmedUser.password === req.body.password){
    req.session.authenticated = true;
  } else {
    console.log('password match failed');
    req.authError = 'incorrect password'
  }
  next();
}

module.exports = {
  checkCredentials: checkCredentials
}
