const config =  require('./src/config/env-vars'); // Đọc biến môi trường từ .env.prodution và .env.development
const corsOptions = require('./src/config/cors-options');
const express =  require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const common = require('./src/utils/common');
const morgan = require('morgan');
const listEndpoints = require('express-list-endpoints');
// CONTROLLER
const CryptoController = require('./src/controllers/crypto-controller');

const app =  express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined')); // sử dụng morgan để ghi log cho tất cả các yêu cầu vào và ra

const makePath = (path) => `${config.ROOT}${path}`;

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get(makePath('/test'), (req, res) => {
    res.send('Hello World !! ' + config.ROOT);
});

app.get(makePath('/utils/aesEncrypt'), (req, res) =>  CryptoController.encrypt(req, res) );
app.get(makePath('/utils/aesDecrypt'), (req, res) =>  CryptoController.decrypt(req, res) );

const startTime = new Date();
app.get(makePath('/info'), (req, res) =>  {
    const endpoints = listEndpoints(app).map((point) => {
        return `${point.methods[0]}:${point.path}`;
    }).sort();
    res.status(200).json({ success: true, data: {
        start: common.date2String(startTime),
        host: `${config.HOST}:${config.PORT}`,
        endpoints: endpoints
    } });
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    console.log(config.ROOT);
})