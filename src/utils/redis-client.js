const redis = require("redis");
const client = redis.createClient({
    legacyMode: true
});
client.connect();

module.exports = client