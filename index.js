const config = require('./src/config/env-vars'); // Đọc biến môi trường từ .env.prodution và .env.development
const corsOptions = require('./src/config/cors-options');
const express = require('express');
const cors = require('cors');
const verifyUserToken = require('./src/middlewares/verify-token');
const bodyParser = require("body-parser");
const common = require('./src/utils/common');
const morgan = require('morgan');
const listEndpoints = require('express-list-endpoints');
// CONTROLLER
const CryptoController = require('./src/controllers/crypto');
const GetContentController = require('./src/controllers/xcontent');

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('combined')); // sử dụng morgan để ghi log cho tất cả các yêu cầu vào và ra

const makePath = (path) => `${config.ROOT}${path}`;

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get(makePath('/test'), (req, res) => {
    res.send('Hello World !! ' + config.ROOT);
});

// FOR DEV ONLY
if (config.NODE_ENV === 'development') {
    app.get(makePath('/getToken'), (req, res) => res.send(common.genToken()));
}

// FOR DEV + PROD

// NEED VERITY TOKEN
app.get(makePath('/xcontent'), (req, res) => GetContentController.parseContents(req, res));


// DONT NEED TOKEN
app.post(makePath('/utils/aesEncrypt'), (req, res) => CryptoController.encrypt(req, res));
app.post(makePath('/utils/aesDecrypt'), (req, res) => CryptoController.decrypt(req, res));

const startTime = new Date();
app.get(makePath('/info'), (req, res) => {
    const endpoints = listEndpoints(app).map((point) => {
        return `${point.methods[0]}:${point.path}`;
    }).sort();
    res.status(200).json({
        success: true,
        data: {
            start: common.date2String(startTime),
            host: `${config.HOST}:${config.PORT}`,
            endpoints: endpoints
        }
    });
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    console.log(config.ROOT);
})


const axios = require("axios");
// const testURL = "http://localhost:3000/xcontent?url=https://truyensextv.com/duc-vong-sau-tham/"
// console.log("Thuc hien request");
// axios.get(testURL); // Thực hiện request đến URL mong muốn
// console.log("Request thành công");

