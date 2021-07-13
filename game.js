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

var gameArray = [];
var currentIndex = 0;


//shuffled petsArray

function shuffleArray(petsArray) {
    var array = JSON.parse(JSON.stringify(petsArray));
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


//Start function
const btnStart = document.getElementById('Btn-start');

btnStart.onclick = function start() {
    const page1 = document.querySelector('.page1');
    const gamePage = document.querySelector('.Game-page');
    page1.classList.add('hidden');
    gamePage.classList.remove('hidden');
    chronometer.start(printTime);
    gameArray = shuffleArray(petsArray);
    insertWord(gameArray[currentIndex].name);
    // hint function 
    const hint = document.getElementById('hint');
    hint.onclick = function() {
        var sourceOfPicture = gameArray[currentIndex].picture;
        var img = document.querySelector('.pic')
        img.src = sourceOfPicture;
        img.style.display = "block";
    }

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
            if (input.value.toUpperCase() == gameArray[currentIndex].name.toUpperCase()) {
                gameProgress();
            } else {
                reset();

            }

        }

    }
    element.appendChild(btn);
    return element;
}

// insertWord function

function insertWord(word) {
    let split = word.split('');
    split = shuffleArray(split);
    const ul = document.querySelector('.letters ul');
    ul.innerHTML = '';
    const words = document.querySelector('.words');
    for (let i = 0; i < split.length; i++) {
        ul.appendChild(createLetterElement(split[i].toUpperCase()));
    }
    reset();
}



//reset function

function reset() {
    const clearInput = document.getElementById('word-guess');
    const btnLetters = document.querySelectorAll('.letterBtn');
    clearInput.value = '';
    btnLetters.forEach(btnletter => {
        btnletter.classList.add('enabled');
        btnletter.classList.remove('disabled');
        btnletter.disabled = false;
    });

    var img = document.querySelector('.pic');
    img.src = "";
    img.style.display = "none";
}




//second try 
function gameProgress() {
    currentIndex++;
    if (currentIndex < gameArray.length) {
        insertWord(gameArray[currentIndex].name);
    } else {
        // You won !
    }

}








//     let wordGuessed = 0;
//     for (let i = 0; i < petsArray.length; i++) {
//         if (wordD = petsArray[i]) {
//             wordGuessed += 1;
//         }

//         return wordGuessed;
//     }