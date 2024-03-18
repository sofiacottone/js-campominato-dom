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

playBtn.addEventListener('click', function () {
    // reset griglia
    mainGrid.innerHTML = '';

    // creo una variabile contenente la scelta dell'utente
    let levelValue = document.querySelector('#level').value;
    console.log('Difficulty:', levelValue);

    let numSquare;
    if (levelValue === 'Easy') {
        numSquare = 100;

    } else if (levelValue === 'Medium') {
        numSquare = 81;

    } else if (levelValue === 'Hard') {
        numSquare = 49;

    }

    // creo i div utilizzando una funzione
    for (let i = 1; i <= numSquare; i++) {
        const square = generateSquare(i, levelValue);
        square.classList.add('square', 'border', 'd-flex', 'justify-content-center', 'align-items-center');

        if (levelValue === 'Easy') {
            square.classList.add('ms-easy');

        } else if (levelValue === 'Medium') {
            square.classList.add('ms-medium');

        } else if (levelValue === 'Hard') {
            square.classList.add('ms-hard');

        }

        mainGrid.append(square);
    }
});

// square.classList.add('ms-hard')



//#region FUNCTIONS

// 1
// funzione per generare un quadrato (div) contenente un numero progressivo limitato da choice
// con un event listener per aggiungere una classe al click che cambia lo sfondo del quadrato
// number -> numero intero
// choice -> stringa per determinare la classe da inserire nel div generato
// return -> torna un elemento del DOM che rappresenta un quadrato
function generateSquare(number, choice) {

    const newSquare = document.createElement('div');

    // newSquare.classList.add(`ms-${levelValue}`.toLowerCase);
    newSquare.innerHTML = `<span>${number}</span>`;


    // gestione del click su ogni quadrato
    newSquare.addEventListener('click', function () {
        this.classList.toggle('bg-info');

        // console log del numero all'interno della cella (solo al primo click - se toggle - altrimenti togliere if)
        if (this.classList.contains('bg-info')) {
            console.log('clicked square:', number);
        }
    })

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

//#endregion FUNCTIONS