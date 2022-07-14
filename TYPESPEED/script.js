let theTimer = document.querySelector(".timer");
let textarea = document.querySelector("#test-area");
let originalText = document.querySelector("#origin-text p").innerHTML;
let textWrapper = document.querySelector(".test-wrapper");
let button = document.querySelector("#reset");
let interval;
let timerRunning = false;

var timer = [0, 0, 0, 0];


function Leadingzero(time) {
    if (time <= 9)
        time = "0" + time

    return time;
}

function runTimer() {
    let currentTime = Leadingzero(timer[0]) + ":" + Leadingzero(timer[1]) + ":" + Leadingzero(timer[2]);

    theTimer.innerHTML = currentTime;

    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor(timer[3] / 100) - (timer[0] * 60);
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function Start() {
    let letters = textarea.value.length;
    if (letters == 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

function spellcheck() {
    let textEn = textarea.value;
    let originalTextMatch = originalText.substring(0, textEn.length);

    if (textEn == originalText) 
    {
        textWrapper.style.borderColor = "green";
        clearInterval(interval);
    } 
    else 
    {
        if (textEn == originalTextMatch) {
            textWrapper.style.borderColor = "yellow";
        }
        else
        {
            textWrapper.style.borderColor = "red";
        }
    }
}

function reset(){
    clearInterval(interval);
    interval = null;
    timer = [0, 0, 0, 0];
    timerRunning = false;
    textarea.value = "";
    theTimer.innerHTML = "00:00:00";
    textWrapper.style.borderColor="grey";
}

textarea.addEventListener("keypress", Start);
textarea.addEventListener("keyup", spellcheck);
button.addEventListener("click", reset);