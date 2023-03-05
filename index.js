const config =  require('./src/config/env-vars'); // Đọc biến môi trường từ .env.prodution và .env.development
const corsOptions = require('./src/config/cors-options');
const express =  require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { Aes256 } = require('./src/utils/crypto-utils');

const app =  express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined')); // sử dụng morgan để ghi log cho tất cả các yêu cầu vào và ra
let root = config.ROOT;

const enc = Aes256.encrypt('Kimchon')

console.log(`ENCRYPTED = ${enc}`);

const dec = Aes256.decrypt(enc);

console.log(`DECRYPTED = ${dec}`);

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get(`${root}/test`, (req, res) => {
    res.send('Hello World !! ' + root);
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    console.log(config.ROOT);
})