// pomodoro.js
// rough draft pomodoro clock in JavaScript

console.log("script link succesful!");

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

papp.body = document.getElementById("body");
papp.tohide = document.querySelectorAll(".temp");
papp.fast = document.getElementById("fast");
papp.workdown;
papp.breakdown;
papp.running = false; // if button has been pressed

// keep track of timers
papp.timers = [5, 25];

papp.delay = 1000; // default second count

papp.fast.addEventListener("click", function () {
    if (papp.delay === 1000) {
        papp.delay = 5;
        papp.fast.innerHTML = "Slow Down Time";
    }
    else
    {
        papp.delay = 1000;
        papp.fast.innerHTML = "Speed Up Time";
    }
});

var drawScreen = function () {
    papp.breaktime.innerHTML = "" + papp.timers[0] + ":00";
    papp.worktime.innerHTML = "" + papp.timers[1] + ":00";
    papp.timertext.innerHTML = "Begin Timer";
}

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
    papp.workaudio = document.getElementById("workaudio");
    papp.breakaudio = document.getElementById("breakaudio");
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
    }
        
});

var countdown = function ()
{
    if (!papp.running)
    {
        //audio.pause();
        drawScreen();
        return;
    }
    papp.breaktime.innerHTML = "";
    papp.worktime.innerHTML = "Work!";
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
        setTimeout(function () {
            revert();
        }, 500);
        papp.breakaudio.play();
        breakdown();
    }
};

var breakdown = function () {
    if (!papp.running) {
        drawScreen();
        return;
    }
    papp.breaktime.innerHTML = "Break!";
    papp.worktime.innerHTML = "";
    papp.breakdown -= 1;
    if (papp.breakdown % 10 === 0)
    {
        papp.timertext.innerHTML = "" + parse_time(papp.breakdown);    
    }
    
    //console.log(parse_time(papp.breakdown));
    if (papp.breakdown > 0) {
        setTimeout(function () {
            breakdown();
        }, papp.delay);
    }
    else {
        body.setAttribute('class', "flashy");
        setTimeout(function () {
            revert();
        }, 500);
        papp.workdown = papp.timers[1] * 60;
        papp.breakdown = papp.timers[0] * 60;
        papp.workaudio.play();
        countdown();
    }
};

var parse_time = function(total_seconds)
{
    let seconds = total_seconds % 60;
    if (seconds < 10)
    {
        seconds = "0" + seconds;
    }
    let minutes = parseInt(total_seconds / 60);
    return "" + minutes + ":" + seconds;
}

drawScreen();

var revert = function()
{
    body.removeAttribute("class", "flashy");
}