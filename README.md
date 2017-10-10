# Hangman-Game

Pseudocode:

newGameObj()

while (gameObj.turnsRemaining > 0 || completedWord)
    get user guess
    compare user guess to valid letters
    if valid letter guessed
        add to array of empty guesses
    else
        decrement turn
