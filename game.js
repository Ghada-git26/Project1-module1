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

    nextWord() {
        this.currentIndex++;
        if (this.currentIndex < this.gameArray.length) {
            return this.getCurrentAnimal().name;
        } else {
            return false;
        }

    }

    checkWord(word) {
        return word.toUpperCase() == this.getCurrentAnimal().name.toUpperCase();
    }

    start(printCallback, finishCallback) {
        this.chronometer.start(printCallback, finishCallback);

    }

    getCurrentAnimal() {
        return this.gameArray[this.currentIndex];
    }

    canPlay() {
        return this.currentIndex < this.gameArray.length - 1 && this.chronometer.currentTime > 0;
    }
}