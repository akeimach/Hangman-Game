

var newGame = new Object();
var stats = new Object();

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
                     ['b','l','a','c','k','-','h','o','l','e'],
                     ['c','o','s','m','i','c','-','m','i','c','r','o','w','a','v','e',
                            '-','b','a','c','k','g','r','o','u','n','d'],
                     ['d','a','r','k','-','m','a','t','t','e','r'],
                     ['s','o','l','a','r','-','s','y','s','t','e','m'],
                     ['i','n','t','e','r','s','t','e','l','l','a','r'],
                     ['s','t','a','r'],
                     ['c','o','r','o','n','a'],
                     ['m','a','g','n','e','t','o','s','p','h','e','r','e'],
                     ['s','o','l','a','r','-','e','c','l','i','p','s','e'],
                     ['l','u','n','a','r','-','e','c','l','i','p','s','e']   ];

possibleWords = [['m','e','r','c','u','r','y']];


function Game(gameInProgress, randomWord, userWord, userLetter, prevLetters, matchingWords, turnsRemaining) {
    this.gameInProgress = gameInProgress;
    this.randomWord = randomWord;
    this.userWord = userWord;
    this.userLetter = userLetter;
    this.prevLetters = prevLetters;
    this.matchingWords = matchingWords;
    this.turnsRemaining = turnsRemaining;
}


function Stats(wins, losses, level) {
    this.wins = wins;
    this.losses = losses;
    this.level = level;
}

function checkLetter() {
    if (newGame.randomWord.indexOf(newGame.userLetter) !== -1) {
        // check if the letter is in the word
        for (var i = 0; i < newGame.randomWord.length; i++) {
            if (newGame.randomWord[i] === newGame.userLetter) {
                newGame.userWord[i] = newGame.userLetter;
            }
        }
    }
    else if (newGame.prevLetters.indexOf(newGame.userLetter) === -1) {
        // letter is wrong and hasn't been guessed already
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
        for (var i = 0; i < newGame.randomWord.length; i++) {
            if (newGame.randomWord[i] !== newGame.userWord[i]) {
                valid = false;
            }
        }
        if (valid) {
            newGame.matchingWords = true;
            return true;
        }
    }
    return null;
}

function makeGuessArray() {
    var guessArray = [];
    for (var i = 0; i < newGame.randomWord.length; i++) {
        if (newGame.randomWord[i] === '-') {
            guessArray.push('-');
        }
        else {
            guessArray.push('_');
        }
    }
    return guessArray;
}

function startNewGame() {
    newGame.randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    newGame = new Game(true, newGame.randomWord, makeGuessArray(newGame.randomWord), '', [], false, 10);
    document.getElementById('show-instruction').innerHTML = 'Enter your guess: ';
    document.getElementById('user-letter').innerHTML = '___';
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
    document.getElementById('prev-letters').innerHTML = 'Letters you\'ve already guessed: ' + newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = 'Turns remaining: ' + newGame.turnsRemaining;
    document.getElementById('game-result').innerHTML = '';
}

function updateGame() {
    document.getElementById('user-letter').innerHTML = newGame.userLetter;
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
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
        console.log("YO" + possibleWords);
        alert('All levels complete! You\'re the champion!');
        document.onkeyup = null;
        document.getElementById('show-instruction').innerHTML = 'All levels complete! You\'re the champion!';
        document.getElementById('user-letter').innerHTML = '';
        document.getElementById('user-word').innerHTML = '';
        document.getElementById('prev-letters').innerHTML = '';
        document.getElementById('turns-remaining').innerHTML = '';
        document.getElementById('game-result').innerHTML = '';
        document.getElementById('score-wins').innerHTML = 'Wins: ' + stats.wins;
        document.getElementById('score-losses').innerHTML = 'Losses: ' + stats.losses;
    }
    else {
        document.getElementById('show-instruction').innerHTML = 'Press enter for next round: ';
        document.getElementById('user-letter').innerHTML = '___';
    }
}


window.onload = function(event) {
    document.getElementById('show-instruction').innerHTML = 'Press enter to start: ';
    stats = new Stats(0, 0, 1);
    document.getElementById('score-wins').innerHTML = 'Wins: ' + stats.wins;
    document.getElementById('score-losses').innerHTML = 'Losses: ' + stats.losses;
}

document.onkeyup = function(event) {
    // console.log(event); String.fromCharCode(event.keyCode).toLowerCase()
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
// TODO: mobile keyboard
// TODO: queryselector?
// TODO: add function named vs unnamed, hoisting
// TODO: use keycode for spaces in word?
// TODO: pass key function into other functions
// TODO: make levels

