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
        id: 3,
        name: "Hamster",
    },

    {
        picture: "https://image.shutterstock.com/image-vector/cartoon-happy-cheetah-sitting-600w-478933588.jpg",
        id: 4,
        name: "Jaguar",
    },

    {
        picture: "https://image.freepik.com/vecteurs-libre/oie-dessin-anime-fond-blanc_194935-44.jpg",
        id: 5,
        name: "Oie",
    },

    {
        picture: "https://previews.123rf.com/images/dualororua/dualororua1606/dualororua160600083/58809834-cartoon-mignon-z%C3%A8bre-s%C3%A9ance.jpg",
        id: 6,
        name: "Zèbre",
    },


    {
        picture: "https://image.freepik.com/vecteurs-libre/cartoon-cochon-jouer-dans-flaque-boue_29190-2304.jpg",
        id: 7,
        name: "Cochon",
    },

    {
        picture: "https://lefilmcamerounais.files.wordpress.com/2016/07/les-tribulations-dune-guenon-lefilmcamerounais-3.jpg",
        id: 8,
        name: "Guenon",
    },

    {
        picture: "https://conceptdraw.com/a1691c3/p1/preview/640/pict--whale-funny-aquatic-fauna-vector-stencils-library",
        id: 9,
        name: "Baleine",
    },

    {
        picture: "https://cdn.pixabay.com/photo/2013/07/13/11/56/frog-159002_960_720.png",
        id: 10,
        name: "Frogg",
    },

    {
        picture: "https://image.freepik.com/free-vector/cute-cartoon-sloth-graphic_1324-328.jpg",
        id: 11,
        name: "Sloth",
    },

    {
        picture: "https://www.maxpixel.net/static/photo/1x/Perched-Beak-Bill-Animal-Parrot-Branch-Bird-5978099.jpg",
        id: 12,
        name: "Macaw",
    },

    {
        picture: "https://image.freepik.com/free-vector/happy-ant-cartoon_49499-58.jpg",
        id: 13,
        name: "Ants",
    },

    {
        picture: "https://cdn.pixabay.com/photo/2017/03/05/02/59/little-bear-2117566_960_720.png",
        id: 14,
        name: "Bear",
    },

]

var game = null;

//Start function
const btnStart = document.getElementById('Btn-start');

//Create new game and start it 
btnStart.onclick = function() {
    game = new Game(petsArray);

    //display pages on the right order
    const page1 = document.querySelector('.page1');
    const gamePage = document.querySelector('.Game-page');
    page1.classList.add('hidden');
    gamePage.classList.remove('hidden');
    insertWord(game.getCurrentAnimal().name);

    //the function took  2 other functions as  parameters
    // the first to diplay time, the second to handle time is up 
    game.start(printTime, gamefinished);
}

//Chronometer functions
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
    //create the letter button 
    const element = document.createElement('li');
    const btn = document.createElement('button');
    btn.classList.add('enabled');
    btn.classList.add('letterBtn');
    btn.innerHTML = letter;

    //the btn when clicked the letter should be added on the input to form the word
    btn.onclick = function() {
        const input = document.getElementById('word-guess');
        input.value += letter;
        btn.classList.remove('enabled');
        btn.classList.add('disabled');

        //btn deactivated so you can click just one time on it 
        btn.disabled = true;
        const btnLetters = document.querySelectorAll('.letterBtn');

        //check if all the letters are clicked
        if (btnLetters.length == input.value.length) {
            //check if the word guessed is correct
            if (game.checkWord(input.value)) {
                //if you still can play
                if (game.canPlay()) {
                    //display the next word
                    insertWord(game.nextWord());
                } else {
                    gamefinished();
                }
            } else {
                //reset the word and keep the hint visible
                reset(false);
            }
        }
    }
    element.appendChild(btn);
    return element;
}


//insert the letter into a list
function insertWord(word) {
    //split a word into letters, then shuffle the letters
    let split = word.split('');
    split = game.shuffleArray(split);
    const ul = document.querySelector('.letters ul');

    //Clear ul content before inserting the new letters
    ul.innerHTML = '';
    //for each letter create the element and add it to the list
    for (let i = 0; i < split.length; i++) {
        ul.appendChild(createLetterElement(split[i].toUpperCase()));
    }
    // reset the word and clearimage
    reset(true);
}


//reset function
function reset(clearImage) {
    const clearInput = document.getElementById('word-guess');
    const btnLetters = document.querySelectorAll('.letterBtn');
    //clearing the input content
    clearInput.value = '';
    //enable the buttons so you can try again
    btnLetters.forEach(btnletter => {
        btnletter.classList.add('enabled');
        btnletter.classList.remove('disabled');
        btnletter.disabled = false;
    });
    //hide the hints after reset
    if (clearImage) {
        var img = document.querySelector('.pic');
        img.src = "";
        img.style.display = "none";
    }
}
//reset on click  
const btnReset = document.getElementById('reset');
btnReset.addEventListener('click', reset);

function gamefinished() {
    game.stop();
    const finalMessage = document.querySelector('.finalMessage');
    const gamePage = document.querySelector('.Game-page');
    const winner = document.querySelector('.winner');
    const end = document.querySelector('.end');
    //if you answred more than 70%
    if ((this.game.currentIndex / game.gameArray.length) >= 0.7) {
        //display winner message
        winner.classList.remove('hidden');
    } else {
        //display try again message
        end.classList.remove('hidden');
    }
    //display the message page
    finalMessage.classList.remove('hidden');
    //hide the game page
    gamePage.classList.add('hidden');
}
//Get back to the welcome page by clicking on Home-page button
const btnHp = document.getElementById('homePage');
btnHp.onclick = function() {
    const finalMessage = document.querySelector('.finalMessage');
    const page1 = document.querySelector('.page1');
    finalMessage.classList.add('hidden');
    page1.classList.remove('hidden');
}

const audio = document.querySelector('.audio').volume = 0.1;