const {
    promisify
} = require('util');
// const redis = require('redis');
const client = require('./redis-client')
// Promisify Redis methods
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);
const hGetAllAsync = promisify(client.hGetAll).bind(client);
const hGetAsync = promisify(client.hGet).bind(client);
const hSetAsync = promisify(client.hSet).bind(client);
const hDelAsync = promisify(client.hDel).bind(client);
const lRangeAsync = promisify(client.lRange).bind(client);
const lPushAsync = promisify(client.lPush).bind(client);
const rPushAsync = promisify(client.rPush).bind(client);
const lLenAsync = promisify(client.lLen).bind(client);
const lPopAsync = promisify(client.lPop).bind(client);
const rPopAsync = promisify(client.rPop).bind(client);
const sAddAsync = promisify(client.sAdd).bind(client);
const sRemAsync = promisify(client.sRem).bind(client);
const sMembersAsync = promisify(client.sMembers).bind(client);
const zAddAsync = promisify(client.zAdd).bind(client);
const zRemAsync = promisify(client.zRem).bind(client);
const zRangeAsync = promisify(client.zRange).bind(client);

module.exports = {
    getAsync,
    setAsync,
    delAsync,
    hGetAsync,
    hGetAllAsync,
    hSetAsync,
    hDelAsync,
    lRangeAsync,
    lPushAsync,
    rPushAsync,
    lLenAsync,
    lPopAsync,
    rPopAsync,
    sAddAsync,
    sRemAsync,
    sMembersAsync,
    zAddAsync,
    zRemAsync,
    zRangeAsync,
}