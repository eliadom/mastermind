// ------------------ FUNCTIONS OF index.html -----------------


var numberTries;
var solved = new Boolean(false);

function setPlayerName(){
    var player = document.getElementById("playerName");
    if (player.value != ""){
        localStorage["playerName"] = player.value;
    }
    else{
        localStorage["playerName"] = "anonymous player";
    }
    location.href = "game.html";
    generateNumber();

}

// ------------------ FUNCTIONS OF game.html -----------------

var randomValue = new Array(-1,-1,-1,-1); // secret number !!
var totalGames = 0;
var wonGames = 0;

function restartGame(){
    var list = document.getElementById("listOfTries");
    while (list.firstChild) {
        list.removeChild(list.lastChild);
    }
    generateNumber();
    var text = "Attempt number " + (numberTries+2) + ":";
    document.getElementById("endOfGame").innerHTML = text;
    document.getElementById("endOfGame").innerText = "";
    document.getElementById("squirrel1").style.visibility = "hidden";
    document.getElementById("squirrel2").style.visibility = "hidden";
    document.getElementById("tryButton").disabled = false;
    document.getElementById("playAgain").style.visibility = "hidden";
}

function generateNumber(){ //
    solved = false;
    numberTries = 0;
    document.getElementById("playAgain").style.visibility = "hidden";
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
}

var currentSol = new Array(0, 0, 0, 0);
var guess = new Array();

function userGuess(){
    var text = "Attempt number " + (numberTries+2) + ":";
    document.getElementById("attempts").innerText = text;
    guess = document.getElementById("try").value;
    if (guess.length != 4){
        window.alert("Length should be 4");
    }
    else{
            correctInput();
    }
    if (numberTries == 10 && (solved == false)){
        document.getElementById("tryButton").disabled = true;
        document.getElementById("endOfGame").innerText = "YOU RAN OUT OF TRIES!";
        document.getElementById("playAgain").style.visibility = "visible";
        totalGames++;
        document.getElementById("ratio").innerText = "You've won " + wonGames + " out of " + totalGames + " games";
    }
}

function correctInput(){
    currentSol = [0, 0, 0, 0];
    console.log("-------------------------");
    console.log("GUESS IS:" + guess);
    compareArrays();
    console.log("CURRENT SOL:" + currentSol);
    addTry();
    if (currentSol[0] == 1 && currentSol[1] == 1 && currentSol[2] == 1 &&
        currentSol[3] == 1){
        solved = true;
        wonGames++;
        totalGames++;
        document.getElementById("ratio").innerText = "You've won " + wonGames + " out of " + totalGames + " games";
        document.getElementById("tryButton").disabled = true;
        document.getElementById("endOfGame").innerText = "GOOD JOB!";
        document.getElementById("playAgain").style.visibility = "visible";
        document.getElementById("squirrel1").style.visibility = "visible";
        document.getElementById("squirrel2").style.visibility = "visible";
    }
}

/*
currentSol[]
if the value of the index is 1, the number is correct and in the correct position. 
if the value of the index is 2, the number is correct but in the wrong place
*/
function compareArrays(){
    var status;
	for(let i = 0; i < 4; i++){ //randomValue
        status = false;
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

var colorGuide = ["notPresent", "correctPosition", "incorrectPosition"];

function addTry(){
    var tryContainer = document.createElement("div");
    tryContainer.className = "wordContainer";
    tryContainer.setAttribute('id',"tryNumber" + numberTries);
    var list = document.getElementById("listOfTries");
    for (var i = 0; i < 4; i++){
        var content = document.createTextNode(guess[i]);
        var letter = document.createElement("div");
        letter.className = colorGuide[currentSol[i]];
        letter.appendChild(content);
        tryContainer.appendChild(letter);
    }
    list.appendChild(tryContainer);

    numberTries = numberTries + 1;
}
