console.log("Welcome to Spotify")

//Declaring valriables - getting elements
let songIndex = 0;
let audioElement = new Audio(`songs/${songIndex + 1}.mp3`);
// let prevAudioElementID = 0; //we do not need any previous index, we can work with e.target.id and songIndex only
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let currSongName = document.getElementsByClassName('currSongName');
let currSongSingerName = document.getElementsByClassName('currSongSingerName');
songs = [
    { songName: "Jalte Diye", filePath: "songs/1.mp3", singerName: "Anwesshaa, Vineet Singh, Harshdeep Kaur", coverPath: "covers/1.jpg" },
    { songName: "Aaj Unse Kehna Hai", filePath: "songs/2.mp3", singerName: "Aishwarya Majmudar, Palak Muchhal, Shaan, Himesh Reshammiya", coverPath: "covers/2.jpg" },
    { songName: "Lutt Putt Gaya", filePath: "songs/3.mp3", singerName: "Pritam, Arijit Singh, Swanand Kirkire, IP Singh", coverPath: "covers/3.jpg" },
    { songName: "Aaj Sher Khul Gaye", filePath: "songs/4.mp3", singerName: "Vishal-Sheykhar, Benny Dayal, Shilpa Rao", coverPath: "covers/4.jpg" },
    { songName: "Papa Meri Jaan", filePath: "songs/5.mp3", singerName: "Sonu Nigam, Harshavardhan Rameshwar, Raj Shekhar", coverPath: "covers/5.jpg" },
    { songName: "Befikra", filePath: "songs/6.mp3", singerName: "Meet Bros, Aditi Singh Sharma, Natalie Ram, Thomson Andrews, Keshia Braganza, Gwan Dias, Ryan Dias", coverPath: "covers/6.jpg" },
    { songName: "Kesariya", filePath: "songs/7.mp3", singerName: "Pritam, Arijit Singh, Amitabh Bhattacharya", coverPath: "covers/7.jpg" },
    { songName: "Deva Deva", filePath: "songs/8.mp3", singerName: "Pritam, Arijit Singh, Amitabh Bhattacharya, Jonita Gandhi", coverPath: "covers/8.jpg" },
    { songName: "Galliyan", filePath: "songs/9.mp3", singerName: "Ankit Tiwari", coverPath: "covers/9.jpg" },
    { songName: "Falak Tu Garaj Tu", filePath: "songs/10.mp3", singerName: "Suchetha Basrur", coverPath: "covers/10.jpg" },
]
function getAudioDuration(audioSrc, element, i) {
    let audio = new Audio(audioSrc);
    audio.onloadedmetadata = function () {
        let duration = audio.duration;
        let hours = Math.floor(duration / 3600);
        let minutes = Math.floor((duration % 3600) / 60);
        let seconds = Math.floor(duration % 60);

        hours = (hours < 10) ? `0${hours}` : hours;
        minutes = (minutes < 10) ? `0${minutes}` : minutes;
        seconds = (seconds < 10) ? `0${seconds}` : seconds;

        let DurationInFormat = minutes + ':' + seconds;
        if (hours != 0) {
            DurationInFormat = hours + ':' + minutes + ':' + seconds;
        }
        // console.log(element, i, DurationInFormat);
        element.getElementsByClassName("timestamp")[0].innerText = DurationInFormat;
    }
}
function UpdateLength() {
    if (currSongName[0].innerText.length >= 20) {
        currSongName[0].innerText = currSongName[0].innerText.substring(0, 20) + "...";
    }
    if (currSongSingerName[0].innerText.length >= 20) {
        currSongSingerName[0].innerText = currSongSingerName[0].innerText.substring(0, 20) + "...";
    }
}

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    if (songs[i].songName.length >= 20) {
        var newStr = songs[i].songName.substring(0, 20) + "...";
        element.getElementsByClassName("songName")[0].innerText = newStr;
    } else {
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    }
    getAudioDuration(`songs/${i + 1}.mp3`, element, i);
})


//handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

        audioElement.play();
        gif.style.opacity = 1;
        songItemPlay[songIndex].classList.remove('fa-circle-play');
        songItemPlay[songIndex].classList.add('fa-circle-pause');

        currSongName[0].innerText = songs[songIndex].songName;
        currSongSingerName[0].innerText = songs[songIndex].singerName;
        UpdateLength();
    }
    else {
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        audioElement.pause();
        gif.style.opacity = 0;
        songItemPlay[songIndex].classList.remove('fa-circle-pause');
        songItemPlay[songIndex].classList.add('fa-circle-play');
    }
})
//Liston to Events
audioElement.addEventListener('timeupdate', () => {
    progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

//making change in song with progressbar
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})


