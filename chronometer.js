class Chronometer {
    constructor() {
        this.currentTime = 120;
        this.intervalId = null;
    }

    start(printCallback, finishCallback) {
        this.intervalId = setInterval(() => {
            this.currentTime--;
            if (this.currentTime <= 0) {
                this.stop();
                if (finishCallback) {
                    finishCallback();
                }
            }
            if (printCallback) {
                printCallback();
            }
        }, 1000);
    }


    getMinutes() {

        let numbermin = this.currentTime / 60;
        return ~~numbermin;

    }

    getSeconds() {
        let numbersec = (this.currentTime % 60);
        return ~~numbersec;
    }
    computeTwoDigitNumber(value) {

        return value.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    }

    stop() {

        clearInterval(this.intervalId);
    }

    reset() {
        gamefinished();
        this.currentTime = 0;
    }
}