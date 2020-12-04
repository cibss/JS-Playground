"use strict";

var timer;
var sec = 0;
var min = 0;
var hour = 0;
var start_btn = document.getElementById("start");
var stop_btn = document.getElementById("stop");
var reset_btn = document.getElementById("reset");
var timer_element = document.getElementById("timer");
start_btn.addEventListener("click", function () {
  timer = setInterval(TimerHandler, 1000);
  reset_btn.disabled = true;
});
stop_btn.addEventListener("click", function () {
  timer = clearInterval(timer);
  reset_btn.disabled = false;
});
reset_btn.addEventListener("click", function () {
  timer = clearInterval(timer);
  reset_btn.disabled = true;
  sec = 0;
  min = 0;
  hour = 0;
  timer_element.innerHTML = "00:00:00";
});

function TimerHandler() {
  sec++;

  if (sec == 60) {
    sec = 0;
    min++;
  }

  if (min == 60) {
    min == 0;
    hour++;
  }

  DisplayTime();
}

function DisplayTime() {
  var sec_pretty = sec;
  var min_pretty = min;
  var hour_pretty = hour;

  if (sec < 10) {
    sec_pretty = "0" + sec;
  }

  if (min < 10) {
    min_pretty = "0" + min;
  }

  if (hour < 10) {
    hour_pretty = "0" + hour;
  }

  timer_element.innerHTML = hour_pretty + ":" + min_pretty + ":" + sec_pretty;
}