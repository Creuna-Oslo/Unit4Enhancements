function OpenOptionsMenu(){
    if(chrome.runtime.openOptionsPage){
        chrome.runtime.openOptionsPage();
    }
    else{
        window.open(chrome.runtime.getURL("options.html"))
    }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message.intent){
        case "options":
            OpenOptionsMenu();
            break;
        default:
    }
});