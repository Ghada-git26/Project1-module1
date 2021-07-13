//Chronometer functions
const chronometer = new Chronometer();

function printMinutes() {
    const minDecElement = document.querySelector('#minDec');
    const minUniElement = document.querySelector('#minUni');
    let minutes = chronometer.getMinutes();
    minDecElement.innerHTML = chronometer.computeTwoDigitNumber(minutes)[0];
    minUniElement.innerHTML = chronometer.computeTwoDigitNumber(minutes)[1];
}

function printSeconds() {
    const secDecElement = document.querySelector('#secDec');
    const secUniElement = document.querySelector('#secUni');
    let seconds = chronometer.getSeconds();
    secDecElement.innerHTML = chronometer.computeTwoDigitNumber(seconds)[0];
    secUniElement.innerHTML = chronometer.computeTwoDigitNumber(seconds)[1];
}

// function printSplit() {
//     splitsElement.innerHTML += `<li> ${chronometer.split(printTime)} </li>`;
// }

// function clearSplits() {
//     splitsElement.innerHTML = '';
// }

function printTime() {
    printMinutes();
    printSeconds();


}