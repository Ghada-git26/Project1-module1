// Chronometer calss
class Chronometer {
    constructor() {
        this.currentTime = 120;
        this.intervalId = null;
    }

    // start function of the chronometer with two callbacks used in script.js
    // first callback used to print time
    // finishedCallback is excuted when the chrnometer is elapsed
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
}