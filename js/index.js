// pomodoro.js
// Pomodoro clock in vanilla JavaScript by Eric Mancini

// console.log("script link succesful!");

// store global variables in one object
var papp = {};

papp.bmin = document.getElementById("bmin");
papp.bplus = document.getElementById("bplus");
papp.breaktime = document.getElementById("breaktime");
papp.wmin = document.getElementById("wmin");
papp.wplus = document.getElementById("wplus");
papp.worktime = document.getElementById("worktime");
papp.go = document.getElementById("go");
papp.timertext = document.getElementById("timertext");
papp.container = document.getElementById("container");
papp.workbox = document.getElementById("workbox");
papp.breakbox = document.getElementById("breakbox");

papp.body = document.getElementById("body");
papp.tohide = document.querySelectorAll(".temp");
papp.fast = document.getElementById("fast");
papp.workdown;
papp.breakdown;
papp.running = false; // boolean to track if the start button has been pressed

// keep track of times set for each timer
papp.timers = [5, 15];

// default unit of time, i.e. how many miliseconds are in a second
papp.delay = 1000; 

function drawScreen() {
    papp.breaktime.innerHTML = "" + papp.timers[0] + ":00";
    papp.worktime.innerHTML = "" + papp.timers[1] + ":00";
    papp.timertext.innerHTML = "Start";
}

// toggle between normal time and fast time
papp.fast.addEventListener("click", function () {
    if (papp.delay === 1000) {
        papp.delay = 5;
        papp.fast.innerHTML = "Normal";
    }
    else
    {
        papp.delay = 1000;
        papp.fast.innerHTML = "Faster";
    }
});

papp.bmin.addEventListener("click", function () {
    if (!papp.running) {
        if (papp.timers[0] > 1) {
            papp.timers[0] -= 1;
        }
        drawScreen();
    }
});

papp.bplus.addEventListener("click", function () {
    if (!papp.running) {
        if (papp.timers[0] < 60) {
            papp.timers[0] += 1;
        }
        drawScreen();
    }
});

papp.wmin.addEventListener("click", function () {
    if (!papp.running) {
        if (papp.timers[1] > 1) {
            papp.timers[1] -= 1;
        }
        drawScreen();
    }
});

papp.wplus.addEventListener("click", function () {
    if (!papp.running) {
        if (papp.timers[1] < 60) {
            papp.timers[1] += 1;
        }
        drawScreen();
    }
});

papp.go.addEventListener("click", function () {
    // workaround for slow audio load
    // A much better workaround would be jQuery's ready function
    // this is dated / from when I was just learning about the DOM
    papp.workaudio = document.getElementById("workaudio");
    papp.breakaudio = document.getElementById("breakaudio");
    papp.breakbox.classList.remove("clearbg");
    papp.workbox.classList.remove("clearbg");
    
    //console.log("Workaudio: " + workaudio + " papp.workaudio: " + papp.workaudio);
    if (!papp.running) {
        papp.running = true;
        for (let i = 0; i < papp.tohide.length; i++)
        {
            papp.tohide[i].className = "hidden";
        }
        papp.timertext.innerHTML = "" + papp.timers[1] + ":00";
        papp.workdown = papp.timers[1] * 60;
        papp.breakdown = papp.timers[0] * 60;
        countdown();
    }
    else
    {        
        papp.running = false;
        for (let i = 0; i < papp.tohide.length; i++) {
            papp.tohide[i].className = "temp";
        }
        papp.bmin.className = "control-button";
        papp.wmin.className = "control-button";
        papp.bplus.className = "control-button";
        papp.wplus.className = "control-button";
        
    }
        
});

function countdown() {
    if (!papp.running)
    {
        //audio.pause();
        drawScreen();
        return;
    }
    papp.breaktime.innerHTML = "";
    papp.breakbox.classList.add("clearbg");
    papp.workbox.classList.remove("clearbg");    
    papp.worktime.innerHTML = "<strong>Work!</strong>";
    papp.workdown -= 1;
    papp.timertext.innerHTML = "" + parse_time(papp.workdown);    
    //console.log(parse_time(papp.workdown));
    if (papp.workdown > 0)
    {
        setTimeout(function () {
            countdown();
        }, papp.delay);
    }
    else 
    {
        body.setAttribute('class', "flashy");
        // papp.container.setAttribute ('class', "notify");
        console.log(papp.container.className);
        setTimeout(function () {
            revert();
        }, 500);
        papp.breakaudio.play();
        breakdown();
    }
};

function breakdown() {
    if (!papp.running) {
        drawScreen();
        return;
    }
    papp.workbox.classList.add("clearbg");
    papp.breakbox.classList.remove("clearbg");    
    papp.breaktime.innerHTML = "<strong>Break!</strong>";
    papp.worktime.innerHTML = "";
    papp.breakdown -= 1;
    papp.timertext.innerHTML = "" + parse_time(papp.breakdown);    
    
    //console.log(parse_time(papp.breakdown));
    if (papp.breakdown > 0) {
        setTimeout(function () {
            breakdown();
        }, papp.delay);
    }
    else {
        body.setAttribute('class', "flashy");
        // papp.container.setAttribute ('class', "notify");
        console.log(papp.container.className);
        setTimeout(function () {
            revert();
        }, 1000);

        // reset timers
        papp.workdown = papp.timers[1] * 60;
        papp.breakdown = papp.timers[0] * 60;
        papp.workaudio.play();
        countdown();
    }
};

// take a number of seconds, return a stopwatch-style string to display
function parse_time(total_seconds) {
    let seconds = total_seconds % 60;
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
    let minutes = parseInt(total_seconds / 60);
    return "" + minutes + ":" + seconds;
}

function revert () {
    body.removeAttribute("class", "flashy");
    // papp.container.removeAttribute("class", "notify");
}

// begin the app watching/running timers
drawScreen();