const music_list = [
    {
        img : 'image/eren_hairstyle.jpg',
        name : 'Phong Dạ Hành',
        artist : 'BT x LVT REMIX',
        music : 'music/PHONG DẠ HÀNH - BT x LVT REMIX.mp3',
    },
    {
        img : 'image/eren.jpg',
        name : 'ORB SAK SNEA REMIX',
        artist : 'ARS - REMIX',
        music : 'music/ORB SAK SNEA REMIX - ( ARS - REMIX ).mp3'
    },
    {
        img : 'image/Zenitsu.jpg',
        name : 'Vương Vấn Remix',
        artist : 'Qinn Remix',
        music : 'music/Vương Vấn Remix - Qinn Remix.mp3'
    },
    {
        img : 'image/eren_jacket.jpg',
        name : 'Ít Nhưng Dài Lâu',
        artist : 'Nam Con REMIX',
        music : 'music/Ít Nhưng Dài Lâu - Yan Nguyễn x Chu Thúy Quỳnh - Nam Con REMIX.mp3'
    }
];

let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');


let time_remain = document.querySelector('.time-remain');
let wave = document.querySelector('.wave');
let randomIcon = document.querySelector('.track-random');
let repeatIcon = document.querySelector('.track-repeat');
let curr_track = document.querySelector('audio');

let isRandom = false;
let isRepeat = false;
let curr_index = 1;
let isPlaying = false;
let updateTimer;

const cdThumbAnimate = track_art.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000, // 10 seconds
    iterations: Infinity
});
cdThumbAnimate.pause()


let pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-play" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<path d="M7 4v16l13 -8z"></path>
</svg>`

let playIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-pause" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
<rect x="6" y="5" width="4" height="14" rx="1"></rect>
<rect x="14" y="5" width="4" height="14" rx="1"></rect>
</svg>`

loadTrack(curr_index)
//load
function loadTrack(curr_index) {
    clearInterval(updateTimer)
    reset();
    curr_track.src = music_list[curr_index].music
    curr_track.load();

    track_art.style.backgroundImage = `url(${music_list[curr_index].img})`
    track_name.textContent = music_list[curr_index].name
    track_artist.textContent = music_list[curr_index].artist

    updateTimer = setInterval(setUpdate,1000);

    curr_track.addEventListener('ended', nextTrack)
}

playpause_btn.addEventListener('click', ()=> {
    playpause()
})
next_btn.addEventListener('click', ()=> {
    nextTrack()
})
prev_btn.addEventListener('click', ()=> {
    prevTrack()
})

randomIcon.addEventListener('click', ()=>{
    isRandom = isRandom? false: true;
   
    if(isRandom) {
        randomIcon.classList.add('active')
        repeatIcon.classList.remove('active')
        isRepeat = false
    }
    else {
        randomIcon.classList.remove('active')
    }
    
})
repeatIcon.addEventListener('click', ()=>{
    isRepeat = isRepeat? false: true;

    if(isRepeat) {
        repeatIcon.classList.add('active')
        randomIcon.classList.remove('active')
        isRandom = false
    }
    else {
        repeatIcon.classList.remove('active')
    }
    
})

seek_slider.addEventListener('change',()=> {
    seekTo()
})

// reset
function reset() {
    seek_slider.value = 0;
    time_remain.textContent='00:00'
    playpause_btn.innerHTML = pauseIcon 
}
// playpause
function playpause() {
    isPlaying ? pauseTrack() : playTrack()
    if(isPlaying)
      cdThumbAnimate.play()
    else cdThumbAnimate.pause()
}
function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = playIcon
}

function pauseTrack() {
    curr_track.pause()
    isPlaying = false;
    playpause_btn.innerHTML = pauseIcon
}
// prev
function prevTrack() {
    let sumSongs = music_list.length;
    if(!isRepeat && !isRandom) {
        (curr_index > 0) ? curr_index-=1:curr_index= sumSongs-1;
    } else if(isRandom) {
        let x = random()
        x != curr_index? curr_index = x : curr_index +=1;
    }
    loadTrack(curr_index)
    playTrack()
}
// nex
function nextTrack() {
    let sumSongs = music_list.length;
    if(!isRepeat && !isRandom) {
        (curr_index < sumSongs-1) ? curr_index+=1:curr_index= 0
    } else if(isRandom) {
        let x = random()
        x != curr_index? curr_index = x : curr_index +=1;
    }
    loadTrack(curr_index)
    playTrack()
}
// random
function random() {
    return Number.parseInt(Math.random() * music_list.length)
}

// seekto
function seekTo() {
    let percent = seek_slider.value;
    curr_track.currentTime = percent*curr_track.duration/100;

}
// update
function setUpdate(){
    //console.log(random())
    
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){

        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let timeLeft = Math.floor(curr_track.duration - curr_track.currentTime); 
        let minutesLeft = Math.floor(timeLeft/ 60);
        let secondsLeft = Math.floor(timeLeft - (minutesLeft * 60));
       
        if(secondsLeft < 10) {secondsLeft = "0" + secondsLeft; }
        if(minutesLeft < 10) { minutesLeft = "0" + minutesLeft; }

        time_remain.textContent = "-" + minutesLeft + ":" + secondsLeft;
        
    }
    
}