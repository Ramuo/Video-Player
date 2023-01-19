const player = document.querySelector('.player');
const video = document.querySelector('.video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon(){
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
    if(video.paused){
        video.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause');

    }else{
        video.pause();
        showPlayIcon();
       
    }
}
// On Video End, let us show play button icon
video.addEventListener('ended', showPlayIcon, false);

// PROGRESS BAR ---------------------------------- //
// Calculate Display time format
function displayTime(time){
    const minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 64);
    seconds = seconds > 9 ? seconds : `0${seconds}`;
    return `${minutes}:${seconds}`;
   
}
// Update progress bar as video plays
function updateProgress(){
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
    currentTime.textContent = `${displayTime(video.currentTime)} /`;
    duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek within the video
function setProgress(e){
    const newTime = e.offsetX / progressRange.offsetWidth;
    progressBar.style.width = `${newTime * 100}%`;
    video.currentTime = newTime * video.duration;
}


// Volume Controls --------------------------- //
let LastVolume = 1;

// voulume Bar 
function changeVolume(e){
    let volume = e.offsetX / volumeRange.offsetWidth;
    // rounding volume up or down
    if(volume < 0.1){
        volume = 0;
    }
    if(volume > 0.9){
        volume = 1;
    }
    volumeBar.style.width = `${volume * 100}%`;
    video.volume = volume;
  // Let us change de volume icon depending on volume 
  volumeIcon.className = '';
  if(volume > 0.7){
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }else if (volume < 0.7 && volume > 0){
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }else if(volume === 0){
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
  LastVolume = volume;
}
// let us set up the mute/unmute 
function toggleMute(){
    volumeIcon.className = '';
    if(video.volume){
        LastVolume = video.volume;
        video.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
    }else{
      video.volume = LastVolume;
      volumeBar.style.width = `${LastVolume * 100}%`;
      volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');  
    }
}

// Change Playback Speed -------------------- //
function changeSpeed(){
    video.playbackRate = speed.value;
   
}


// Fullscreen ------------------------------- //
/* View in fullscreen */
function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
    video.classList.add('video-fullscreen');
  }
  
  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
    video.classList.remove('video-fullscreen');
  }
  let fullscreen = false;
// Toggle fullscreen
  function toggleFullscreen(){
    if(!fullscreen){
        openFullscreen(player);
    }else{
        closeFullscreen();
    }
    fullscreen = !fullscreen;
  }


//EVENT LISTENERS:

playBtn.addEventListener('click', togglePlay, false);
video.addEventListener('click', togglePlay, false);
video.addEventListener('timeupdate', updateProgress, false);
video.addEventListener('canplay', updateProgress, false);
progressRange.addEventListener('click', setProgress, false);
volumeRange.addEventListener('click', changeVolume, false);
volumeIcon.addEventListener('click', toggleMute, false);
speed.addEventListener('change', changeSpeed, false);
fullscreenBtn.addEventListener('click', toggleFullscreen, false);
