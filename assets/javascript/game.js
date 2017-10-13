
// Declare the two objects as globals
var newGame = new Object();
var stats = new Object();
// All possible words
var possibleWords = [['m','e','r','c','u','r','y'],
                     ['v','e','n','u','s'],
                     ['e','a','r','t','h'],
                     ['p','l','a','n','e','t'],
                     ['m','a','r','s'],
                     ['j','u','p','i','t','e','r'],
                     ['s','a','t','u','r','n'],
                     ['u','r','a','n','u','s'],
                     ['n','e','p','t','u','n','e'],
                     ['p','l','u','t','o'],
                     ['c','e','r','e','s'],
                     ['m','o','o','n'], ['c','r','a','t','e','r'],
                     ['c','o','m','e','t'], ['a','s','t','e','r','o','i','d'],
                     ['g','a','l','a','x','y'], ['g','r','a','v','i','t','y'],
                     ['b','l','a','c','k',' ','h','o','l','e'],
                     ['c','o','s','m','i','c',' ','m','i','c','r','o','w','a','v','e',
                            ' ','b','a','c','k','g','r','o','u','n','d'],
                     ['d','a','r','k',' ','m','a','t','t','e','r'],
                     ['s','o','l','a','r',' ','s','y','s','t','e','m'],
                     ['i','n','t','e','r','s','t','e','l','l','a','r'],
                     ['s','t','a','r'],
                     ['c','o','r','o','n','a'],
                     ['m','a','g','n','e','t','o','s','p','h','e','r','e'],
                     ['s','o','l','a','r',' ','e','c','l','i','p','s','e'],
                     ['l','u','n','a','r',' ','e','c','l','i','p','s','e']   ];

// Constructor for new game object
function Game(gameInProgress, randomWord, userWord, userLetter, prevLetters, matchingWords, turnsRemaining) {
    this.gameInProgress = gameInProgress;
    this.randomWord = randomWord;
    this.userWord = userWord;
    this.userLetter = userLetter;
    this.prevLetters = prevLetters;
    this.matchingWords = matchingWords;
    this.turnsRemaining = turnsRemaining;
}

// Constructor for stats object
function Stats(wins, losses, level) {
    this.wins = wins;
    this.losses = losses;
    this.level = level;
}

function checkLetter() {
    // Check if user's letter is in word array
    if (newGame.randomWord.indexOf(newGame.userLetter) !== -1) {
        // Use loop to find if letter in multiple positions
        for (var i = 0; i < newGame.randomWord.length; i++) {
            if (newGame.randomWord[i] === newGame.userLetter) {
                // Update user's progress with new letter
                newGame.userWord[i] = newGame.userLetter;
            }
        }
    }
    // If letter not in word and letter has not already been guessed
    else if (newGame.prevLetters.indexOf(newGame.userLetter) === -1) {
        newGame.prevLetters.push(newGame.userLetter);
        newGame.turnsRemaining--;
    }
}

function checkWin() {
    if (newGame.turnsRemaining === 0) {
        return false;
    }
    else if (newGame.randomWord.length === newGame.userWord.length) {
        var valid = true;
        // Loop through user word and correct word to compare each letter
        for (var i = 0; i < newGame.randomWord.length; i++) {
            if (newGame.randomWord[i] !== newGame.userWord[i]) {
                // False flag if at least one mismatch
                valid = false;
            }
        }
        if (valid) {
            newGame.matchingWords = true;
            return true;
        }
    }
    // Return null if game still in play
    return null;
}

function makeProgressArray() {
    var guessArray = [];
    for (var i = 0; i < newGame.randomWord.length; i++) {
        if (newGame.randomWord[i] === ' ') {
            guessArray.push(' ');
        }
        else {
            guessArray.push('_');
        }
    }
    return guessArray;
}

function makeDisplayString() {
    var displayString = '';
    for (var i = 0; i < newGame.userWord.length; i++) {
        if (newGame.userWord[i] === ' ') {
            displayString += '&nbsp';
        }
        displayString += newGame.userWord[i] + ' ';
    }
    return displayString;
}

function startNewGame() {
    // Choose a random word from the array
    newGame.randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    newGame.userWord = makeProgressArray(newGame.randomWord);
    newGame = new Game(true, newGame.randomWord, newGame.userWord, '', [], false, 10);
    document.getElementById('show-instruction').innerHTML = 'Enter your guess: ';
    document.getElementById('user-word').innerHTML = makeDisplayString(newGame.userWord);
    document.getElementById('prev-letters').innerHTML = 'Letters you\'ve already guessed: ' + newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = 'Turns remaining: ' + newGame.turnsRemaining;
    document.getElementById('game-result').innerHTML = '';
}

function updateGame() {
    document.getElementById('user-letter').innerHTML = newGame.userLetter;
    document.getElementById('user-letter-virtual').value = '';
    document.getElementById('user-word').innerHTML = makeDisplayString(newGame.userWord);
    document.getElementById('prev-letters').innerHTML = 'Letters you\'ve already guessed: ' + newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = 'Turns remaining: ' + newGame.turnsRemaining;
}


function gameOver() {
    newGame.gameInProgress = false;
    if (newGame.matchingWords) {
        stats.wins++;
        document.getElementById('game-result').innerHTML = 'You won!';
        document.getElementById('score-wins').innerHTML = 'Wins: ' + stats.wins;
    }
    else {
        stats.losses++;
        document.getElementById('game-result').innerHTML = 'You lost. It was ' + newGame.randomWord.join('') + '.';
        document.getElementById('score-losses').innerHTML = 'Losses: ' + stats.losses;
    }
    if (possibleWords.length > 1) {
        possibleWords.splice(possibleWords.indexOf(newGame.randomWord), 1);
    }
    if (possibleWords.length === 1) {
        document.onkeyup = null;
        document.getElementById('show-instruction').innerHTML = 'All levels complete! You\'re the champion!';
        document.getElementById('user-letter').innerHTML = '';
        document.getElementById('user-letter-virtual').value = '';
        document.getElementById('score-wins').innerHTML = 'Wins: ' + stats.wins;
        document.getElementById('score-losses').innerHTML = 'Losses: ' + stats.losses;
    }
    else {
        document.getElementById('show-instruction').innerHTML = 'Press enter for next round: ';
        document.getElementById('user-letter').innerHTML = '';
        document.getElementById('user-letter-virtual').value = '';
    }
}


window.onload = function(event) {
    document.getElementById('show-instruction').innerHTML = 'Press enter to start: ';
    stats = new Stats(0, 0, 1);
    document.getElementById('score-wins').innerHTML = 'Wins: ' + stats.wins;
    document.getElementById('score-losses').innerHTML = 'Losses: ' + stats.losses;
}

document.onkeyup = function(event) {
    if (!newGame.gameInProgress) {
        if (event.key === 'Enter') {
            startNewGame();
        }
    }
    else {
        newGame.userLetter = event.key.toLowerCase();
        checkLetter();
        updateGame();
        if (checkWin() !== null) {
            gameOver();
        }
    }
};


// TODO: add function named vs unnamed, hoisting
// TODO: make levels
// TODO: consolidate progress and display functions

