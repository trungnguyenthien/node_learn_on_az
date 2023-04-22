const BaseArticleParser = require('./base-article-parser')
const {
    allImgSrcs
} = require('../utils/common')

class TruyenSexTvParser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://truyensextv.me/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = () => {
        const phantrang = this.rootQuery('div.phantrang')
        if (!phantrang) return null
        const links = phantrang.querySelectorAll('a.post-page-numbers')
        if (!links) return null
        const lastLink = links[links.length - 1];
        if (!lastLink) return null
        const href = lastLink.getAttribute('href')
        const text = lastLink.text
        if (text !== 'Đọc tiếp') return null
        return href
    };
    // Return Title của content. NULL nếu không parse được title.
    parseTitle = () => this.rootQuery('.bai-viet-box').querySelector('a').text;
    parseCreatedDate = () => null
    parseSummary = () => null;
    parseImages = () => null;
    isFirstArticle = () => true;

    // Return html Content
    parseContent() {
        var str = this.html
        var textStart = '<div class="ndtruyen">';
        var textEnd = '</div>';
        var startPos = str.indexOf(textStart) + textStart.length;
        var endPos = str.indexOf(textEnd, startPos);
        var result = str.substring(startPos, endPos);
        return result;

    }
}

module.exports = TruyenSexTvParser