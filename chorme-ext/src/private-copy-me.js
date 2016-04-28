var apiEndpoint = "http://40.68.29.184/download"

function createButton(currentURL) {
	var downloadURL = apiEndpoint + "?url=" + encodeURIComponent(currentURL);
	var vhsButton = $('<span>').attr("id", "vhs-button");
	vhsButton.html('<a id="downloadlink" href="#"></a>');

	$('h1.series-title').append(vhsButton);
	console.debug(downloadURL)
	addClickHandlers(downloadURL);
}

function redirect (url) {
	chrome.extension.sendRequest({type: "PCM.download.NRK", url: url});	
}

function addClickHandlers(downloadURL) {	
	$('a#downloadlink').unbind('click');
	$('a#downloadlink').on('click', function(event) {
		redirect(downloadURL);
	});
}

function alignHttpsToHttp(url) {
	if (url.indexOf("https://") > -1) {
		url = "http://" + url.substring(8, url.length)
	}
	return url;
}

$(document).ready(function() {
	var currentURL = window.location.href;
	if (currentURL.indexOf("tv.nrk.no/serie/") > -1 || currentURL.indexOf("tv.nrk.no/program/") > -1) {
		console.debug(alignHttpsToHttp(currentURL))
		createButton(alignHttpsToHttp(currentURL));
	}
});
