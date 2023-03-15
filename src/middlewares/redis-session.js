const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;

// Tạo Redis client
const redisClient = redis.createClient();
// Kết nối Redis store với session
const sessionStore = new RedisStore({
    client: redisClient
});

const redisSessionMiddleware = session({
    secret: 'my-secret-key',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
});

module.exports = redisSessionMiddleware