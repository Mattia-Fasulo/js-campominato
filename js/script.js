
"use strict";


/**
 
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
 
<div class="grid">
        <div class="box">
          <span>1</span>
        </div>
      </div>
      width: calc(100% / 10);
    height: calc(100% / 10);
*/

const buttonHTML = document.getElementById('btn-play');


function play() {
    console.log('Start the game!')
    const containerGrid = document.getElementById('container-grid')
    containerGrid.innerHTML = '';
    const containerMainHTML = document.getElementById('container-esito');
    containerMainHTML.innerHTML = '';
    const levelHTML = document.getElementById('level');
    const level = levelHTML.value;
    const numBomb = 16;
    const bombs = [];
    let esito = '';
    let score = 0;

    //operatore ternario per definire il numero di box in base al livello
    const numBox = (level == 'easy') ? 100 : (level == 'normal') ? 81 : 49;


    //creo una costante con il numero massimo di tentativi
    const MAX_ATTEMP = numBox - numBomb;


    //funzione che genera la bombe posizione che avranno le bombe e le pusha in un array
    while (bombs.length < numBomb) {
        const bomb = randomNumber(1, numBox);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    console.log(bombs)

    // function that generate the boxs
    function generateBox(num) {
        const box = document.createElement('div')
        box.className = "box";
        box.style.width = `calc(100% / ${Math.sqrt(numBox)})`;
        box.style.height = `calc(100% / ${Math.sqrt(numBox)})`;
        box.innerHTML = `
            <span>${num}</span> 
        `
        box.addEventListener('click', handleClick)

        return box;
    }

    // function that generate the grid
    function generateGrid() {

        const grid = document.createElement('div');
        grid.className = "grid";
        for (let i = 1; i <= numBox; i++) {
            const box = generateBox(i);
            grid.appendChild(box);
        }

        containerGrid.appendChild(grid);
    }

    generateGrid();


    //funzione che gestisce il click sul box
    function handleClick() {

        this.removeEventListener('click', handleClick);
        const positionBox = this.querySelector('span').innerText;


        if (bombs.includes(parseInt(positionBox))) {
            this.classList.add('red')
            this.innerHTML = `
            <i class="fa-solid fa-bomb h-80 v-80"></i>
            `
            esito = 'Hai perso!'
            gameOver();
        }
        else {
            score++;
            this.classList.add('cyan')
            this.innerHTML = `
            <i class="fa-solid fa-moon h-80 v-80"></i>
            `
            //devo controllare se l'utente ha raggiunto il punteggio massimo
            if (score == MAX_ATTEMP) {
                esito = 'Hai vinto!'
                gameOver();
            }
        }

    }
    //funzione che genera il contenitore del risultato
    function createResult() {

        const result = document.createElement('div');
        result.classList.add('container-result');
        result.innerHTML = `
        <h1>Game Over</h1>
        <br>
        <h2>${esito}</h2>
        <br>
        <h3>Punteggio:</h3>
        <span>Hai trovato ${score} lune</span>
        `
        containerMainHTML.append(result);

    }


    //funzione che gestisce la fine del gioco
    function gameOver() {
        const squares = document.querySelectorAll('.box');
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', handleClick);
            let contatore = i + 1;
            if (bombs.includes(contatore)) {
                squares[i].classList.add('red');
                squares[i].innerHTML = `
                <i class="fa-solid fa-bomb h-80 v-80"></i>
                `
                // console.log(i - 1);
            }
        }

        createResult();


    }

}

buttonHTML.addEventListener('click', play)


