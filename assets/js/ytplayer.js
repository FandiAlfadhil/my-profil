var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

var ytID = ['itKPyGXrCVA']; //複数対応のために配列で指定する
var ytNow = 0;
var ytSize = 'large';

function onYouTubeIframeAPIReady() {
	player = new YT.Player('js-bgYoutube', {
		height: '100%',
		width: '100%',
		videoId:ytID[0],
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange,
			'onError':onPlayerError
		},
		playerVars: {
			rel:0,
			controls:0,
			disablekb:1,
			fs:0,
			iv_load_policy:3,
			showinfo:0,
			modestbranding:1,
			playsinline : 1,
		}
	});
}
function onPlayerReady(event) {
	event.target.mute();
	event.target.playVideo();
}
function onPlayerStateChange(event) {
	if(event.data == YT.PlayerState.ENDED){
		ytNow++;
		if(ytNow >= ytID.length){
			ytNow = 0;
		}
		if(ytNow < 0){
			ytNow = ytID.length - 1;
		}
		player.clearVideo();
		player.loadVideoById(ytID[ytNow],0,ytSize);
		player.playVideo();
	}
}
function stopVideo() {
	player.stopVideo();
}
function onPlayerError(event){
	console.log(event);
}
