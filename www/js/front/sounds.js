function playMusic()
{
	$(".music").play();
}

function pauseMusic()
{
$(".music").Pause();
}

function playSound(filename)
{
	$(".sound").Play("res/sounds/"+filename+".pm3");
	
}
function pauseMusic()
{
	$(".sound").Pause();
}
/*
function initSounds(){
	var sounds = getAvailableSounds();
	var music = sounds.music;
	var click = sounds.clickeffect;
	
	this.musicElement = document.createElement('audio');
	musicElement.setAttribute('src', music);
	musicElement.setAttribute('autoplay', 'autoplay');
	this.clickSoundElement = document.createElement('audio');
	clickSoundElement.setAttribute('src', click);
	clickSoundElement.setAttribute('autoplay','autoplay');

}
function getAvailableSounds(){
	var folder = "res/sounds/";
	return {
		music: folder + "music.mp3",
		clickeffect: folder + "click"
	}
}
*/
function play(filename){
	var filename = createsoundbite("res/sounds/"+filename+".mp3");
	filename.play();	
}

function pause(filename){
	
}
//define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
var html5_audiotypes={ 
	"mp3": "audio/mpeg",
	"mp4": "audio/mp4",
	"ogg": "audio/ogg",
	"wav": "audio/wav"
}

function createsoundbite(sound){
	var html5audio=document.createElement('audio')
	//check support for HTML5 audio
	if (html5audio.canPlayType){ 
		for (var i=0; i<arguments.length; i++){
			var sourceel=document.createElement('source')
			sourceel.setAttribute('src', arguments[i])
			if (arguments[i].match(/\.(\w+)$/i))
				sourceel.setAttribute('type', html5_audiotypes[RegExp.$1])
			html5audio.appendChild(sourceel)
		}
		html5audio.load()
		html5audio.playclip=function(){
			html5audio.pause()
			html5audio.currentTime=0
			html5audio.play()
		}
		return html5audio
	}
	else{
		return {playclip:function(){throw new Error("Your browser doesn't support HTML5 audio unfortunately")}}
	}
}

var clicksound=createsoundbite("res/sounds/click.wav")
var musicOld=createsoundbite("res/sounds/music.mp3")
