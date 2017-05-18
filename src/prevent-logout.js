(function() {
  var checkForActiveStatusAndResetTimer = function (){
    var xhrStatus = new XMLHttpRequest();
    xhrStatus.open('GET', '/p470014-web/api/session/current', true)
    xhrStatus.send()
    xhrStatus.onreadystatechange = function(e) {
      if (xhrStatus.readyState == 4 && xhrStatus.status == 200) {
        var response = JSON.parse(xhrStatus.responseText)
        if (response.active) {
          var xhrRenew = new XMLHttpRequest()
          xhrRenew.open('GET', '/p470014-web/api/session/current?renew=true', true)
          xhrRenew.send()
          xhrRenew.onreadystatechange = function(e) {
            if (xhrRenew.readyState == 4 && xhrRenew.status == 200) {
              var renewResponse = JSON.parse(xhrRenew.responseText)
              console.log(renewResponse)
            }
          }
        }    
      }
    }
  }

  chrome.storage.sync.get({
    preventAutomaticLogout: ''
  }, function(items) {
    if(items.preventAutomaticLogout) {
      setInterval(checkForActiveStatusAndResetTimer, 1000*60*5) //5 minutes
    }
  })
})()