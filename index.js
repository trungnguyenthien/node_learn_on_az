const config =  require('./config.js');
const express =  require('express');
const app =  express();
let root = config.ROOT;

console.log(`NODE_ENV=${config.NODE_ENV}`);

app.get(`${root}/test`, (req, res) => {
    res.send('Hello World !! ' + root);
});

app.listen(config.PORT, config.HOST, () => {
    console.log(`APP LISTENING ON http://${config.HOST}:${config.PORT}`);
    console.log(config.ROOT);
})