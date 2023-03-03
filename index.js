const config =  require('./src/config/env-vars');
const corsOptions = require('./src/config/cors-options');
const express =  require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan');

const app =  express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined')); // sử dụng morgan để ghi log cho tất cả các yêu cầu vào và ra
let root = config.ROOT;

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get(`${root}/test`, (req, res) => {
    res.send('Hello World !! ' + root);
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    console.log(config.ROOT);
})