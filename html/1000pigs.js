var urlPigs="http://pigs1000pigs.appspot.com/pig/get";
var urlGetPicture="http://pigs1000pigs.appspot.com/pig/blob?blob=";
var imageSize=250;
var pigsArea=document.getElementById('pigsArea');

var req;

var imgLoaded=function (img){
 
    img.className += ' loaded';
};

var getPigNode=function (url) {
	var blobUrl=urlGetPicture+url+"&imageSize="+imageSize;

	var pigHolder=document.createElement("div");
	pigHolder.setAttribute("class","pigHolder");

	var	pigImg=document.createElement("img");
	pigImg.setAttribute("src",blobUrl);
	pigImg.setAttribute("class","pigImg");
	pigImg.setAttribute("onload","imgLoaded(this)");

	pigHolder.appendChild(pigImg);

	return pigHolder;
}


var pigsReceived=function() {
	var blobUrl;
	
	pigsArea.textContent="";
	var pigs=JSON.parse(req.responseText);
	for (var i=0;i<pigs.length; i++) {
		pigsArea.appendChild(getPigNode(pigs[i].picture));
	}
}

var requestError=function() {
	pigsArea.textContent="";
	document.getElementById('nopigs').style.visibility="visible";
}


var updatePigs=function() {

	req=new XMLHttpRequest();
	req.onload=pigsReceived;
	req.addEventListener("error", requestError, false);
	req.open("get",urlPigs, true);
	req.send();
}

updatePigs();