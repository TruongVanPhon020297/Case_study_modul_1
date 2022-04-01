// Tạo lớp Musics 
function Musics(musicId,musicPhoto,musicName,singer,music_src){
    this.musicId = musicId;
    this.musicPhoto = musicPhoto;
    this.musicName = musicName;
    this.singer = singer;
    this.music_src = music_src;
}
// Tạo mảng để lưu các đối tượng bài hát
let arr_music = [
    new Musics(1,"assets/img/erik.jpg","Chạy về khóc với anh","Erik","assets/song/erik.mp3"),
    new Musics(2,"assets/img/khacviet.jpg","Chạy về nơi phía anh","Khắc Việt","assets/song/khacviet.mp3"),
    new Musics(3,"assets/img/vang.jpg","Em là hoàng hôn","Vàng","assets/song/vang.mp3"),
    new Musics(4,"assets/img/nhuviet.jpg","Có em đây","Như Việt","assets/song/nhuviet.mp3"),
]
// Tạo biến để kiểm tra bài hát có đang phát hay không
let isPlay = true;
// Hiển thị danh sách bài hát đang có 
let htmls = arr_music.map(function(music){
    return `
        <div class="container--musiclist--song">
        <div class="container--musiclist--song--icon">
            <i class="fa-solid fa-music"></i>
        </div>
        <div class="container--musiclist--song--image">
            <img src="${music.musicPhoto}">
        </div>
        <div class="container--musiclist--song--title">
            <h5>${music.musicName}</h5>
            <p>${music.singer}</p>
        </div>
        <div class="container--musiclist--song--add" onclick = "addSong(${music.musicId})">
            <i class="fa-solid fa-plus"></i>
        </div>
        </div>
    `
});
document.querySelector(".container--musiclists--thumb").innerHTML = htmls.join("");
let musicPlaylist = [];
// Hàm thêm bài hát vào danh sách phát
function addSong(index){
    let foundSong = musicPlaylist.find(function(song){
        return song.musicId == index;
    })
    if(foundSong){
        alert("Bài hát đã có trong danh sách phát");
    }else {
        musicPlaylist.push(arr_music[index-1]);
    }
    display_playlist(musicPlaylist);
    display_playmusic(musicPlaylist);
}
// Hàm xóa bài hát khỏi danh sách phát
function remoteSong(index){
    let a ; 
    let index_delete =  musicPlaylist.forEach(function(value,inde){
         if(value.musicId == index){
             return a =  inde;
         }
     });
     musicPlaylist.splice(a,1);
     display_playlist(musicPlaylist);
     if(musicPlaylist.length > 0){
        display_playmusic(musicPlaylist);
     }else {
         document.querySelector(".container--playmusic").innerHTML = 
         `
                <img src="assets/img/music.jpg">
                <h3>No Music</h3>
                <p>No Singer</p>
                <input type="range">
                <div class="container--playmusic--icon">
                    <i class="fa-solid fa-backward"></i>
                    <a href="javascript:;" ><i class="fa-solid fa-play"></i></a>
                    <i class="fa-solid fa-forward"></i>
                </div>
         `;
     }
 }
 // Hàm hiển thị danh sách phát
function display_playlist(arr){
    let htmls_play = arr.map(function(music){
        return `
            <div class="container--musiclist--song">
                <div class="container--musiclist--song--icon">
                    <i class="fa-solid fa-music"></i>
                </div>
                <div class="container--musiclist--song--image">
                    <img src="${music.musicPhoto}">
                </div>
                <div class="container--musiclist--song--title">
                    <h5>${music.musicName}</h5>
                    <p>${music.singer}</p>
                </div>
                <div class="container--musiclist--song--add" onclick = "remoteSong(${music.musicId})">
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        `
    });
    document.querySelector(".container--musicplaylists--thumb").innerHTML = htmls_play.join("");
}
// Hàm hiển thị thông tin bài hát đầu tiên
function display_playmusic(arr){
    document.querySelector(".container--playmusic").innerHTML = 
    `   <img src="${arr[0].musicPhoto}">
        <h3>Bài hát : ${arr[0].musicName}</h3>
        <p>Ca sỹ : ${arr[0].singer}</p>
        <input type="range">
        <audio src="${arr[0].music_src}"></audio>
        <div class="container--playmusic--icon">
            <i class="fa-solid fa-backward" onclick = "changeSong(-1)"></i>
            <a href="javascript:;" onclick = "playMusic(${arr[0].musicId})" ><i class="fa-solid fa-play"></i></a>
            <i class="fa-solid fa-forward" onclick = "changeSong(1)"></i>
        </div>
    `;
}

function playMusic(index){
    if(isPlay){
        document.querySelector(".container--playmusic audio").play();
        document.querySelector(".container--playmusic--icon a").innerHTML = `<i class="fa-solid fa-pause"></i>`;
        isPlay = false;
    }else {
        document.querySelector(".container--playmusic audio").pause();
        document.querySelector(".container--playmusic--icon a").innerHTML = `<i class="fa-solid fa-play"></i>`;
        isPlay = true;
    }
}
// Tạo biến để kiểm tra chỉ số bài hát 
let indexSong = 0;
function changeSong(dir){
    if(dir == 1){
        indexSong++;
        if(indexSong >= musicPlaylist.length){
            indexSong = 0;
        }
        diplay_changeSong(indexSong);
        isPlay = true;
    }else if(dir == -1){
        indexSong--;
        if(indexSong < 0 ){
            indexSong = musicPlaylist.length - 1;
        }
        diplay_changeSong(indexSong);
        isPlay = true;
    }
    playMusic();
}
function diplay_changeSong(index){
    document.querySelector(".container--playmusic img").src = `${musicPlaylist[index].musicPhoto}`;
    document.querySelector(".container--playmusic h3").innerHTML = `Bài hát : ${musicPlaylist[index].musicName}`;
    document.querySelector(".container--playmusic p").innerHTML = `Ca sỹ : ${musicPlaylist[index].singer}`;
    document.querySelector(".container--playmusic audio").src = `${musicPlaylist[index].music_src}`;
}