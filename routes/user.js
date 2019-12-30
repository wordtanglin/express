var express = require('express');
var router = express.Router();

var userDao = require('../dao/user/userDao');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  // res.render('query');
});

// 查询列表
router.get('/getList', function (req, res, next) {
  userDao.getList(req, res, next);
});

// 增加用户
router.post('/addUser', function (req, res, next) {
  userDao.addUser(req, res, next);
});

// 删除用户
router.post('/deleteUser', function (req, res, next) {
  userDao.deleteUser(req, res, next);
});

// 修改用户
router.post('/updateUser', function (req, res, next) {
  userDao.update(req, res, next);
});

// 查询详情
router.get('/getUserInfo', function (req, res, next) {
  userDao.getUserInfo(req, res, next);
});



module.exports = router;