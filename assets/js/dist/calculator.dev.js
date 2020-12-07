"use strict";

var display = document.getElementById("display");
var buttons = document.getElementsByClassName("btn");
var operation = "";

var _loop = function _loop(i) {
  var button = buttons[i];
  button.addEventListener("click", function () {
    switch (button.classList.contains("action")) {
      case true:
        if (button.classList.contains("operator")) {
          concatOperation(button);
        } else {
          callAction(button);
        }

        break;

      case false:
        concatOperation(button);
        break;
    }
  });
};

for (var i = 0; i < buttons.length; i++) {
  _loop(i);
}

function concatOperation(button) {
  if (button.classList.contains("operator")) {
    if (!operation) {
      return;
    }
  }

  operation += button.dataset.value;
  display.innerHTML = operation;
}

function callAction(button) {
  switch (button.dataset.value) {
    case "calculate":
      operation = eval(operation).toString();
      display.innerHTML = operation;
      break;

    case "backspace":
      operation = operation.slice(0, -1);
      display.innerHTML = operation;
      break;

    case "clear":
      operation = "";
      display.innerHTML = "";
      break;
  }
}