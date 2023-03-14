// Hàm này được gọi khi sự kiện onCompleted xảy ra
function onCompleted2(details) {
    // Thực hiện đoạn mã JavaScript của bạn ở đây
    // alert("Trang web mới đã tải xong:" + details.url)
  }
  
  // Đăng ký sự kiện onCompleted
  chrome.webNavigation.onCompleted.addListener(onCompleted2, {url: [{hostContains: '.'}]});


