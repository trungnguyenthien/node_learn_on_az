//const { default: axios } = require("axios");

(async function initPopupWindow() {
    const icLoading = $('#ic_loading');
    const icError = $('#ic_error');
    const icSuccess = $('#ic_success');

    icLoading.attr('hidden', true);
    icSuccess.attr('hidden', true);
    icError.attr('hidden', true);

    const tabs = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    })
    let url = tabs[0].url;

    $("#url").text(url);

    icLoading.attr('hidden', false);
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
            if (downloadDelta.id !== downloadId) return
            if (!downloadDelta.state) return
            if (downloadDelta.state.current === "complete") {
                // xử lý khi download hoàn tất
                console.log("Download complete!");
                icLoading.attr('hidden', true);
                icSuccess.attr('hidden', false);
                icError.attr('hidden', true);
            }

            if (downloadDelta.error) {
                // xử lý khi download hoàn tất
                console.log("Download FAILT!");
                icLoading.attr('hidden', true);
                icSuccess.attr('hidden', true);
                icError.attr('hidden', false);
            }
        });
    });
})();

const api = 'http://localhost:3000/xcontent?file=1&url='
const downloadUrl = (url) => {
    return api + url
}