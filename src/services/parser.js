const TuoiTreParser = require('./tuoitre-parser')
const TruyenSexTvParser = require('./truyensextv-parser')
const { log, warn, error, success } = require('../utils/log')
const common = require('../utils/common')

const makeAllContentParser = () => [
    new TuoiTreParser(),
    new TruyenSexTvParser(),
]

const parse = async (url) => {
    console.log(`start parse url = ${url}`)
    const myParser = makeAllContentParser().find((p) => p.isMySite(url))

    if (!myParser) {
        error('No Parser')
        return {
            error: 'No Parser'
        }
    }

    let output = [];
    let chapNum = 0;
    let myURL = url;
    while (myURL) {
        console.log(`Process: ${myURL}`)
        const html = await common.loadRaw(url)
        if(!html) {
            error('Load HTML ERROR')
            return "Load HTML ERROR"
        }
        
        myParser.init(url, html)
        const content = myParser.parseContent()
        const title = myParser.parseTitle()
        const nextLink = myParser.parseNextLink()
        const summary = myParser.parseSummary()
        const images = myParser.parseImages()

        console.log(nextLink)

        output.push({
            id: common.string2Hex(myURL),
            title: title,
            summary: summary,
            images: images,
            chapNum: chapNum,
            content: content,
        })
        chapNum += 1
        myURL = nextLink
    } 

    console.log(output.map((m) => m.id))

    return output


}

module.exports = parse