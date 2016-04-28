
chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if (request.type == "PCM.download.NRK") {
    	// alert("You have now downloaded this program!");
        chrome.tabs.update(sender.tab.id, {url: request.url});
    } else {
        callback("OMG wrong msg");
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.debug("Some message was called.");    
    return true;
});
