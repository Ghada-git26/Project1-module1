class Game {
    constructor(petsArray) {
        this.gameArray = this.shuffleArray(petsArray);
        this.currentIndex = 0;
        this.chronometer = new Chronometer();
    }

    shuffleArray(petsArray) {
        var array = JSON.parse(JSON.stringify(petsArray));
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    //pass to the nextword
    nextWord() {
        this.currentIndex++;
        //if it still words not guessed
        if (this.currentIndex < this.gameArray.length) {
            //display the name of the animal at the currentindex
            return this.getCurrentAnimal().name;
        } else {
            return false;
        }

    }

    //check if the word guessed is the same as the name of the animal in the array at the currentindex
    checkWord(word) {
        return word.toUpperCase() == this.getCurrentAnimal().name.toUpperCase();
    }

    start(printCallback, finishCallback) {
        // to start the game, we only need to start the chronometer
        // we pass the same functions to the chronomoeter
        this.chronometer.start(printCallback, finishCallback);
    }

    // Stop the game and the chronometer
    stop() {
        this.chronometer.stop();
    }

    // return the object in the array with the currentidex 
    getCurrentAnimal() {
        return this.gameArray[this.currentIndex];
    }

    // if you still have words to guess and you still have time you can play
    canPlay() {
        return this.currentIndex < this.gameArray.length - 1 && this.chronometer.currentTime > 0;
    }
}