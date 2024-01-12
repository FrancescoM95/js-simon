console.log('JS OK');
//----------------------------------
//* RECUPERO ELEMENTI DALLA PAGINA
//----------------------------------

const messageElement = document.getElementById('message');
const timerElement = document.getElementById('timer');
const form = document.getElementById('form');
const verifyButton = document.getElementById('verify');


// NUMERI CASUALI DISPLAY
const numero1 = document.getElementById('numero1');
const numero2 = document.getElementById('numero2');
const numero3 = document.getElementById('numero3');
const numero4 = document.getElementById('numero4');
const numero5 = document.getElementById('numero5');

const randomNumbers = [];

//----------------------------------
//* FUNZIONI
//----------------------------------

//FUNZIONE GENERA 5 NUMERI RANDOM E LI MOSTRA IN PAGINA
const getRandomNumber = () => {

    // Genera 5 numeri casuali da 1 a 90, tutti diversi tra loro
    while (randomNumbers.length < 5) {
        let randomNumber = Math.floor(Math.random() * 90) + 1;
        if (!randomNumbers.includes(randomNumber)) {
            randomNumbers.push(randomNumber);
        }
    }
    // Visualizza i numeri in pagina nei corrispondenti div
    for (let i = 0; i < randomNumbers.length; i++) {
        let divId = "numero" + (i + 1);
        let div = document.getElementById(divId);
        div.textContent = randomNumbers[i];
    }
}


//FUNZIONE CHE AL TERMINE DI UN COUNTDOWN NASCONDE I NUMERI E MOSTRA IL FORM

const countDown = () => {
    count = 5;
    timerElement.innerText = count;

    const timer = setInterval(() => {
        timerElement.innerText = --count;

        // Quando arriva a 0
        if (count === 0) {

            // Il countdown si ferma
            clearInterval(timer);

            // Cambia il messaggio
            messageElement.innerText = 'Scrivi i numeri che ricordi e scopri quanti ne riesci a indovinare!'

            // Scompaiono i numeri da memorizzare
            for (let i = 1; i <= 5; i++) {
                let divId = "numero" + (i);
                let div = document.getElementById(divId);
                div.classList.add('d-none');

                // Appare il form per inserire i numeri
                let inputId = "number" + (i);
                let input = document.getElementById(inputId);
                input.classList.remove('d-none');
                verifyButton.classList.remove('d-none');
            }
        }
    }, 1000);
}


//----------------------------------
//* AVVIO PAGINA
//----------------------------------


//Invoco funzione che genera i 5 numeri casuali
getRandomNumber();
console.log(randomNumbers);

// Invoco funzione che avvia countdown
countDown();

// All'invio del form raccolgo i numeri inseriti dall'utente
form.addEventListener('submit', (e) => {
    e.preventDefault();
    verifyButton.disabled = true;

    let number1 = parseInt(document.getElementById('number1').value);
    let number2 = parseInt(document.getElementById('number2').value);
    let number3 = parseInt(document.getElementById('number3').value);
    let number4 = parseInt(document.getElementById('number4').value);
    let number5 = parseInt(document.getElementById('number5').value);
    userNumbers = [number1, number2, number3, number4, number5];
    console.log(userNumbers);

    // Verifico quanti e quali numeri inseriti dall'utente sono presenti tra i numeri casuali
    let score = 0;
    correctNumbers = [];

    // Per ogni numero indovinato viene incrementato il punteggio e aggiunto il numero nella lista dei numeri indovinati
    for (let i = 0; i < randomNumbers.length; i++) {
        if (randomNumbers.includes(userNumbers[i])) {
            score++;
            correctNumbers.push(userNumbers[i]);
        }
    }

    // Aggiungo un separatore
    let numeriCorretti = correctNumbers.join(', ');

    // Mostro un messaggio in pagina con i risultati
    if (correctNumbers.length === 0) {           // 0 numeri corretti
        messageElement.innerText = `Che peccato! Non hai indovinato nemmeno un numero...`
    } else if (correctNumbers.length === 1) {    // 1 numero corretto
        messageElement.innerText = `Hai indovinato solo un numero: ${numeriCorretti}.`
    } else if (correctNumbers.length === 5) {    // Tutti i 5 numeri corretti
        messageElement.innerText = `Complimenti! Hai indovinato tutti i numeri: ${numeriCorretti}.`
    } else {                                     // Da 2 a 4 numeri corretti
        messageElement.innerText = `Hai indovinato ${score} numeri: ${numeriCorretti}.`
    };

    // Riappaiono i numeri random e vengono disabilitati i campi input
    for (let i = 1; i <= 5; i++) {
        let divId = "numero" + (i);
        let div = document.getElementById(divId);
        div.classList.remove('d-none');

        let inputId = "number" + (i);
        let input = document.getElementById(inputId);
        input.disabled = true;
    };
})




