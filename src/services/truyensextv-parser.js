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
        let main = this.rootQuery('.ndtruyen')
        if(!main) {
            const logo2 = this.rootQuery('.logo2')

            this.removeAds(logo2, '.noibat')
            this.removeAds(logo2, '.bai-viet-box')
            this.removeAds(logo2, '.phdr')
            this.removeAds(logo2, '.phantrang')
            this.removeAds(logo2, '.dulieu')
            
            main = logo2
        }
        // this.removeAds(main, 'div.VCSortableInPreviewMode[type=RelatedOneNews]')
        try {
            return main.text
        } catch (err) {
            console.log(main)
            console.log(this.document)
        }

    }

}

module.exports = TruyenSexTvParser