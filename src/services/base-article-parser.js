const { parse } = require('node-html-parser');

class ArticleParser {
    init(url, html) {
        this.url = url
        this.html = html
        this.document = parse(html)
    }

    rootQuery = (xpath) => this.document.querySelector(xpath)

    rootQueryAll = (xpath) => this.document.querySelectorAll(xpath)

    removeAds(rootElement, xpath) {
        const adDivs = rootElement.querySelectorAll(xpath)
        // console.log(adDiv)
        for (let adDiv of adDivs) {
            adDiv.parentNode.removeChild(adDiv)
            adDiv.remove()
        }
    }
}


class BaseArticleParser extends ArticleParser {

    isMySite(url) {
        return false; //url.startsWith(`https://tuoitre.vn/`)
    }

    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink() {
        return null;
    }

    // Return Title của content. NULL nếu không parse được title.
    parseTitle() {
        return null; // this.document.querySelector('.detail-title').text;
    }

    // Return html Content
    parseContent() {
        return null;
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


module.exports = BaseArticleParser