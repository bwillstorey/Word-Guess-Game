// VARIABLES

var answers = ["brodhi","johnny utah", "skydiving", "reagan mask", "anthony keadis"]

var maxGuesses = 12;
var numberGuesses
var hiddenWord = []
var guessedLetters = []
var guessingWord = []
var foundLetter
var winsCurrent = 0;


function screenUpdate() {
    document.getElementById("wins").innerText = winsCurrent;
    document.getElementById("word").innerText = guessingWord.join("");
    document.getElementById("guesses").innerText = numberGuesses;
    document.getElementById("letters").innerText =  guessedLetters.join(" ");
    }

// Start game
function startGame() {
    numberGuesses = maxGuesses;
    guessingWord = answers[Math.floor(Math.random() * answers.length)].toLowerCase()
    console.log(guessingWord)

    guessedLetters = []
    guessingWord = []

    for (var i = 0, j = hiddenWord.length; i < j; i++){
        if (hiddenWord[i] === " ") {
            guessingWord.push(" ")
        } else {
            guessingWord.push("-")
        }
        screenUpdate()
    }
}

// MAIN PROCESS

startGame()

document.onkeyup = function(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
        findLetter(event.key.toLowerCase())
    }


}

function findLetter(letter) {

    for (var i = 0, j = hiddenWord.length; i < j; i++) {
        if (letter === hiddenWord[i]) {
            guessingWord[i] = letter
            foundLetter = true
            if (guessingWord.join("") === guessingWord) {
                winsCurrent++
                screenUpdate()
            }
        }
    }

    if (!foundLetter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter)
            numberGuesses--
        }
        if (maxGuesses === 0) {
            guessingWord = hiddenWord.split()
        }
    }

    screenUpdate()
}

