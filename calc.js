// A Project by Jeffery Le

import {numberInp, operatorInp, brackInp, evalInp,clearDisplay, backspace} from './modules/input.js'
 
let possibleOperators = ["+", "-", "x", "÷", "^", "("]

//DECLARATIONS AND ASSIGNMENTS

let wipeable = false;

// EVENT LISTENER FOR KEYBOARD INPUT
document.addEventListener("keypress", function (event) {
  var keyC = event.keyCode;
  var inp = String.fromCharCode(keyC);
  let disp = document.getElementById("display").innerHTML
  if (event.key == "Enter" || inp == "=") {
    wipeable= evalInp(wipeable);
  }
  else if (inp == ")" || inp == "(") {
    wipeable = brackInp(inp, wipeable);
  } else if (possibleOperators.includes(inp) == true) {
    wipeable = operatorInp(inp, wipeable);
  } else if (inp == "X" || inp == "*") {
    wipeable = operatorInp("x", wipeable);
  } else if (inp == "/") {
    wipeable = operatorInp("÷", wipeable);
  } else if (isNaN(inp) == false || inp == ".") {
    wipeable = numberInp(inp, wipeable);
  } else if (event.keyCode == 127) { 
    clearDisplay();
  }
});

// EVENT LISTENER FOR BACKSPACE
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 8) {
    e.preventDefault();
    wipeable = backspace(wipeable);
  }

});

// EVENT LISTENER FOR NUMBERS BUTTONS 
document.querySelectorAll('.number').forEach(numButt => {
  numButt.addEventListener("click", event => {
    wipeable = numberInp(numButt.innerHTML, wipeable);
  })
})


// EVENT LISTENER FOR OPERATORS
document.querySelectorAll('.operator').forEach(opButt => {
  opButt.addEventListener("click", event => {
    wipeable = operatorInp(opButt.innerHTML, wipeable);
  })
})


// EVENT LISTENER FOR BRACKETS
document.querySelectorAll('.bracket').forEach(brButt => {
  brButt.addEventListener("click", event => {
    wipeable = brackInp(brButt.innerHTML, wipeable);
  })
})

// EVENT LISTENER FOR EQUALS
document.querySelector('.equals').addEventListener("click", event => {
  wipeable = evalInp(wipeable);
})


// EVENT LISTENER FOR CLEAR
document.querySelector('.clear').addEventListener("click", event => {
  clearDisplay();
})


// EVENT LISTENER FOR BACKSPACE
document.querySelector('.backspace').addEventListener("click", event => {
  wipeable = backspace(wipeable);
})

