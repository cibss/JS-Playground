"use strict";

var options = document.getElementsByClassName("option");
var choices = ["rock", "paper", "scissors"];
var winState = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};
var battle_elem = document.getElementById("battle");
var reset_elem = document.getElementById("reset");
var score = 0;
var aiScore = 0;
var storage = window.localStorage;

if (storage.getItem("score")) {
  score = storage.getItem("score");
}

if (storage.getItem("aiScore")) {
  aiScore = storage.getItem("aiScore");
}

var score_elem = document.getElementById("score");
var aiScore_elem = document.getElementById("aiScore");
score_elem.innerHTML = score;
aiScore_elem.innerHTML = aiScore;

for (var i = 0; i < options.length; i++) {
  var option = options[i];
  option.addEventListener("click", function () {
    this.classList.add("selected");
    disableOptions();
    battle(this);
  });
}

function disableOptions() {
  for (var _i = 0; _i < options.length; _i++) {
    var _option = options[_i];

    if (!_option.classList.contains("selected")) {
      _option.classList.add("disabled");
    }
  }
}

function battle(option) {
  var choice = option.dataset.choice;
  var aiChoice = choices[rand(2, 0)];

  if (choice === aiChoice) {
    option.classList.add("draw");
  } else if (aiChoice === winState[choice]) {
    option.classList.add("winner");
    score++;
    storage.setItem("score", score);
    score_elem.innerHTML = score;
  } else {
    option.classList.add("loser");
    aiScore++;
    storage.setItem("aiScore", aiScore);
    aiScore_elem.innerHTML = aiScore;
  }

  displayChoices(choice, aiChoice);
}

function rand(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function displayChoices(player, ai) {
  var choice_elem = document.createElement("div");
  choice_elem.classList.add("aiChoice", ai);
  battle_elem.appendChild(choice_elem);
  reset_elem.classList.remove("hide");
}

reset_elem.addEventListener("click", reset);

function reset() {
  for (var _i2 = 0; _i2 < options.length; _i2++) {
    var _option2 = options[_i2];

    _option2.classList.remove("selected");

    _option2.classList.remove("disabled");

    _option2.classList.remove("winner");

    _option2.classList.remove("loser");

    _option2.classList.remove("draw");
  }

  battle_elem.innerHTML = "<h3>AI Choice</h3>";
  reset_elem.classList.add("hide"); // storage.removeItem("score", score);
  // storage.removeItem("aiScore", aiScore);
  // score_elem.innerHTML = "<span>0</span>";
  // aiScore_elem.innerHTML = "<span>0</span>";
}