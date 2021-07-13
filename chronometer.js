class Chronometer {
    constructor() {
        this.currentTime = 120;
        this.intervalId = null;
    }

    start(callback) {
        this.intervalId = setInterval(() => {
            this.currentTime--;
            if (this.currentTime <= 0) {
                this.stop();
            }
            if (callback) {
                callback();
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

        this.currentTime = 0;
    }
}