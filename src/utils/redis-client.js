const redis = require("redis");
console.log("ENTER REDIS CLIENT")
const client = redis.createClient({
    legacyMode: true
});
client.connect();

module.exports = client