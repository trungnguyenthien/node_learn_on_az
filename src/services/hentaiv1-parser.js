const BaseArticleParser = require('./base-article-parser')
const {
    parseSubString,
    arrayGetFromLast,
    splitStrFromLast
} = require('../utils/common')

class HentaiV1Parser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://hentaivv1.com/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = (currentLink) => {
        const divnexts = this.rootQueryAll('div.next-chap')
        if(!divnexts) return null
        const lastDivNext = arrayGetFromLast(divnexts, 0)
        if(!lastDivNext) return null
        const anexts = lastDivNext.getElementsByTagName('a')
        if(!anexts || anexts.length ==  0) return null
        const href = anexts[0].getAttribute('href')
        if(href !== currentLink) {
          return href
        }
        let parts = splitStrFromLast(currentLink, '-')
        if(!parts) return null
        return `${parts[0]}-${parseInt(parts[1], 10) + 1}`
    };
    // Return Title của content. NULL nếu không parse được title.
    parseTitle = () => {
      const h1 = this.rootQuery('h1')
      if(!h1) return null
      return h1.text
    }
    parseCreatedDate = () => null
    parseSummary = () => null;
    parseImages = () => null;
    isFirstArticle = () => true;

    // Return html Content
    parseContent() {
        const chapContent = this.rootQuery('div[class="reading"]')
        if(!chapContent) return null
        const imgs = chapContent.getElementsByTagName('img')
        let imgIndex = 0
        let array = Array()
        imgs.forEach(img => {
          const src = img.getAttribute('src')
          const width = img.getAttribute('width')
          const height = img.getAttribute('height')
          array.push({
            index: imgIndex++,
            src: src,
            width: width,
            height: height
          })
        })
        return array
    }
}

module.exports = HentaiV1Parser