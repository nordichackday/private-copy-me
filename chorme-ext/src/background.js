
chrome.extension.onRequest.addListener(function(request, sender, callback) {
    if (request.type == "PCM.download.NRK") {
    	//chrome.tabs.update(sender.tab.id, {url: request.url});
    	console.debug("You have now downloaded this program!");
    } else {
        callback("OMG wrong msg");
    }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.debug("Some message was called.");    
    return true;
});