const minutes = document.querySelector(".timerpart.minutes");
const seconds = document.querySelector(".timerpart.seconds");
const start = document.querySelector(".btn.control.start");
const pause = document.querySelector(".btn.control.pause");
const reset = document.querySelector(".btn.reset");

// const btn3 = document.querySelector(".btn.time3");
// const btn5 = document.querySelector(".btn.time5");
// const btn10 = document.querySelector(".btn.time10");
// const btn15 = document.querySelector(".btn.time15");

const lista = document.querySelector("#listanombres");
const btnrandom = document.querySelector(".btnrandom");
const btnSetminutes = document.querySelector("#btn-setminutes");

console.log(lista)
pause.hidden = true;

let startingMinutes = parseInt(minutes.textContent);
let timeSeconds = startingMinutes * 60;
let tempo;

let timeFeedback = 0;

function updateCountDown() {
    console.log("counting...")
    const minutesleft = Math.floor(timeSeconds / 60);
    let secondsLeft = timeSeconds % 60;

    minutes.textContent = minutesleft.toString().padStart(2, "0");
    seconds.textContent = secondsLeft.toString().padStart(2, "0");
    timeSeconds--;
    timeSeconds = timeSeconds < 0 ? 0 : timeSeconds;
    if (timeSeconds == timeFeedback * 60) {
        console.log("presentation time over");
        const audio = new Audio("alarm-midtime.wav");
        audio.loop = false;
        audio.play();
    }
    if (timeSeconds == 0) {
        console.log("time is 00");
        const audio = new Audio("alarm-endtime.wav");
        audio.play();
    }
}

function CountDown() {
    console.log("hola")
    if (!tempo) {
        tempo = setInterval(updateCountDown, 1000);
        start.hidden = true;
        pause.hidden = false;
    }

}

function PauseCount() {
    clearInterval(tempo);
    tempo = null;
    start.hidden = false;
    pause.hidden = true;
}

function changeTimeInit(t) {
    PauseCount();
    startingMinutes = t;
    console.log(t);
    timeSeconds = startingMinutes * 60;
    minutes.textContent = startingMinutes.toString().padStart(2, "0");
    seconds.textContent = "00";
}

function reinit() {
    PauseCount();
    minutes.textContent = startingMinutes.toString().padStart(2, "0");
    seconds.textContent = "00";
    timeSeconds = startingMinutes * 60;

}

function listarandom() {
    let listainicial = lista.value.split("\n");
    const listafinal = listainicial.sort(function () { return Math.random() - 0.5; });
    lista.value = listafinal.join("\n");
    console.table(listafinal);
    const namebuttons = document.querySelector(".namebuttons");
    const nombre = document.querySelector(".nombre");

    while (namebuttons.lastChild) {
        namebuttons.removeChild(namebuttons.lastChild);
    }
    for (let i = 0; i < listainicial.length; i++) {
        const nbutton = document.createElement("button");
        nbutton.textContent = listafinal[i];
        nbutton.classList.add("botonNombre");
        namebuttons.appendChild(nbutton);

        nbutton.addEventListener("click", function (e) {
            console.log(e.target.textContent);
            console.log(nombre);
            nombre.textContent = e.target.textContent;
        })
    }
}

start.addEventListener("click", CountDown);
pause.addEventListener("click", PauseCount);
reset.addEventListener("click", reinit)

// btn3.addEventListener("click", function () {
//     changeTimeInit(3);
// }, false);

// btn5.addEventListener("click", function () {
//     changeTimeInit(5);
// }, false);

// btn10.addEventListener("click", function () {
//     changeTimeInit(10);
// }, false);

// btn15.addEventListener("click", function () {
//     changeTimeInit(15);
// }, false);

btnrandom.addEventListener("click", listarandom);
//window.setInterval(function() {console.log("HOLA");},500)

btnSetminutes.addEventListener("click", function () {
    console.log("set");
    changeTimeInit(parseInt(document.querySelector("#setminutes-pr").value));
    timeFeedback = parseInt(document.querySelector("#setminutes-fb").value);
}, false);
