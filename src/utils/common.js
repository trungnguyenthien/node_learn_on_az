const moment = require('moment');

const axios = require('axios');

const {
    Aes256
} = require('./crypto-utils');
const config = require('../config/env-vars');


const format = 'YYYY-MM-DD HH:mm:ss'
const date2String = (date) => moment(date).format(format);
const date2yyyyMMDD = (date) => moment(date).format('yyyyMMDD');

const genToken = () => Aes256.encrypt('sucess', `${config.SALT}${date2yyyyMMDD(Date())}`, 'hex')

const validURL = (url) => {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    // const url = "https://www.example.com/index.html";
    return regex.test(url); // true
}

const isUrlStartBy = (url, start) => {
    // if (!validURL(url)) {
    //     return false;
    // }
    console.log(`start = ${start}`)
    return  url.startsWith(start);
}


async function httpGet(url) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request({
            method: 'get',
            url: url,
            headers: config.headers
        });

        const data = JSON.parse(response.data);
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


async function loadRaw(url) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const response = await axios.request({
            method: 'get',
            url: url,
            headers: config.headers
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    date2String,
    genToken,
    validURL,
    isUrlStartBy,
    httpGet,
    loadRaw
}