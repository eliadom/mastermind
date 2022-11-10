// ------------------ FUNCTIONS OF index.html -----------------


var numberTries;

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

var randomValue = new Array(-1,-1,-1,-1); // secret number !!


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
	console.log(randomValue);
    numberTries = 0;
}

var currentSol = new Array(0, 0, 0, 0);
var guess = new Array();

function userGuess(){
    currentSol = [0, 0, 0, 0];
	console.log("-------------------------");
    guess = document.getElementById("try").value;
    console.log("GUESS IS:" + guess);
    compareArrays();
    console.log("CURRENT SOL:" + currentSol);
    addTry();
    if (currentSol[0] == 1 && currentSol[1] == 1 && currentSol[2] == 1 &&
        currentSol[3] == 1){
        console.log("OLEEE");
        document.getElementById("tryButton").disabled = true;
        document.getElementById("felicitats").style.visibility = "visible";
    }
}

/*
currentSol[]
if the value of the index is 1, the number is correct and in the correct position. 
if the value of the index is 2, the number is correct but in the wrong place
*/
function compareArrays(){
	let status = false;
	for(let i = 0; i < 4; i++){ //randomValue
		if(randomValue[i] == guess[i]) currentSol[i] = 1;
		else{
			for(let j = 0; j < 4 && !status; j++){
				if(randomValue[i] == guess[j]){
					currentSol[j] = 2;
					status = true;
				}
			}
		}
	}
}


function addTry(){
    var list = document.getElementById("listOfTries");
    for (var i = 0; i < 4; i++){
        var litext = document.createTextNode(currentSol[i]);
        var nouNum = document.createElement("div");
        nouNum.className = "correctPosition";
        console.log("LITEXT IS: " + litext);
        li.setAttribute('id',"tryNumber" + numberTries);
        li.appendChild(litext);
        list.appendChild(li);
    }
    numberTries = numberTries + 1;
}