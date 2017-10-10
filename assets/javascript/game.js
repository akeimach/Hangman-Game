
var game = {
    word:['s','a','t','u','r','n','s'],
    turnsRemaining:5,
    userLetter:"",
    userWord:[],
    prevLetters:[],
    prevLettersIndex:0,
    matchingWords:false
};




while ((game.turnsRemaining > 0) && (!checkWin())) {
    getLetter();
    checkLetter();
}

if (checkWin()) {
    document.write("You won!");
}
else {
    document.write("You lost");
}



function getLetter() {
    game.userLetter = prompt('Enter your guess: ');
    game.userLetter = game.userLetter.toLowerCase();
    console.log('You guessed ', game.userLetter);
    document.write('You guessed ', game.userLetter);
}

function checkLetter() {
    if (game.prevLetters.indexOf(game.userLetter) !== -1) {
        console.log("You already guessed that letter");
        document.write("You already guessed that letter");
    }
    else if (game.word.indexOf(game.userLetter) !== -1) {
        // check if the letter is in the word
        for (var i = 0; i < game.word.length; i++) {
            if (game.word[i] === game.userLetter) {
                game.userWord[i] = game.userLetter;
            }
        }
        console.log(game.userWord);
        document.write(game.userWord);
    }
    else {
        console.log("Wrong");
        document.write("Wrong");
        game.turnsRemaining--;
    }
    game.prevLetters[(game.prevLettersIndex)] = game.userLetter;
    game.prevLettersIndex++;
}

function checkWin() {
    if (game.word.length === game.userWord.length) {
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
    return game.matchingWords;
}





