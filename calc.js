// A Project by Jeffery Le

import {doEDMAS} from './modules/operations.js'
import * as say from './modules/input.js'


//DECLARATIONS AND ASSIGNMENTS
let possibleOperators = ["+", "-", "x", "÷", "^", "("]
let nonNumExceptions = [".", ")", "("]
let wipeList = ["0", "ERROR"];

let wipeable = false;

// EVENT LISTENER FOR KEYBOARD INPUT
document.addEventListener("keypress", function (event) {
  var keyC = event.keyCode;
  var inp = String.fromCharCode(keyC);
  let disp = document.getElementById("display").innerHTML
  if (event.key == "Enter" || inp == "=") {
    evalInp();
  }
  else if (inp == ")" || inp == "(") {
    brackInp(inp);
  } else if (possibleOperators.includes(inp) == true) {
    operatorInp(inp);
  } else if (inp == "X" || inp == "*") {
    operatorInp("x");
  } else if (inp == "/") {
    operatorInp("÷");
  } else if (isNaN(inp) == false || inp == ".") {
    numberInp(inp);
  } else if (event.keyCode == 127) { 
    clearDisplay();
  }
});

// EVENT LISTENER FOR BACKSPACE
window.addEventListener("keydown", function (e) {
  if (e.keyCode == 8) {
    e.preventDefault();
    backspace();
  }

});

// EVENT LISTENER FOR NUMBERS BUTTONS 
document.querySelectorAll('.number').forEach(numButt => {
  numButt.addEventListener("click", event => {
    numberInp(numButt.innerHTML);
  })
})


// EVENT LISTENER FOR OPERATORS
document.querySelectorAll('.operator').forEach(opButt => {
  opButt.addEventListener("click", event => {
    operatorInp(opButt.innerHTML);
  })
})


// EVENT LISTENER FOR BRACKETS
document.querySelectorAll('.bracket').forEach(brButt => {
  brButt.addEventListener("click", event => {
    brackInp(brButt.innerHTML);
  })
})

// EVENT LISTENER FOR EQUALS
document.querySelector('.equals').addEventListener("click", event => {
  evalInp();
})


// EVENT LISTENER FOR CLEAR
document.querySelector('.clear').addEventListener("click", event => {
  clearDisplay();
})


// EVENT LISTENER FOR BACKSPACE
document.querySelector('.backspace').addEventListener("click", event => {
  backspace();
})
