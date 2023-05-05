const BaseArticleParser = require('./base-article-parser')
const {
    parseSubString,
    arrayGetFromLast,
    splitStrFromLast
} = require('../utils/common')

class SayHentaiMeParser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://sayhentai.me/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = (currentLink) => {
        const divnext = this.rootQuery('div.nav-next')
        if(!divnext) return null
        const anexts = divnext.getElementsByTagName('a')
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
      const ol = this.rootQuery('ol[class="breadcrumb"]')
      if(!ol) return null
      const lis = ol.getElementsByTagName('li')
      if(!lis) return null
      let titleLi = arrayGetFromLast(lis, 1)
      if(!titleLi) return null
      return titleLi.text
    }
    parseCreatedDate = () => null
    parseSummary = () => null;
    parseImages = () => null;
    isFirstArticle = () => true;

    // Return html Content
    parseContent() {
        const chapContent = this.rootQuery('div[id="chapter_content"]')
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

module.exports = SayHentaiMeParser