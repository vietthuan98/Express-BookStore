const User = require('../models/user.model');
const md5 = require('md5');


module.exports.index = async (req, res, next) => {
  await User.find({}, (err, users) => {
    if(err) 
      throw err;
    res.render('user/index', {
      title: 'User management',
      users
    });
  });
}

module.exports.view = async (req, res, next) => {
  const { id } = req.params;
  await User.findById({_id: id}, (err, user) =>{
    if(err)
      throw err;
    res.render('user/view', {
      title: 'View user',
      user
    })
  });
}

module.exports.getEdit = async (req, res, next) => {
  await User.findById({_id: req.params.id}, (err, user) => {
    if(err)
      throw err;
    res.render('user/edit',{
      title: 'Edit user',
      user
    })
  });
}

module.exports.postEdit = async (req, res, next) => {
  const user = {};
  user.name = req.body.name;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.address = req.body.address;
  user.avatarUrl = req.body.avatarUrl;

  const query = {_id: req.params.id};

  User.update(query, user, (err) => {
    if(err)
      throw err
    res.redirect('/')
  })
}

module.exports.delete = async (req, res, next) => {
  const query = {_id: req.params.userId};
  await User.remove(query, (err) => {
    if (err)
      throw err;
    res.send('success');
  })
}

module.exports.search = async (req, res, next) => {
  const { q } = req.query;
  await User.find({}, (err, users) => {
    if(err)
      throw err;
    const matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
    res.render('user/index', {
      title: 'User management',
      users: matchedUsers,
      q
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
  console.log(req.file);
  req.body.avatarUrl = [''].concat(req.file.path.split('\\').slice(1)).join('/');
  const newUser = new User(req.body);
  // console.log(newUser);
  newUser.save();
  res.redirect('/users');
}
