const chalk = require('chalk');

const log = (msg) => chalk.cyanBright(msg)
const warn = (msg) => chalk.yellow(msg)
const error = (msg) => chalk.redBright(msg)
const success = (msg) => chalk.greenBright(msg)

module.exports = {
    log, warn, error, success
}