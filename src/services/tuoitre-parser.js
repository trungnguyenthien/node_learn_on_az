const BaseArticleParser = require('./base-article-parser')

class TuoiTreContentParser extends BaseArticleParser {
    isMySite(url) {
        return url.startsWith(`https://tuoitre.vn/`)
    }

    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink() {
        return null;
    }

    // Return Title của content. NULL nếu không parse được title.
    parseTitle() {
        return this.rootQuery('.detail-title').text;
    }

    // Return html Content
    parseContent() {
        let main = this.rootQuery('.detail-content');
        this.removeAds(main, 'div.VCSortableInPreviewMode[type=RelatedOneNews]')
        return main.toString()
    }

    parseCreatedDate() {
        return null;
    }

    parseSummary() {
        return null;
    }

    parseListArticleImages() {
        return [];
    }

    isFirstArticle() {
        return true;
    }
}

module.exports = TuoiTreContentParser