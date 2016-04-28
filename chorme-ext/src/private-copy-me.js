var odaBaseUrl = "http://vmaodaprod01/oda";
var tvBaseUrl = "https://tv.nrk.no";
var radioBaseUr = "https://radio.nrk.no"

function createOdaToolBar(toolbarUrl, callback) {
	var oda = $('<div>').attr("id", "oda-toolbar");
	oda.addClass('above-big-bg-image');
	$('body').prepend(oda);

	var url = chrome.extension.getURL(toolbarUrl);
	$('#oda-toolbar').load(url, function() {
		callback();
	});
}

function getCurrentPiProgId() {
	var piId = $('meta[name="programid"]').attr('content');
	if (piId)
		return piId;
	else
		return undefined;
}

function redirect (url) {
	chrome.extension.sendRequest({type: "ODAFY.redirect", url: url});	
}

function addClickHandlers() {	
	var currentUrl = window.location.href;
	var piId = getCurrentPiProgId();

	$('a#openOda').unbind('click');
	$('a#openOda').on('click', function(event) {
		var programUrl;

		if (piId == undefined) {
			programUrl = "http://vmaodaprod01/";
		} else if (currentUrl.indexOf("radio.nrk.no") > -1) {
			programUrl = odaBaseUrl + "/radio/Program/" + piId;
		} else if (currentUrl.indexOf("tv.nrk.no") > -1) {
			programUrl = odaBaseUrl + "/tv/Program/" + piId;
		}
		
		redirect(programUrl);
	});

	$('a#openOdaLog').unbind('click');
	$('a#openOdaLog').on('click', function(event) {
		var programUrl = odaBaseUrl + "/tv/Admin/Log/" + piId;
		redirect(programUrl);
	});
	

	$('a#addToBinge').unbind('click');
	$('a#addToBinge').on('click', function(event) {
		addToBinge(piId);
	});		

	$('a#addToPakkeBinge').unbind('click');
	$('a#addToPakkeBinge').on('click', function(event) {
		addToPakkeBinge(piId);
	});		

	$('a#openPackageOda').unbind('click');
	$('a#openPackageOda').on('click', function(event) {
		var temaId = getCurrentTemaId();
		var packageUrl = odaBaseUrl + "/tv/Packages/" + temaId;
		redirect(packageUrl);
	});		
	
}

function setupSearchInput() {
	$("input#odaSearch").val(getCurrentPiProgId());
	$("input#odaSearch").on('click', function (e) { this.select(); });
	$("input#odaSearch").keyup(function (e) {
	    if (e.keyCode == 13) {
	        var programUrl = tvBaseUrl + "/Program/" + $(event.target).val();
	        redirect(programUrl);
	    }
	});

	$("button.search-button").on('click', function (e) {
		var programUrl = tvBaseUrl + "/Program/" + getCurrentPiProgId();
	    redirect(programUrl);			
	});
}

function setEnvironmentVariables() {
	chrome.runtime.sendMessage({method: "getEnvironment"}, function(response) {
		console.log(response);
		odaBaseUrl = response.environmentUrl;
	});	
}

$(document).ready(function() {
	var url = window.location.href;
	var toolbarUrl = "content/toolbarMini.html";

	if 	(url.indexOf("tv.nrk.no/serie/") > -1) {
		toolbarUrl = "content/toolbar.html";
	} else if (url.indexOf("tv.nrk.no/program/") > -1) {
		toolbarUrl = "content/toolbar.html";
	} else if (url.indexOf("radio.nrk.no/serie/") > -1) {
		toolbarUrl = "content/toolbarRadio.html";
	} else if (url.indexOf("radio.nrk.no/program/") > -1) {
		toolbarUrl = "content/toolbarRadio.html";				
	} else if (url.indexOf("/tema/") > -1) {
		toolbarUrl = "content/toolbarTema.html";
	}
	
	createOdaToolBar(toolbarUrl, function() {
		setEnvironmentVariables();
		addClickHandlers();
		setupSearchInput();
		$("input#odaSearch").focus();
	});
});
