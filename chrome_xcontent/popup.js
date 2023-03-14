

(async function initPopupWindow() {
    const tabs = await chrome.tabs.query({active: true, lastFocusedWindow: true})
    let url = tabs[0].url;
    $("#url").text(url);

})();