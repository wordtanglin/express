/* 数据库配置
 * @Author: tanglin 
 * @Date: 2019-08-13 10:35:53 
 * @Last Modified by: tanglin
 * @Last Modified time: 2019-12-30 11:08:38
 */
module.exports = {
  mysql: {
    host: '47.92.50.25',
    user: 'tanglin',
    password: 'Tlqq1397229194#',
    database: 'test',
    port: 3306,
    acquireTimeout: 15000, // 连接超时时间
    connectionLimit: 100, // 最大连接数
    waitForConnections: true, // 超过最大连接时排队
    queueLimit: 0, // 排队最大数量(0 代表不做限制)
  }
};