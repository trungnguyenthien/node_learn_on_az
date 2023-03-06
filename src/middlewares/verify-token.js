const config = require('../config/env-vars');

const common = require('../utils/common');

const verifyUserToken = (req, res, next) => {
    if (config.VERIFY_TOKEN == '0') {
        return next();
    }

    // Get token from header
    const token = req.header('Authorization');

    // Check if not token
    if (!token) {
        return res.status(401).json({
            msg: 'No token in "Authorization" header'
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