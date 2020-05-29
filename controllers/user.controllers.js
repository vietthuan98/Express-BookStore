const { render } = require("pug")

module.exports.index = async (req, res, next) => {
  res.render('user/index', {
    title: 'user'
  });
}