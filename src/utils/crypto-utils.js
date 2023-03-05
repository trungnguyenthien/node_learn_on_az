const crypto = require('crypto');


const algorithm = 'aes-256-cbc';

function createKeyIV(keyOrigin) {
    const size = 32;
    const key = Buffer.alloc(maxKeySize, '\0');
    keyOrigin = Buffer.from(keyOrigin, 'utf8');
    keyOrigin.copy(key);
    return {
        key: Buffer.from(key.slice(0, size)),
        iv: key.slice(0, 16)
    }
}

class Aes256 {



    static encrypt(plainText, keyOrigin) {
        const keyiv = createKeyIV(keyOrigin);
        const cipher = crypto.createCipheriv(algorithm, keyiv.key, keyiv.iv);
        let encryptedText = cipher.update(plainText, 'utf8', 'base64');
        encryptedText += cipher.final('base64');
        return encryptedText;
    }

    static decrypt(encryptedText, keyOrigin) {
        const keyiv = createKeyIV(keyOrigin);
        const encrypted = Buffer.from(encryptedText, 'base64');
        const decipher = crypto.createDecipheriv(algorithm, keyiv.key, keyiv.iv);
        let decryptedText = decipher.update(encrypted, '', 'utf8');
        decryptedText += decipher.final('utf8');
        return decryptedText;
    }
}

module.exports = {
    Aes256
};

/*
const crypto = require('crypto');

// Mã hoá
const secret = 'mysecret';
const algorithm = 'aes-256-cbc';
const iv = crypto.randomBytes(16);
const cipher = crypto.createCipheriv(algorithm, secret, iv);
let encrypted = cipher.update('This is my secret message', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log('Mã hoá: ', encrypted);

// Giải mã
const decipher = crypto.createDecipheriv(algorithm, secret, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log('Giải mã: ', decrypted);

*/