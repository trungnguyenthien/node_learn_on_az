(async function initPopupWindow() {
    document.getElementById("myButton").addEventListener("click", function () {
        alert("Hello, World!");
    });
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        alert(url);
        // use `url` here inside the callback because it's asynchronous!
    });

})();