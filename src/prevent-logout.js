(function () {
  chrome.storage.sync.get({
      preventAutomaticLogout: ''
    }, function(items) {
      if(items.preventAutomaticLogout) {
        console.log('adding prevent automatic logout')
        $(document).on('DOMNodeInserted', '[data-u4id="sessionmanager-countdownwindow"]', function(e) {
          var node = document.querySelector('[data-u4id="sessionmanager-countdownwindow_OK"]')
          if (!!node) node.click()
        })
      } else {
        console.log('prevent automatic logout setting not set')
      }
    })
})()