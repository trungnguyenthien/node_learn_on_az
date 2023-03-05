const moment = require('moment');

const format = 'YYYY-MM-DD HH:mm:ss'
const date2String = (date) => moment(date).format(format);

module.exports = {
    date2String
}