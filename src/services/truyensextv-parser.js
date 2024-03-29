const BaseArticleParser = require('./base-article-parser')
const {
    parseSubString
} = require('../utils/common')

class TruyenSexTvParser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://truyensextv.me/`) || url.startsWith(`https://truyennung.com/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = (currentLink) => {
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
    parseTitle = () => this.rootQuery('.bai-viet-box').text.trim();
    parseCreatedDate = () => null
    parseSummary = () => null;
    parseImages = () => null;
    isFirstArticle = () => true;

    // Return html Content
    parseContent() {
        var html2 = parseSubString(this.html, '<div class="ndtruyen">', '</div>')
        // return this.textOf(`<html><body>${html2}</body></html>`)
        return html2.trim()
    }
}

module.exports = TruyenSexTvParser