// Define variables
var answers = ["brodhi","johnny utah", "skydiving", "reagan mask", "anthony keadis"]
var wordBeingGuessed = []
var winTotal = 0
var maxGuesses = 10
var guessesRemaining
var guessedLetters = []
var hiddenWord

// Initialize a new game
newGame()

// BACKGROUND FUNCTIONS

// begins a new game
function newGame() {
    resetGame()
    winTotal = 0
    removePicture()
    document.getElementById("poster").style.display = "inline";
}

// resets game between rounds
function resetGame() {
    guessesRemaining = maxGuesses

    hiddenWord = answers[Math.floor(Math.random() * answers.length)].toUpperCase()

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
    if (hiddenWord === answers[0].toUpperCase()) {
        document.getElementById("swayze").style.display = "inline";
    }
    else if (hiddenWord === answers[1].toUpperCase()) {
        document.getElementById("keanu").style.display = "inline";
    }
    else if (hiddenWord === answers[2].toUpperCase()) {
        document.getElementById("skydive").style.display = "inline";
    }
    else if (hiddenWord === answers[3].toUpperCase()) {
        document.getElementById("reagan").style.display = "inline";
    }
    else if (hiddenWord === answers[4].toUpperCase()) {
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

    // 5 winTotal, alert win game, start new game
    if (winTotal === 5) {
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

            // if all letters match hidden word, increase winTotal, reset game
            if (wordBeingGuessed.join("") === hiddenWord) {
                winTotal++
                removePicture()
                displayPicture()
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
            resetGame()
        }
    }

    updateDisplay()
}

// DISPLAY UPDATE FUNCTION

// IDs are assigned values with each key press
function updateDisplay () {
    document.getElementById("wins").innerText = winTotal
    document.getElementById("word").innerText = wordBeingGuessed.join("")
    document.getElementById("guesses").innerText = guessesRemaining
    document.getElementById("letters").innerText = guessedLetters.join(" ")
}