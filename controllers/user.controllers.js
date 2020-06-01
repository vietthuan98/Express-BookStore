const User = require('../models/user.model');
const md5 = require('md5');


module.exports.index = async (req, res, next) => {
  await User.find((err, users) => {
    if(err) 
      throw err;
    res.render('user/index', {
      title: 'User management',
      users
    });
  });
}

module.exports.search = async (req, res, next) => {
  const { q } = req.query;
  await User.find((err, users) => {
    if(err)
      throw err;
    const matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('user/index', {
      title: 'User management',
      users: matchedUsers
    });
  });
}

module.exports.getCreate = async (req, res, next) => {
  res.render('user/create', {
    title: 'Create a users'
  })
}

module.exports.postCreate = async (req, res, next) => {
  req.body.password = md5(req.body.password); //hash password using md5
  req.body.avatarUrl = req.file.path.split('\\').slice(1).join('/');
  const newUser = new User(req.body);
  // console.log(newUser);
  newUser.save();
  res.redirect('/users');
}
