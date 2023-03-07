const config = require('../config/env-vars');

const common = require('../utils/common');

const verifyUserToken = (req, res, next) => {

    console.log("verifyUserToken");
    if (config.VERIFY_TOKEN == '0') {
        return next();
    }


    // Get token from header
    const token = req.header('Authorization');
    console.log(`Token ${token}`);
    // Check if not token
    if (!token) {
        return res.status(401).send({
            msg: 'No token in Authorization header'
        });
    }

    // Verify token
    const checkToken = common.genToken();

    if (checkToken !== token) {
        return res.status(401).json({
            msg: 'Token is not valid'
        });
    } else {
        return next();
    }

};

module.exports = verifyUserToken;