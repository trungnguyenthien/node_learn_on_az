const parse = require('../services/parser')
const {
    Readable
} = require('stream');

const GetContentController = {
    parseContents: async (req, res, next) => {
        const url = req.query.url
        const isDownload = (req.query.file || 0) == 1
        const output = await parse(url)
        console.log(`output = ${output}`)

        console.log(output.map((m) => m.id))

        if (isDownload && output.length > 0) {
            // Tạo nội dung file
            const fileContents = JSON.stringify(output, null, 2);
            const fileName = encodeURIComponent(output[0].title);
            console.error(`attachment; filename=${fileName}.json`);
            // Tạo Readable stream từ nội dung file
            const fileStream = new Readable();
            fileStream.push(fileContents);
            fileStream.push(null); // Kết thúc stream

            // Thiết lập header response
            res.setHeader('Content-disposition', `attachment; filename=${fileName}.json`);
            res.setHeader('Content-type', 'application/json');

            // Trả về file bằng pipe stream
            fileStream.pipe(res);
        } else {
            res.status(200).json({
                success: true,
                data: output
            });
        }

    }
}

module.exports = GetContentController;