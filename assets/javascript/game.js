// VARIABLES

var answers = ["brodhi","johnny utah", "skydiving", "reagan mask", "anthony keadis"]
var maxGuesses = 12;
var numberGuesses
var wordToMatch 
var guessedLetters = []
var guessingWord = []
var winsCurrent = 0;


resetGame()

// event listener for key up from user
document.onkeypress = function(event) {

    // only allows a-z to be marked as a guess
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
        findLetter(event.key.toLowerCase())
    }
}

    function findLetter(letter) {
        var foundLetter = false
        // searches the hidden word for the letter pressed by user
        for (var i = 0, j = wordToMatch.length; i < j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                if (guessingWord.join("") === wordToMatch) {
                    winsCurrent++
                    screenUpdate()
                }
            }
        if (!foundLetter) {
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter)
                numberGuesses--
            }
            if (numberGuesses === 0) {
                guessingWord = wordToMatch.split()
            }
        }
    }
        screenUpdate()
    }

// Starts the game
function resetGame() {
    numberGuesses = maxGuesses;

    // reassigns hidden word with new word value
    wordToMatch = answers[Math.floor(Math.random() * answers.length)].toLowerCase()
    console.log(wordToMatch)

    // resets guessing variables
    guessedLetters = []
    guessingWord = []

    // resets word being guessed 
    for (var i = 0, j = wordToMatch.length; i < j; i++){
        if (wordToMatch[i] === " ") {
            guessingWord.push(" ")
        } else {
            guessingWord.push("-")
        }
    }
    
    screenUpdate()
}

// updates the screen when user presses keys
function screenUpdate() {
    document.getElementById("wins").innerText = winsCurrent
    document.getElementById("word").innerText = guessingWord.join("")
    document.getElementById("guesses").innerText = numberGuesses
    document.getElementById("letters").innerText =  guessedLetters.join(" ")
    }