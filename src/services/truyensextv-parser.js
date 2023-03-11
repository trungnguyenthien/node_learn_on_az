const BaseArticleParser = require('./base-article-parser')
const {
    allImgSrcs
} = require('../utils/common')

class TruyenSexTvParser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://truyensextv.com/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = () =>  {
        const phantrang = this.rootQuery('div.phantrang')
        const links = phantrang.querySelectorAll('a.post-page-numbers')
        if(!links) return null
        const lastLink = links[links.length - 1];
        if (!lastLink) return null
        const href = lastLink.getAttribute('href')
        // const text = lastLink.text
        // if(text !== 'Đọc tiếp') return null
        return href
    };
    // Return Title của content. NULL nếu không parse được title.
    parseTitle = () => this.rootQueryText('.bai-viet-box > a');
    parseCreatedDate = () => null
    parseSummary = () =>  null;
    parseImages = () =>  null;
    isFirstArticle = () =>  true;

    // Return html Content
    parseContent() {
        let main = this.rootQuery('div.ndtruyen');
        // this.removeAds(main, 'div.VCSortableInPreviewMode[type=RelatedOneNews]')
        return main.toString()
    }

}

module.exports = TruyenSexTvParser