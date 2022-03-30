const minutes = document.querySelector(".timerpart.minutes");
const seconds = document.querySelector(".timerpart.seconds");
const start = document.querySelector(".btn.control.start");
const pause = document.querySelector(".btn.control.pause");
const reset = document.querySelector(".btn.reset");

const btn5 = document.querySelector(".btn.time5");
const btn10 = document.querySelector(".btn.time10");
const btn15 = document.querySelector(".btn.time15");

const lista = document.querySelector("#listanombres");
const btnrandom = document.querySelector(".btnrandom");

console.log(lista)
pause.hidden = true;

let startingMinutes = parseInt(minutes.textContent);
let timeSeconds = startingMinutes*60;
let tempo;

function updateCountDown() {
    console.log("counting...")
    const minutesleft = Math.floor(timeSeconds/60);
    let secondsLeft = timeSeconds%60;

    minutes.textContent = minutesleft.toString().padStart(2, "0");
    seconds.textContent = secondsLeft.toString().padStart(2, "0");
    timeSeconds --;
    timeSeconds = timeSeconds<0 ? 0:timeSeconds;
}

function CountDown(){
    console.log("hola")
    if(!tempo){
        tempo = setInterval(updateCountDown, 1000);
        start.hidden=true;
        pause.hidden=false;
    }
}

function PauseCount(){
    clearInterval(tempo);
    tempo = null;
    start.hidden=false;
    pause.hidden=true;
}

function changeTimeInit(t) {
    PauseCount();
    startingMinutes = t;
    console.log(t);
    timeSeconds=startingMinutes*60;
    minutes.textContent = startingMinutes.toString().padStart(2, "0");
    seconds.textContent ="00";
}

function reinit(){
    PauseCount();
    minutes.textContent = startingMinutes.toString().padStart(2, "0");
    seconds.textContent ="00";

}

function listarandom() {
    let listainicial = lista.value.split("\n");
    const listafinal = listainicial.sort(function() {return Math.random()-0.5;});
    lista.value = listafinal.join("\n");
    console.table(listafinal);
}

start.addEventListener("click", CountDown);
pause.addEventListener("click", PauseCount);
reset.addEventListener("click", reinit)

btn5.addEventListener("click",function (){
    changeTimeInit(5);
},false);

btn10.addEventListener("click",function (){
    changeTimeInit(10);
},false);

btn15.addEventListener("click",function (){
    changeTimeInit(15);
},false);

btnrandom.addEventListener("click", listarandom);
//window.setInterval(function() {console.log("HOLA");},500)

