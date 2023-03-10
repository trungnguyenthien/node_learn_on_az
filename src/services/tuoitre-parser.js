const BaseContentParser = require('./content-parser')
const {parse} = require('node-html-parser');

class TuoiTreContentParser extends BaseContentParser {
    setUrl(url) {
        this.url = url;
    }

    setHtml(html) {
        this.html = html;
        // console.log(html);
        this.document = parse(html)
    }

    isMySite(url) {
        return url.startsWith(`https://tuoitre.vn/`)
    }

    // Return NULL: Không request next content, có thể là không lấy được link tiếp theo hoặc content này là cuối cùng.
    parseNextLink() {
        return null;
    }

    // Return Title của content. NULL nếu không parse được title.
    parseTitle() {
        return null;
    }

    // Return html Content
    parseContent() {
        // console.log(this.document)
        let main = this.document.querySelector('.detail-content');
        const adDivs = main.querySelectorAll('div.VCSortableInPreviewMode[type=RelatedOneNews]')
        // console.log(adDiv)
        for(let adDiv of adDivs) {
            adDiv.parentNode.removeChild(adDiv)
            adDiv.remove()
          }

        // main.removeChild(main.querySelector('.VCSortableInPreviewMode'))
        return main.toString()
    }
}

module.exports = TuoiTreContentParser