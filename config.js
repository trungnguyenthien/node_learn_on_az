const dotenv = require('dotenv');
const path = require('path');

let profilePath = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);
dotenv.config({
    path: profilePath
});

console.log('ENV_PROFILE = ' + profilePath);

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'failed_dev',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 3000,
    ROOT: process.env.ROOT || ''
}