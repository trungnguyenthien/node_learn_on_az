const { Aes256 } = require('../utils/crypto-utils');
const { success, error } = require('../utils/response-utils');

const CryptoController = {
    encrypt: (req, res, next) => {
        const key = req.query.key;
        const input = req.query.input;
        const data = Aes256.encrypt(input, key);
        res.status(200).json({ success: true, data: data });
    },

    decrypt: (req, res, next) => {
        const key = req.query.key;
        const input = req.query.input;
        const data = Aes256.decrypt(input, key);
        res.status(200).json({ success: true, data: data });
    }
}


module.exports = CryptoController;