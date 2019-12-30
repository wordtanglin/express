/* sql
 * @Author: tanglin
 * @Date: 2019-08-13 10:36:47
 * @Last Modified by: tanglin
 * @Last Modified time: 2019-12-30 10:55:36
 */

const user = {
  insert: 'INSERT INTO `user`(`name`,`mobile`,`desc`,`address`,`createTime`) VALUES(?,?,?,?,?)',
  update: 'update user set name=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'SELECT * FROM `user` WHERE id=?',
  queryUser: 'SELECT * FROM `user`',
  login: 'SELECT * FROM `user` WHERE `name`=? AND `password`=?',
  queryList: "select * from user WHERE `name` like '%?%' and mobile like '%?%' order by id desc  limit 1, 15",
  count: 'select count(*) as total from user',
};

module.exports = user;