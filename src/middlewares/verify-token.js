const config = require('../config/env-vars');
const common = require('../utils/common');

const verifyUserToken = (req, res, next) => {
    console.log("MIDDLEWARE: verifyUserToken");

    if (config.VERIFY_TOKEN == '0') {
        next();
        return //res.end();
    }

    // Get token from header
    const token = req.header('Authorization');
    // Verify token
    const checkToken = common.genToken();
    console.log(`Token ${token}`);
    // Check if not token
    if (!token) {
        res.status(401).send({
            error: `No token in [Authorization] header`
        });
        return res.end();
    } else if (checkToken !== token) {
        res.status(401).json({
            error: 'Token is not valid'
        })
        return res.end();
    } else {
        next();
        return //res.end();
    }
};

module.exports = verifyUserToken;