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

var imputValue = new Array(-1, -1, -1, -1);

function userGuess(){
	var guess = document.getElementById("try").value;
	console.log(guess);
}

var currentSol = new Array(-1, -1, -1, -1); 
/*
currentSol[]
if the value of the index is 1, the number is correct and in the correct position. 
if the value of the index is 2, the number is correct but in the wrong place
*/
function compareArrays(){
	let status = false;
	for(let i = 0; i < 4; i++){ //randomValue
		if(randomValue[i] == imputValue[i]) currentSol[i] = 1;
		else{
			for(let j = 0; j < 4 && !status; j++){
				if(randomValue[i] == imputValue[j]){
					currentSol[j] = 2;
					status = true;
				}
			}
		}
	}
}