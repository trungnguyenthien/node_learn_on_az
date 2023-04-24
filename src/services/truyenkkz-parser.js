const BaseArticleParser = require('./base-article-parser')
const {
  parseSubString
} = require('../utils/common')

class TruyenKkzParser extends BaseArticleParser {
  isMySite = (url) => url.startsWith(`https://truyenkkz.com/truyen/`)
  // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
  parseNextLink = () => {
    const phantrang = this.rootQuery('div[class="pagination pagination-bottom"]')
    if (!phantrang) return null
    const links = phantrang.querySelectorAll('div[class="next-chap"]')
    if (!links) return null
    const lastLink = links[links.length - 1];
    if (!lastLink) return null
    const lastA = lastLink.getElementsByTagName('a')
    try {
      return lastA[0].getAttribute('href')
    } catch (error) {
      return null
    }
  };
  // Return Title của content. NULL nếu không parse được title.
  parseTitle = () => this.rootQuery('h1[class="text-center"]').text.trim();
  parseCreatedDate = () => null
  parseSummary = () => null;
  parseImages = () => null;
  isFirstArticle = () => true;

  // Return html Content
  parseContent() {
    return this.rootQuery('div.reading').innerHTML.trim()
  }
}

module.exports = TruyenKkzParser