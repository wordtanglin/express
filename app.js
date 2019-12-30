const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
/* eslint-disable */
const domain = require('domain');
/* eslint-enable */

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');

const app = express();

// 设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 设置views文件夹为存放视图文件的目录，即存放模板文件的地方
app.set('views', path.join(__dirname, 'views'));

// 设置模板引擎为jade
app.set('view engine', 'jade');

// 加载日志中间件
app.use(logger('dev'));
// 加载解析json的中间件
app.use(express.json());
// 加载解析urlencoded请求体的中间件
app.use(express.urlencoded({
  extended: false
}));
// 加载解析cookie的中间件
app.use(cookieParser());
// 设置public文件夹为存放静态文件的目录
app.use(express.static(path.join(__dirname, 'public')));

// 输出日志到目录
var fs = require('fs');
var accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/request.log'), {
  flags: 'a',
  encoding: 'utf8'
});

// 记得要先把目录建好，不然会报错
app.use(logger('combined', {
  stream: accessLogStream
}));

// 处理没有捕获的异常，导致 node
app.use(function (req, res, next) {
  var reqDomain = domain.create();
  reqDomain.on('error', function (err) {
    res.status(err.status || 500);
    res.render('error');
  });
  reqDomain.run(next);
});

// 路由控制器
app.use('/', indexRouter);
app.use('/user', usersRouter);

// 捕获404错误，并转发到错误处理器
app.use(function (req, res, next) {
  next(createError(404));
});

// 错误处理器，将错误信息渲染error模板并显示到浏览器中
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // 开发环境下的错误处理器，将错误信息渲染error模板并显示到浏览器中
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;