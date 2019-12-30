/* 记录日志
 * @Author: tanglin
 * @Date: 2019-08-13 10:38:12
 * @Last Modified by: tanglin
 * @Last Modified time: 2019-12-30 09:43:44
 */

const {
  createLogger,
  format,
  transports
} = require('winston');
const {
  combine,
  timestamp,
  printf
} = format;
const path = require('path');

const myFormat = printf(({
  level,
  message,
  label,
  timestamp
}) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  level: 'error',
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new(transports.Console)(),
    new(transports.File)({
      filename: path.join(__dirname, '../log/error.log')
    })
  ]
});

module.exports = logger;