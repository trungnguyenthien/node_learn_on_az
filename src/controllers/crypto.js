const { Aes256 } = require('../utils/crypto-utils');
const { success, error } = require('../utils/response-utils');

const CryptoController = {
    encrypt: (req, res, next) => {
        const key = req.body.key;
        const input = req.body.input;
        const format = req.body.format || 'hex';
        const data = Aes256.encrypt(input, key, format);
        res.status(200).json({ success: true, data: data });
    },

    decrypt: (req, res, next) => {
        const key = req.body.key;
        const input = req.body.input;
        const format = req.body.format || 'hex';
        const data = Aes256.decrypt(input, key, format);
        res.status(200).json({ success: true, data: data });
    }
}


module.exports = CryptoController;