(function () {
  chrome.storage.sync.get({
      preventAutomaticLogout: ''
    }, function(items) {
      if(items.preventAutomaticLogout) {
        new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
          })
          var node = document.querySelector('[data-u4id="sessionmanager-countdownwindow_OK"]')
          if (!!node) node.click()
        }).observe(document.querySelector('body'), {childList: true})
      }    
     })
})()