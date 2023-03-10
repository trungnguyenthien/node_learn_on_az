class BaseContentParser {
    init(url) {
        this.url = url;
        this.html = null;
    }

    isMySite() {
        return false;
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

    }
}


module.exports = BaseContentParser