console.log("Welcome to spotify");
let songIndex = 0;
let audioElement = new Audio("");
let nowPlaying = document.getElementById('nowPlaying');
let myProgressBar = document.getElementById('myProgressbar');
let playButton = document.getElementsByClassName('songItemplay')
let songs = [
    { songname: "Apocalypse", filePath: "./img/Apocalypsesong.mpeg", coverPath: "./img/apocalypsecover.jpg" },
    { songname: "Sweater Weather", filePath: "./img/SweaterWeather.mpeg", coverPath: "./img/SweaterWeathercover.jpg" },
    { songname: "Chemtrails", filePath: "./img/Chemtrails.mpeg", coverPath: "./img/chemttrailcover.jpg" },
    { songname: "About You", filePath: "./img/Aboutyou.mpeg", coverPath: "./img/aboutyoucover.jpg" },
    { songname: "Reflections", filePath: "./img/reflections.mpeg", coverPath: "./img/reflectioncover.jpg" }

];

//let audioElement = new Audio('Apocalypsesong.mpeg');
//audioElement.play();

//to handle play/pause
nowPlaying.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        nowPlaying.classList.remove('fa-play');
        nowPlaying.classList.add('fa-pause');
    }
    else {
        audioElement.pause();
        nowPlaying.classList.remove('fa-pause');
        nowPlaying.classList.add('fa-play');

    }
})

audioElement.addEventListener('timeupdate', () => {
    // console.log('timeupdate');
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myProgressBar.value = progress;


});
// myProgressBar.addEventListener('change',()=>{
//     audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
// });

myProgressBar.addEventListener('input', () => {
    audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});
// addEventListener("timeupdate", (event) => { })

// ontimeupdate = (event) => { }

//to change songs
const makeAllplays = () => {

    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    });
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        // audioElement.src = './img/${index}.mpeg';
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        // document.getElementById("songTitle").innerText = songs[songIndex].songname;
        // document.getElementById("coverImg").src = songs[songIndex].coverPath;

        nowPlaying.classList.remove('fa-play');
        nowPlaying.classList.add('fa-pause');

    });
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    nowPlaying.classList.remove('fa-play');
    nowPlaying.classList.add('fa-pause');

});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    nowPlaying.classList.remove('fa-play');
    nowPlaying.classList.add('fa-pause');

});


// Fix the last block: attach listeners to each play icon
Array.from(playButton).forEach(btn => {
    btn.addEventListener('click', (e) => {
        let index = parseInt(e.target.id); // use the <i> id (0,1,2,...)

        // Case 1: If this song is already playing → pause it
        if (audioElement.src.includes(songs[index].filePath) && !audioElement.paused) {
            audioElement.pause();
            btn.classList.replace('fa-pause', 'fa-play');
            nowPlaying.classList.replace('fa-pause', 'fa-play');
        } 
        // Case 2: Otherwise → play this song
        else {
            makeAllplays(); // reset all icons
            songIndex = index;
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();

            btn.classList.replace('fa-play', 'fa-pause');
            nowPlaying.classList.replace('fa-play', 'fa-pause');
        }
    });
});
