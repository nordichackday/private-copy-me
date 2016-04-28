var apiEndpoint = "http://40.68.29.184/download"

function createButton(currentURL, tagSelector, buttonHtml) {
	var downloadURL = apiEndpoint + "?url=" + encodeURIComponent(currentURL);
	var vhsButton = $('<span>').attr("id", "vhs-button");
	vhsButton.html(buttonHtml);

	$(tagSelector).append(vhsButton);
	console.debug(downloadURL)
	addClickHandlers(downloadURL);
}

function createNrkButton(currentURL) {
	createButton(currentURL, 'h1.series-title', '<a id="downloadlink" class="downloadIcon" href="#"></a>')
}

function createSvtButton(currentURL) {
	createButton(currentURL, 'div.play_video-area-aside__info', '<a id="downloadlink" class="play_video-area-aside__title-page-link" href="#">Ladda ned videon</a>')
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

function isNrkVideoPage(url) {
	return url.indexOf("tv.nrk.no/serie/") > -1 || url.indexOf("tv.nrk.no/program/") > -1
}

function isSvtVideoPage(url) {
	return url.indexOf("svtplay.se/video/") > -1
}

$(document).ready(function() {
	var currentURL = window.location.href;
	if (isNrkVideoPage(currentURL)) {
		console.debug(alignHttpsToHttp(currentURL))
		createNrkButton(alignHttpsToHttp(currentURL));
	} else if (isSvtVideoPage(currentURL)) {
		console.debug(alignHttpsToHttp(currentURL))
		createSvtButton(alignHttpsToHttp(currentURL));
	}
});
