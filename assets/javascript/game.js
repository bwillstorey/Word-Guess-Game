// Define variables
var possibleWords = ["brodhi","johnny utah", "skydiving", "reagan mask", "anthony keadis"]
var maxGuess = 10
var pauseGame = false
var guessedLetters = []
var wordBeingGuessed = []
var hiddenWord
var guessesRemaining
var wins = 0

// Initialize a new game
newGame()

// BACKGROUND FUNCTIONS

// begins a new game
function newGame() {
    resetGame()
    wins = 0
    removePicture()
    document.getElementById("poster").style.display = "inline";
}

// resets game between rounds
function resetGame() {
    guessesRemaining = maxGuess
    pauseGame = false

    hiddenWord = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
    console.log(hiddenWord)

    guessedLetters = []
    wordBeingGuessed = []

    for (var i = 0, j = hiddenWord.length; i < j; i++) {
        if (hiddenWord[i] === " ") {
            wordBeingGuessed.push(" ")
        }
        else {
            wordBeingGuessed.push("_")
        }
    }
    updateDisplay()
}

// pictures are displayed upon correct answers
function displayPicture () {
    if (hiddenWord === possibleWords[0].toUpperCase()) {
        document.getElementById("swayze").style.display = "inline";
    }
    else if (hiddenWord === possibleWords[1].toUpperCase()) {
        document.getElementById("keanu").style.display = "inline";
    }
    else if (hiddenWord === possibleWords[2].toUpperCase()) {
        document.getElementById("skydive").style.display = "inline";
    }
    else if (hiddenWord === possibleWords[3].toUpperCase()) {
        document.getElementById("reagan").style.display = "inline";
    }
    else if (hiddenWord === possibleWords[4].toUpperCase()) {
        document.getElementById("kiedis").style.display = "inline";
    }
}

// pictures are removed upon a correct answer
function removePicture () {
    document.getElementById("swayze").style.display = "none";
    document.getElementById("keanu").style.display = "none";
    document.getElementById("skydive").style.display = "none";
    document.getElementById("reagan").style.display = "none";
    document.getElementById("kiedis").style.display = "none";
    document.getElementById("poster").style.display = "none";
}


// MAIN GAME PROCESS

// start listening for key presses
document.onkeypress = function(event) {
 
    // key press must be a-z
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z]/.test(inp)) {
        checkForLetter(event.key.toUpperCase())
    }

    // 5 wins, alert win game, start new game
    if (wins === 5) {
        alert("DUUUDE...You totally WON!!!")
        newGame()
    }
}

// check hidden word for matching letter
function checkForLetter(letter) {
    var foundLetter = false
    
    // loop through word letters
    for (var i = 0, j = hiddenWord.length; i < j; i++) {

        // if matching letter, assign to guessing word array
        if (letter === hiddenWord[i]) {
            wordBeingGuessed[i] = letter
            foundLetter = true

            // if all letters match hidden word, increase wins, reset game
            if (wordBeingGuessed.join("") === hiddenWord) {
                wins++
                removePicture()
                displayPicture()
                pauseGame = true
                updateDisplay()
                resetGame()
            }
        }
    }
    // if letter doesnt match, lower guessing remaining
    if (!foundLetter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter)
            guessesRemaining--
        }

        // if guesses are 0, display the word and reset game
        if (guessesRemaining === 0) {
            wordBeingGuessed = hiddenWord.split()
            pauseGame = true
            resetGame()
        }
    }

    updateDisplay()
}

// DISPLAY UPDATE FUNCTION

// IDs are assigned values with each key press
function updateDisplay () {
    document.getElementById("wins").innerText = wins
    document.getElementById("word").innerText = wordBeingGuessed.join("")
    document.getElementById("guesses").innerText = guessesRemaining
    document.getElementById("letters").innerText = guessedLetters.join(" ")
}