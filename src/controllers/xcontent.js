const parse = require('../services/parser')

const GetContentController = {
    parseContents: (req, res, next) => {
        const url = req.query.url
        const output = parse(url)
        res.status(200).json({ success: true, data: output });
    }
}

module.exports = GetContentController;