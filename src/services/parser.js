const TuoiTreContentParser = require('./tuoitre-parser')

const {httpGet, loadRaw} = require('../utils/common')

const allContentParser = [
    new TuoiTreContentParser()
]

const parse = async (url) => {
    console.log(`start parse url = ${url}`)
    const myParser = allContentParser.find((p) => p.isMySite(url))

    console.log(myParser)

    if(!myParser) {
        console.log(`No Parser`)
        return {error: 'No Parser'}
    }

    myParser.setUrl(url);
    myParser.setHtml(await loadRaw(url))
    const mainContent = myParser.parseContent()

    console.log(mainContent)
}

module.exports = parse