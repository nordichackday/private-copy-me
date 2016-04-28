var apiEndpoint = "http://localhost:8000/endpoint"

function createToolBar(callback) {
	var vhsButton = $('<span>').attr("id", "vhs-button");
	vhsButton.html('<a id="downloadlink" href="#"></a>');
	
	$('h1.series-title').append(vhsButton);

	var url = chrome.extension.getURL("content/button.html");
	callback();
	// $('#vhs-button').load(url, function() {
	// 	callback();
	// });
}

function redirect (url) {
	chrome.extension.sendRequest({type: "PCM.download.NRK", url: url});	
}

function addClickHandlers() {	
	var currentUrl = window.location.href;
	var requestUrl = apiEndpoint + "?url=" + currentUrl

	$('a#downloadlink').unbind('click');
	$('a#downloadlink').on('click', function(event) {
		redirect(requestUrl);
	});		
}

$(document).ready(function() {
	var url = window.location.href;

	if (url.indexOf("tv.nrk.no/serie/") > -1 || url.indexOf("tv.nrk.no/program/") > -1) {
		createToolBar(function() {
			addClickHandlers();
		});
	}
	
});
