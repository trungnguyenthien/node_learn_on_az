const BaseArticleParser = require('./base-article-parser')
const {
    allImgSrcs
} = require('../utils/common')

class TuoiTreParser extends BaseArticleParser {
    isMySite = (url) => url.startsWith(`https://tuoitre.vn/`)
    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink = () =>  null;
    // Return Title của content. NULL nếu không parse được title.
    parseTitle = () => this.rootQueryText('.detail-title');
    parseCreatedDate = () => null
    parseSummary = () =>  this.rootQueryText('.detail-sapo');
    parseImages = () =>  allImgSrcs(this.html);
    isFirstArticle = () =>  true;

    // Return html Content
    parseContent() {
        let main = this.rootQuery('.detail-content');
        this.removeAds(main, 'div.VCSortableInPreviewMode[type=RelatedOneNews]')
        return main.toString()
    }

}

module.exports = TuoiTreParser