//making all other pauses to plays to make sure that others are not playing
const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}
// songItemPlay.forEach((element) => {
//     element.addEventListener('click', (e) => {
//         if (audioElement.paused) {
//             if (parseInt(e.target.id) == prevAudioElementID || parseInt(e.target.id) == songIndex) {
//                 e.target.classList.remove('fa-circle-play');
//                 e.target.classList.add('fa-circle-pause');
//                 audioElement.play();
//                 gif.style.opacity = 1;
//                 masterPlay.classList.remove('fa-circle-play');
//                 masterPlay.classList.add('fa-circle-pause');
//             }
//             else if (parseInt(e.target.id) != prevAudioElementID) {
//                 prevAudioElementID = songIndex;
//                 songIndex = parseInt(e.target.id);
//                 makeAllPlays();
//                 e.target.classList.remove('fa-circle-play');
//                 e.target.classList.add('fa-circle-pause');
//                 audioElement.src = `songs/${songIndex + 1}.mp3`;
//                 audioElement.play();
//                 gif.style.opacity = 1;
//                 masterPlay.classList.remove('fa-circle-play');
//                 masterPlay.classList.add('fa-circle-pause');
//             }
//         }
//         else if (!audioElement.paused) {
//             prevAudioElementID = songIndex;
//             if (parseInt(e.target.id) == prevAudioElementID || parseInt(e.target.id) == songIndex) {
//                 e.target.classList.remove("fa-circle-pause");
//                 e.target.classList.add("fa-circle-play");
//                 audioElement.pause();
//                 gif.style.opacity = 0;
//                 masterPlay.classList.remove('fa-circle-pause');
//                 masterPlay.classList.add('fa-circle-play');
//             }
//             else if (parseInt(e.target.id) != prevAudioElementID) {
//                 audioElement.pause();
//                 gif.style.opacity = 0;
//                 makeAllPlays();
//                 prevAudioElementID = songIndex;
//                 songIndex = parseInt(e.target.id);
//                 e.target.classList.remove("fa-circle-play");
//                 e.target.classList.add("fa-circle-pause");
//                 audioElement.src = `songs/${songIndex + 1}.mp3`;
//                 audioElement.play();
//                 gif.style.opacity = 1;
//                 // masterPlay.classList.remove('fa-circle-pause'); //no need to change in masterPlay icons
//                 // masterPlay.classList.add('fa-circle-play');
//                 // masterPlay.classList.remove('fa-circle-play');
//                 // masterPlay.classList.add('fa-circle-pause');
//             }
//         }
//         currSongName[0].innerText = songs[songIndex].songName;
//         currSongSingerName[0].innerText = songs[songIndex].singerName;
//         UpdateLength();

//     })
// })

songItemPlay.forEach((element) => {
    element.addEventListener('click', (e) => {
        if (audioElement.paused) {
            if (parseInt(e.target.id) == songIndex) {
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
            else if (parseInt(e.target.id) != songIndex) {
                songIndex = parseInt(e.target.id);
                makeAllPlays();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                audioElement.play();
                gif.style.opacity = 1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
        }
        else if (!audioElement.paused) {
            if (parseInt(e.target.id) == songIndex) {
                e.target.classList.remove("fa-circle-pause");
                e.target.classList.add("fa-circle-play");
                audioElement.pause();
                gif.style.opacity = 0;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
            else if (parseInt(e.target.id) != songIndex) {
                audioElement.pause();
                gif.style.opacity = 0;
                makeAllPlays();
                songIndex = parseInt(e.target.id);
                e.target.classList.remove("fa-circle-play");
                e.target.classList.add("fa-circle-pause");
                audioElement.src = `songs/${songIndex + 1}.mp3`;
                audioElement.play();
                gif.style.opacity = 1;
                // masterPlay.classList.remove('fa-circle-pause'); //no need to change in masterPlay icons
                // masterPlay.classList.add('fa-circle-play');
                // masterPlay.classList.remove('fa-circle-play');
                // masterPlay.classList.add('fa-circle-pause');
            }
        }
        currSongName[0].innerText = songs[songIndex].songName;
        currSongSingerName[0].innerText = songs[songIndex].singerName;
        UpdateLength();

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    currSongName[0].innerText = songs[songIndex].songName;
    currSongSingerName[0].innerText = songs[songIndex].singerName;
    UpdateLength();
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    songItemPlay[songIndex].classList.remove("fa-circle-play")
    songItemPlay[songIndex].classList.add('fa-circle-pause');
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9;
    }
    else {
        songIndex -= 1;
    }
    currSongName[0].innerText = songs[songIndex].songName;
    currSongSingerName[0].innerText = songs[songIndex].singerName;
    UpdateLength();
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    songItemPlay[songIndex].classList.remove("fa-circle-play")
    songItemPlay[songIndex].classList.add('fa-circle-pause');
})




