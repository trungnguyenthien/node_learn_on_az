const moment = require('moment');
const axios = require('axios')

axios.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36';
// axios.defaults.headers.common['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8';
axios.defaults.headers.common['Connection'] = 'keep-alive';
axios.defaults.withCredentials = true;
axios.defaults.maxRedirects = 10;

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
    return url.startsWith(start);
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

// Download raw data (html, text)
async function loadRaw(url) {
    try {
        const html = await axios.get(url)
        // console.dir(html);
        return html.data;
    } catch (error) {
        // console.log(`loadRaw = ${error}`);
        return "";
    }
}

// Find all <IMG>.src trong html
const allImgSrcs = (html) => {
    const regex = /<img[^>]+src="?([^"\s]+)"?\s*\/?>/i;
    return html.match(regex);
}

const firstImgSrc = (html) => {
    const match = allImgSrcs(html)

    if (match) {
        const firstImgSrc = match[1];
        console.log(firstImgSrc); // Output: https://example.com/image1.jpg
        return firstImgSrc;
    } else {
        console.log("Không tìm thấy thẻ img");
        return null;
    }
}

// Convert String to Hex
const string2Hex = (str) => Buffer.from(str, "utf8").toString("hex");
// Convert Hext to String
const hex2String = (hex) => Buffer.from(hex, "hex").toString("utf8");

module.exports = {
    date2String,
    genToken,
    validURL,
    isUrlStartBy,
    httpGet,
    loadRaw,
    firstImgSrc,
    allImgSrcs,
    string2Hex,
    hex2String
}