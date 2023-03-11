const parse = require('../services/parser')

const GetContentController = {
    parseContents: async (req, res, next) => {
        const url = req.query.url
        const output = await parse(url)

        console.log(output.map((m) => m.id))

        res.status(200).json({
            success: true,
            data: output
        });
    }
}

module.exports = GetContentController;