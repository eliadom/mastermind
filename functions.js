function setPlayerName(){
    var player = document.getElementById("playerName");
    if (player.value != ""){
        localStorage["playerName"] = player.value;
    }
    else{
        localStorage["playerName"] = "anonymous player";
    }
    location.href = "game.html";
}
