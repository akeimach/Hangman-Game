

var newGame = new Object();

var possibleWords = [['s','a','t','u','r','n'], ['j','u','p','i','t','e','r']];


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
    newGame = new Game(randomWord, makeGuessArray(randomWord), '', [], false, 5);
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
    document.getElementById('prev-letters').innerHTML = newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = newGame.turnsRemaining;
}

document.onkeyup = function(event) {
    getLetter();
    checkLetter();
    document.getElementById('user-word').innerHTML = newGame.userWord.join(' ');
    document.getElementById('prev-letters').innerHTML = newGame.prevLetters.join(' ');
    document.getElementById('turns-remaining').innerHTML = newGame.turnsRemaining;
    if (checkWin() && newGame.matchingWords) {
        console.log('You won!');
        return;
    }
    else if (!checkWin()) {
        console.log('You ran out of turns');
        return;
    }
};

function makeGuessArray(randomWord) {
    var guessArray = [];
    for (var i = 0; i < randomWord.length; i++) {
        guessArray.push('_');
    }
    return guessArray;
}


function getLetter() {
    newGame.userLetter = event.key.toLowerCase();
    console.log('You guessed ', newGame.userLetter);
    document.getElementById('user-letter').innerHTML = newGame.userLetter;
}

function checkLetter() {
    if (newGame.randomWord.indexOf(newGame.userLetter) !== -1) {
        // check if the letter is in the word
        for (var i = 0; i < newGame.randomWord.length; i++) {
            if (newGame.randomWord[i] === newGame.userLetter) {
                newGame.userWord[i] = newGame.userLetter;
            }
        }
        console.log(newGame.userWord);
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





