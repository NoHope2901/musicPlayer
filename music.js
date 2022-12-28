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

let curr_time = document.querySelector('.current-time');
let time_remain = document.querySelector('.time-remain');
let wave = document.querySelector('.wave');
let randomIcon = document.querySelector('.track-random');
let curr_track = document.querySelector('audio');

let isRandom = false;
let isRepeat = false;
let curr_index = 2;

track_art.style.backgroundImage = 'url(/image/eren.jpg)'
curr_track.src= 'music/A y Mạc.mp3'
track_name.textContent = 'A Y Mac'
track_artist.textContent = 'Chinese Singer'
curr_track.play()
console.log(curr_track.duration)
// curr_track.play()

// loadTrack(curr_index)
// load
// function loadTrack(curr_index) {
//     reset();
//     curr_track.src = music_list[curr_index].music
//     curr_track.load();
//     curr_track.play()
//     track_art.style.backgroundImage = `url(${music_list[curr_index].img})`
//     track_name.textContent = music_list[curr_index].name
//     track_artist.textContent = music_list[curr_index].artist

//     curr_track.addEventListener('ended', nextTrack)
// }

// reset
function reset() {
    seek_slider.value = 0;
    time_remain.textContent='00:00' 
}
// playpause
function playpause() {

}
// prev
// nex
function nextTrack() {

}
// random
// repeat
// seekto
// update