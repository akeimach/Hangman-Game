
var game = {
    word:['s','a','t','u','r','n','s'],
    turnsRemaining:5,
    userLetter:'',
    userWord:[],
    prevLetters:[],
    matchingWords:false
};



//game = new game();
//pick random word from array
//count indicies
//


game.userLetter = document.getElementById('user-letter');


document.onkeyup = function(event) {
    getLetter();
    checkLetter();
    game.prevLetters.push(game.userLetter);
    if (checkWin() && game.matchingWords) {
        console.log('You won!');
        return;
    }
    else if (!checkWin()) {
        console.log('You ran out of turns');
        return;
    }
};


function getLetter() {
    game.userLetter = event.key.toLowerCase();
    console.log('You guessed ', game.userLetter);
    document.getElementById('user-letter').innerHTML = game.userLetter;
}

function checkLetter() {
    if (game.prevLetters.indexOf(game.userLetter) !== -1) {
        console.log('You already guessed that letter');
    }
    else if (game.word.indexOf(game.userLetter) !== -1) {
        // check if the letter is in the word
        for (var i = 0; i < game.word.length; i++) {
            if (game.word[i] === game.userLetter) {
                game.userWord[i] = game.userLetter;
            }
        }
        console.log(game.userWord);
    }
    else {
        console.log('Wrong');
        game.turnsRemaining--;
    }
}

function checkWin() {
    if (game.turnsRemaining === 0) {
        return false;
    }
    else if (game.word.length === game.userWord.length) {
        var valid = true;
        for (var i = 0; i < game.word.length; i++) {
            if (game.word[i] !== game.userWord[i]) {
                valid = false;
            }
        }
        if (valid) {
            game.matchingWords = true;
        }
    }
    return true;
}





