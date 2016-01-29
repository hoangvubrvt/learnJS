function handleButtonClick(){
    var songInput = document.getElementById("songTextInput");
    var songName = songInput.value;
    if(songName === ""){
        alert("User not input song name");    
    }else{
        var li = document.createElement("li");
        li.innerHTML = songName;
        
        var ul = document.getElementById("playlist");
        ul.appendChild(li);
    }
    saveSong(songName);
    songInput.value="";
}

function init(){
    var addSongButton = document.getElementById("addSongButton");
    addSongButton.onclick = handleButtonClick;
    loadPlayList();
}

window.onload = init;