// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
// Bonus:
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

const playBtn = document.querySelector('#play-btn');
const mainGrid = document.querySelector('#grid');
let userMessage = document.querySelector('#user-message');
console.log(userMessage);

playBtn.addEventListener('click', function () {
    // reset griglia
    mainGrid.innerHTML = '';
    userMessage.innerHTML = '';


    // creo una variabile contenente la scelta dell'utente
    let levelValue = document.querySelector('#level').value;
    console.log('Difficulty:', levelValue);

    // stabilisco il numero degli square in base al livello
    let squareNumber;

    if (levelValue === 'Easy') {
        squareNumber = 100;
    } else if (levelValue === 'Medium') {
        squareNumber = 81;
    } else if (levelValue === 'Hard') {
        squareNumber = 49;
    }
    console.log('Number of squares:', squareNumber);

    // punti
    let points = 0;
    // numero di bombe
    const numberOfBombs = 16;
    // tentativi massimi che può fare l'utente
    const numberOfAttempts = squareNumber - numberOfBombs;
    // dichiaro una variabile per determinare la fine del gioco
    let isGameOver = false;

    // creo un array che conterrà le 16 bombe
    const bomb = generateBombsArray(numberOfBombs, 1, squareNumber)
    console.log(bomb);

    // creo i div utilizzando una funzione
    for (let i = 1; i <= squareNumber; i++) {
        const thisNumber = i;
        const square = generateSquare(i);

        square.classList.add('square', 'border', 'd-flex', 'justify-content-center', 'align-items-center');

        if (levelValue === 'Easy') {
            square.classList.add('ms-easy');

        } else if (levelValue === 'Medium') {
            square.classList.add('ms-medium');

        } else if (levelValue === 'Hard') {
            square.classList.add('ms-hard');

        }
        // gestione click sugli square
        square.addEventListener('click', function () {
            // solo se il gico non è finito
            if (!isGameOver) {
                // per far sì che non posso cliccare due volte sullo stesso square (disattivo ogni interazione possibile su quel div)
                this.style.pointerEvents = 'none';
                // se bomba, classe 'bg-danger'
                if (bomb.includes(thisNumber)) {
                    this.classList.add('bg-danger', 'text-white');
                    // gioco finito = you lose!
                    userMessage.innerHTML = `You lose! You scored ${points} points.`;
                    console.log(userMessage);
                    isGameOver = true;
                } else {
                    // altrimenti
                    this.classList.add('bg-info');
                    ++points;

                    // se numero massimo di tentativi raggiunto = win
                    if (points === numberOfAttempts) {
                        userMessage.innerHTML = `You win! You scored ${points} points.`;
                        isGameOver = true;
                    }
                }
            }
            console.log('points:', points);


        })
        mainGrid.append(square);
    }
});




//#region FUNCTIONS

// 1
// funzione per generare un quadrato (div) contenente un numero progressivo limitato da choice
// con un event listener per aggiungere una classe al click che cambia lo sfondo del quadrato
// number -> numero intero
// return -> torna un elemento del DOM che rappresenta un quadrato
function generateSquare(number) {

    const newSquare = document.createElement('div');

    newSquare.innerHTML = `<span>${number}</span>`;

    return newSquare;

}

// 2
// Ritorna un numero random tra il minimo e il massimo (inclusi)
// min -> numero intero che rappresenta il numero minimo da cui partire per generare il numero random
// max -> numero intero che rappresenta il numero massimo da cui partire per generare il numero random
// return -> numero intero random tra il minimo e il massimo
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//3
// genera un numero random tra min e max non ancora presente nella blackList
// min -> numero minimo da generare
// max -> numero massimo da generare
// blackList -> array di numeri che sono già nella griglia
// return -> num intero valido compreso tra min e max
function getRandomUniqueNumber(min, max, blackList) {
    // parte dal presupposto che il num non sia valido
    // se il num generato random non è presente allora è valido
    // return del num valido

    let numberIsValid = false;
    let randomNumber;

    while (!numberIsValid) {

        randomNumber = getRndInteger(min, max);

        if (!blackList.includes(randomNumber)) {

            numberIsValid = true;
        }
    }
    return randomNumber;
}

// 4
// genere un array di numeri casuali
// array.length -> num intero che rappresenta la lunghezza finale dell'array
// rangeMin --> numero intero che definisce il range minimo del numero random da generare
// rangeMax --> range massimo del numero random da generare
// retunr -> array di num casuali 
function generateBombsArray(arrayLength, rangeMin, rangeMax) {
    let randomArray = [];

    // popolo l'array con un numero random solo se non esiste già e finché l'array non contiene a 16 elementi
    while (randomArray.length < arrayLength) {
        let randomBomb = getRndInteger(rangeMin, rangeMax);

        if (!randomArray.includes(randomBomb)) {
            randomArray.push(randomBomb);
        }
    }
    return randomArray;
}

//#endregion FUNCTIONS