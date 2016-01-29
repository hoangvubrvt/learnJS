function saveSong(item) {
    var playListArray = getPlayListArray("playlist");
    playListArray.push(item);
    localStorage.setItem("playlist", JSON.stringify(playListArray));
}

function loadPlayList() {
    var playList = getSavedSongs();
    var ul = document.getElementById("playlist");
    if (playList !== null) {
        for(var i=0; i<playList.length; i++){
            var songName = playList[i];
            var li = document.createElement("li");
            li.innerHTML = songName;
            ul.appendChild(li);
        }
    }
}

function getSavedSongs(){
    return getPlayListArray("playlist");
}

function getPlayListArray(key) {
    var playListArray = localStorage.getItem(key);
    if (playListArray === null || playListArray === "") {
        playListArray = new Array();
    } else {
        playListArray = JSON.parse(playListArray);
    }
    return playListArray;
}