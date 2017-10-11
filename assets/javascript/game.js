

var newGame = new Object();

var possibleWords = [['s','a','t','u','r','n'], ['j','u','p','i','t','e','r'], ['m','o','o','n'],
                     ['c','r','a','t','e','r'], ['c','o','m','e','t'], ['a','s','t','e','r','o','i','d'],
                     ['g','a','l','a','x','y'], ['g','r','a','v','i','t','y']   ];


function Game(randomWord, userWord, userLetter, prevLetters, matchingWords, turnsRemaining) {
  this.randomWord = randomWord;
  this.userWord = userWord;
  this.userLetter = userLetter;
  this.prevLetters = prevLetters;
  this.matchingWords = matchingWords;
  this.turnsRemaining = turnsRemaining;
}


window.onload = function(event) {
    var randomWord = possibleWords[Math.floor(Math.random() * possibleWords.length)];
    newGame = new Game(randomWord, makeGuessArray(randomWord), '', [], false, 10);
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
    document.getElementById('prev-letters').innerHTML = newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = newGame.turnsRemaining;
}

document.onkeyup = function(event) {
    newGame.userLetter = event.key.toLowerCase();
    document.getElementById('user-letter').innerHTML = newGame.userLetter;
    checkLetter();
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
    document.getElementById('prev-letters').innerHTML = newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = newGame.turnsRemaining;
    if (checkWin() && newGame.matchingWords) {
        document.getElementById('game-result').innerHTML = 'You won!';
        gameOver();
    }
    else if (!checkWin()) {
        document.getElementById('game-result').innerHTML = 'You lost. It was ' + newGame.randomWord.join('') + '.';
        gameOver();
    }
};

function makeGuessArray(randomWord) {
    var guessArray = [];
    for (var i = 0; i < randomWord.length; i++) {
        guessArray.push('_');
    }
    return guessArray;
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
        }
    }
    return true;
}


function gameOver() {
    document.onkeyup = null;
    newGame = new Object();
    // TODO: call main function when user is ready to start agian
    // TODO: keep track of wins and losses
}




