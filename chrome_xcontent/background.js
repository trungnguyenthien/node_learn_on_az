// Hàm này được gọi khi sự kiện onCompleted xảy ra
function onCompleted2(details) {
  // Thực hiện đoạn mã JavaScript của bạn ở đây
  // alert("Trang web mới đã tải xong:" + details.url)
  chrome.cookies.getAll({
    domain: "youtube.com"
  }, function (cookies) {
    var a = []
    cookies.forEach(function (cookie) {
      console.log(cookie.name, cookie.value);
      a.push({
        key: cookie.name,
        value: cookie.value
      })
    });
    // console.log(cookies);
    alert(a)
  });
}

// Đăng ký sự kiện onCompleted
chrome.webNavigation.onCompleted.addListener(onCompleted2, {
  url: [{
    hostContains: '.'
  }]
});

chrome.commands.onCommand.addListener(async function (command) {
  if (command === "save_page") {
    const tabs = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true
    })
    let url = tabs[0].url;
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
  }
});


const api = 'http://localhost:3000/xcontent?file=1&url='
const downloadUrl = (url) => {
  if (!url.startsWith('https://truyensextv.me/')) {
    return null;
  }
  return api + url
}