const moment = require('moment');
const { Aes256 } = require('./crypto-utils');
const config = require('../config/env-vars');


const format = 'YYYY-MM-DD HH:mm:ss'
const date2String = (date) => moment(date).format(format);
const date2yyyyMMDD = (date) => moment(date).format('yyyyMMDD');

const genToken = () => Aes256.encrypt('sucess', `${config.SALT}${date2yyyyMMDD(Date())}`, 'hex')

module.exports = {
    date2String,
    genToken
}