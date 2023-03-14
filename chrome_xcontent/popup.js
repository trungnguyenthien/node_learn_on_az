

(async function initPopupWindow() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        $("#url").text(url);
    });
})();