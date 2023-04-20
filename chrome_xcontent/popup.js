//const { default: axios } = require("axios");

(async function initPopupWindow() {
    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    })
    let url = tabs[0].url;
    $("#url").text(url);
    const _url = downloadUrl(url);
    if (!_url) {
        return
    }
    chrome.downloads.download({
        url: _url,
        saveAs: false,
        conflictAction: "uniquify"
    }, function (downloadId) {

        chrome.downloads.onChanged.addListener(function (downloadDelta) {
            if (downloadDelta.state && downloadDelta.state.current === "complete" && downloadDelta.id === downloadId) {
                // xử lý khi download hoàn tất
                console.log("Download complete!");
            }
        });
    });
})();

const api = 'http://localhost:3000/xcontent?file=1&url='
const downloadUrl = (url) => {
    if (!url.startsWith('https://truyensextv.me/')) {
        return null;
    }
    return api + url
}