const TuoiTreParser = require('./tuoitre-parser')
const TruyenSexTvParser = require('./truyensextv-parser')
const SayHentaiMeParser = require('./Sayhentaime-parser')
const HentaiV1Parser = require('./hentaiv1-parser')
const { log, warn, error, success } = require('../utils/log')
const common = require('../utils/common')
const { md5 } = require('../utils/crypto-utils')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const makeAllContentParser = () => [
    new TuoiTreParser(),
    new TruyenSexTvParser(),
    new SayHentaiMeParser(),
    new HentaiV1Parser()
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
    let currentLink = ""
    while (myURL) {
        const html = await common.loadRaw(myURL)
        console.log("Load completed " + myURL)
        if(!html) {
            console.log('Load HTML ERROR, html = ' + html)
            return "Load HTML ERROR"
        }
       
        myParser.init(myURL, html)
        const content = myParser.parseContent()
        const title = myParser.parseTitle()
        const nextLink = myParser.parseNextLink(currentLink)
        const summary = myParser.parseSummary()
        const images = myParser.parseImages()
        currentLink = nextLink

        // console.log(content)
        if(!content) {
            break
        }

        output.push({
            id: md5(myURL),
            url: myURL,
            title: title,
            summary: summary,
            images: images,
            chapNum: chapNum,
            content: content,
        })
        chapNum += 1
        myURL = nextLink
        await sleep(100)
    }

    return output
}

module.exports = parse