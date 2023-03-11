const TuoiTreContentParser = require('./tuoitre-parser')

const {
    loadRaw
} = require('../utils/common')

const makeAllContentParser = () => [
    new TuoiTreContentParser()
]

const parse = async (url) => {
    console.log(`start parse url = ${url}`)
    const myParser = makeAllContentParser().find((p) => p.isMySite(url))

    console.log(myParser)

    if (!myParser) {
        return {
            error: 'No Parser'
        }
    }

    myParser.init(url, await loadRaw(url))

    const mainContent = myParser.parseContent()
    const title = myParser.parseTitle()
    console.log(title)
}

module.exports = parse