/* 实现与MySQL交互
 * @Author: tanglin
 * @Date: 2019-08-13 10:36:21
 * @Last Modified by: tanglin
 * @Last Modified time: 2019-12-30 11:03:02
 */
const mysql = require('mysql');
const conf = require('../../conf/db');
const sql = require('./userMapper');
const logger = require('../../common/logger');
// 创建连接池
const pool = mysql.createPool(conf.mysql);
const jsonWrite = require('../common');

module.exports = {
  /**
   * 添加用户
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addUser: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
        return;
      }
      // 获取前台页面传过来的参数
      var param = req.body;
      // 建立连接，向表中插入值
      connection.query(sql.insert, [param.name, param.mobile, param.desc, param.address, param.createTime], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '添加成功'
          };
        }
        // 以json形式，把操作结果返回给前台页面
        jsonWrite(res, result);
        // 释放连接
        connection.release();
      });
    });
  },
  /**
   * 删除用户
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  deleteUser: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      let id = req.body.id;
      connection.query(sql.delete, id, function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '删除成功'
          };
        }
        jsonWrite(res, result);
        connection.release();
      });
    });
  },
  /**
   * 修改用户
   * @param {} req
   * @param {*} res
   * @param {*} next
   */
  update: function (req, res, next) {
    var param = req.body;
    if (param.name == null || param.id == null) {
      jsonWrite(res, undefined);
      return;
    }
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.update, [param.name, param.id], function (err, result) {
        if (err) {
          logger.error(err);
        } else {
          result = {
            code: 0,
            msg: '修改成功'
          };
        }
        connection.release();
      });
    });
  },
  /**
   * 查询用户详情
   * @param {*} req pageNum/pageSize
   * @param {*} res
   * @param {*} next
   */
  getUserInfo: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      let param = req.query
      connection.query(sql.queryById, param.id, function (err, result) {
        let ret;
        if (err) {
          logger.error(err);
        } else {
          ret = {
            code: 0,
            data: result
          };
        }
        jsonWrite(res, ret);
        connection.release();
      });
    });
  },
  /**
   * 查询
   * @param {*} req pageNum/pageSize
   * @param {*} res
   * @param {*} next
   */
  getList: function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) {
        logger.error(err);
      }
      connection.query(sql.count, function (countErr, countResult) {
        // 总条数
        var total = countResult[0].total || 0
        // 获取前台页面传过来的参数
        var param = req.query || req.params;
        var pageNum = parseInt(param.pageNum || 1); // 页码
        var end = parseInt(param.pageSize || 15); // 默认页数
        var start = (pageNum - 1) * end;
        var name = param.name
        var mobile = param.mobile
        let url = "select * from user WHERE `name` like '%" + name + "%' and mobile like '%" + mobile + "%' order by id desc  limit " + start + ', ' + end + ''
        connection.query(url, [name, mobile, start, end], function (err, result) {
          let ret;
          if (err) {
            logger.error(err);
          } else {
            ret = {
              code: 0,
              data: {
                list: result || [],
                totalCount: total,
                pageSize: parseInt(param.pageSize) || 15,
                currentPage: parseInt(param.pageNum) || 1,
                totalPage: Math.ceil(total / (param.pageSize || 15))
              }
            };
          }
          jsonWrite(res, ret);
          connection.release();
        });
      })
    });
  }
};