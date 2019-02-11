// Define variable
var possibleWords = ["brodhi","johnny utah", "skydiving", "reagan mask", "anthony keadis"]
var maxGuess = 10
var pauseGame = false
var guessedLetters = []
var guessingWord = []
var wordToMatch
var numGuess
var wins = 0

resetGame()

document.onkeypress = function(event) {
 
    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z]/.test(inp)) {
        checkForLetter(event.key.toUpperCase())
    }

    if (wins > 4) {
        alert("DUUUUDDEE! You Totally Won!")
    }
    if (numGuess === 0) {
    }
}

function checkForLetter(letter) {
    var foundLetter = false
    
    for (var i = 0, j = wordToMatch.length; i < j; i++) {
        if (letter === wordToMatch[i]) {
            guessingWord[i] = letter
            foundLetter = true
            if (guessingWord.join("") === wordToMatch) {
                wins++
                displayPicture()
                pauseGame = true
                updateDisplay()
                resetGame()
            }
        }
    }

    if (!foundLetter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter)
            numGuess--
        }
        if (numGuess === 0) {
            guessingWord = wordToMatch.split()
            pauseGame = true
            resetGame()
        }
    }

    updateDisplay()
}

function resetGame() {
    numGuess = maxGuess
    pauseGame = false

    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase()
    console.log(wordToMatch)

    guessedLetters = []
    guessingWord = []

    for (var i = 0, j = wordToMatch.length; i < j; i++) {
        if (wordToMatch[i] === " ") {
            guessingWord.push(" ")
        }
        else {
            guessingWord.push("_")
        }
    }
    updateDisplay()
}

function updateDisplay () {
    document.getElementById("wins").innerText = wins
    document.getElementById("word").innerText = guessingWord.join("")
    document.getElementById("guesses").innerText = numGuess
    document.getElementById("letters").innerText = guessedLetters.join(" ")
}

function displayPicture () {
    if (wordToMatch === possibleWords[0].toUpperCase()) {
        document.getElementById("swayze").style.display = "inline";
    }
    else if (wordToMatch === possibleWords[1].toUpperCase()) {
        document.getElementById("keanu").style.display = "inline";
    }
    else if (wordToMatch === possibleWords[2].toUpperCase()) {
        document.getElementById("skydive").style.display = "inline";
    }
    else if (wordToMatch === possibleWords[3].toUpperCase()) {
        document.getElementById("reagan").style.display = "inline";
    }
    else if (wordToMatch === possibleWords[4].toUpperCase()) {
        document.getElementById("kiedis").style.display = "inline";
    }
}

function removePicture () {
    document.getElementById("swayze").style.display = "none";
    document.getElementById("keanu").style.display = "none";
    document.getElementById("skydive").style.display = "none";
    document.getElementById("reagan").style.display = "none";
    document.getElementById("kiedis").style.display = "none";
}
