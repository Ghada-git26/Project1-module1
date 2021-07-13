const petsArray = [{
        picture: "https://image.freepik.com/vecteurs-libre/dessin-anime-aigle_119631-104.jpg",
        name: "Aigle",
        id: 0,
    },
    {
        picture: "https://cdn.pixabay.com/photo/2018/01/21/23/31/animal-3097792_1280.jpg",
        id: 1,
        name: "Chouette",
    },
    {
        picture: "https://image.freepik.com/free-vector/cute-deer-cartoon_33070-2549.jpg",
        id: 2,
        name: "Faon",
    },


    {
        picture: "https://data.whicdn.com/images/16522870/original.png",
        id: 2,
        name: "Hamster",
    },

    {
        picture: "https://image.shutterstock.com/image-vector/cartoon-happy-cheetah-sitting-600w-478933588.jpg",
        id: 3,
        name: "Jaguar",
    },

    {
        picture: "https://image.freepik.com/vecteurs-libre/oie-dessin-anime-fond-blanc_194935-44.jpg",
        id: 3,
        name: "Oie",
    },

    {
        picture: "https://previews.123rf.com/images/dualororua/dualororua1606/dualororua160600083/58809834-cartoon-mignon-z%C3%A8bre-s%C3%A9ance.jpg",
        id: 4,
        name: "Zèbre",
    },


    {
        picture: "https://image.freepik.com/vecteurs-libre/cartoon-cochon-jouer-dans-flaque-boue_29190-2304.jpg",
        id: 5,
        name: "Cochon",
    },

    {
        picture: "https://lefilmcamerounais.files.wordpress.com/2016/07/les-tribulations-dune-guenon-lefilmcamerounais-3.jpg",
        id: 6,
        name: "Guenon",
    },

    {
        picture: "https://conceptdraw.com/a1691c3/p1/preview/640/pict--whale-funny-aquatic-fauna-vector-stencils-library",
        id: 7,
        name: "Baleine",
    }
]


var game = null;

function printMinutes() {
    const minDecElement = document.querySelector('#minDec');
    const minUniElement = document.querySelector('#minUni');
    let minutes = game.chronometer.getMinutes();
    minDecElement.innerHTML = game.chronometer.computeTwoDigitNumber(minutes)[0];
    minUniElement.innerHTML = game.chronometer.computeTwoDigitNumber(minutes)[1];
}

function printSeconds() {
    const secDecElement = document.querySelector('#secDec');
    const secUniElement = document.querySelector('#secUni');
    let seconds = game.chronometer.getSeconds();
    secDecElement.innerHTML = game.chronometer.computeTwoDigitNumber(seconds)[0];
    secUniElement.innerHTML = game.chronometer.computeTwoDigitNumber(seconds)[1];
}

function printTime() {
    printMinutes();
    printSeconds();
}

//Start function
const btnStart = document.getElementById('Btn-start');

btnStart.onclick = function() {
    game = new Game(petsArray)
    const page1 = document.querySelector('.page1');
    const gamePage = document.querySelector('.Game-page');
    page1.classList.add('hidden');
    gamePage.classList.remove('hidden');
    insertWord(game.getCurrentAnimal().name);
    game.start(printTime, gamefinished);
}

// hint function 
const hint = document.getElementById('hint');
hint.onclick = function() {
    var sourceOfPicture = game.getCurrentAnimal().picture;
    var img = document.querySelector('.pic');
    img.src = sourceOfPicture;
    img.style.display = "block";
}

//create letterElement
function createLetterElement(letter) {
    const element = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add('enabled');
    btn.classList.add('letterBtn');
    btn.innerHTML = letter;
    btn.onclick = function() {
        const input = document.getElementById('word-guess');
        input.value += letter;
        btn.classList.remove('enabled');
        btn.classList.add('disabled');
        btn.disabled = true;
        const btnLetters = document.querySelectorAll('.letterBtn');
        if (btnLetters.length == input.value.length) {
            if (game.checkWord(input.value)) {
                if (game.canPlay()) {
                    insertWord(game.nextWord());
                } else {
                    gamefinished();
                }
            } else {
                reset(false);
            }
        }
    }
    element.appendChild(btn);
    return element;
}

function insertWord(word) {
    let split = word.split('');
    split = game.shuffleArray(split);
    const ul = document.querySelector('.letters ul');
    ul.innerHTML = '';
    const words = document.querySelector('.words');
    for (let i = 0; i < split.length; i++) {
        ul.appendChild(createLetterElement(split[i].toUpperCase()));
    }
    reset(true);
}


//reset function
function reset(clearImage) {
    const clearInput = document.getElementById('word-guess');
    const btnLetters = document.querySelectorAll('.letterBtn');
    clearInput.value = '';
    btnLetters.forEach(btnletter => {
        btnletter.classList.add('enabled');
        btnletter.classList.remove('disabled');
        btnletter.disabled = false;
    });

    if (clearImage) {
        var img = document.querySelector('.pic');
        img.src = "";
        img.style.display = "none";
    }
}

const btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

function gamefinished() {
    const winner = document.querySelector('.winner');
    const end = document.querySelector('.end');
    if ((this.game.currentIndex / game.gameArray.length) >= 0.7) {
        winner.classList.remove('hidden');
    } else {
        end.classList.remove('hidden');
    }
}