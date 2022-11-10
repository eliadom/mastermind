// ------------------ FUNCTIONS OF index.html -----------------



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

// ------------------ FUNCTIONS OF game.html -----------------

var randomValue = new Array(-1,-1,-1,-1);

function generateNumber(){
    var currentNumber; // it's the int that is going to be generated for each number slot
    var i = 0; // index of current number being generated
    while (i < 4){ // generation loop
        let currentNumber = Math.trunc((Math.random() * 9));
        var j = 0;
        while ((j < i) && randomValue[j] != currentNumber){
            j = j + 1;
        }
        if (j == i){ // no number repeated, next one!
            randomValue[i] = currentNumber;
            i = i + 1;
        }
    }

}