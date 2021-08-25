import {doEDMAS} from './operations.js'

let possibleOperators = ["+", "-", "x", "÷", "^", "(", ")"]
let nonNumExceptions = [".", ")", "("]
let wipeList = ["0", "ERROR"];


export function numberInp(num, wipeable) {
  let currDisplay = document.getElementById("display");

  //WIPES DISPLAY
  if (wipeable == true) {
    clearDisplay();
    wipeable = false;
  }

  //WIPES DISPLAY
  if (wipeList.includes(currDisplay.innerHTML) && num != ".") {
    currDisplay.innerHTML = "";
  }

  //GETS LAST CHARACTER IN THE DISPLAY
  let trimmedDisplay = currDisplay.innerHTML.replace(/\s/g, '');
  let lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

  //ADDS NUMBER TO DISPLAY
  if (!(num == "." && lastChar == ".")) {
    currDisplay.innerHTML = currDisplay.innerHTML + num;
  }
  return wipeable;
}

export function operatorInp(op, wipeable) {
  let currDisplay = document.getElementById("display");

  wipeable = false;

  //WIPES DISPLAY
  if (wipeList.includes(currDisplay.innerHTML) && op == "-") {
    currDisplay.innerHTML = "";
  }

  //GETS LAST CHARACTER
  let trimmedDisplay = currDisplay.innerHTML.replace(/\s/g, '');
  let lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

  //ADDS OPERATOR TO DISPLAY
  if ((op == "-") && ((possibleOperators.includes(lastChar) || currDisplay.innerHTML == ""))) {
    currDisplay.innerHTML = currDisplay.innerHTML + " " + op;
  } else if ((isNaN(lastChar) == false || nonNumExceptions.includes(lastChar)) && currDisplay.innerHTML != "") {
    currDisplay.innerHTML = currDisplay.innerHTML + " " + op + " ";
  }
  return wipeable;
}

export function brackInp (brack, wipeable) { 
  let currDisplay = document.getElementById("display");

    //WIPES DISPLAY
    if (wipeable == true) {
      clearDisplay();
      wipeable = false;
    }

    //WIPES DISPLAY
    if (wipeList.includes(currDisplay.innerHTML)) {
      currDisplay.innerHTML = "";
    }

    //ADDS BRACKET TO DISPLAY
    currDisplay.innerHTML = currDisplay.innerHTML + " " + brack + " ";

    return wipeable;
}

export function evalInp(wipeable) {
  let currDisplay = document.getElementById("display");

  //REMOVES EMPTY STRINGS FROM ARRAY
  let calcMemory = currDisplay.innerHTML.trim().split(" ");
  calcMemory = calcMemory.filter(function (el) {
    return el != "";
  });

  //ASSIGNMENTS 
  let brackL = 0;
  let brackR = 0;
  let i = -1;
  let errorPresent = false;
  let tempArray;

  //WHILE LOOP THAT STOPS WHEN THERE'S NO MORE BRACKETS OR ERROR
  while (calcMemory.includes("(") && (errorPresent == false)) {
    i++;
    //GETS POS OF LEFT BRACKET THAT'S CLOSEST TO A RIGHT ONE
    if (calcMemory[i] == "(") {
      brackL = i;
      //GETS POS OF FIRST RIGHT BRACKET AND DOES CALCULATIONS
    } else if (calcMemory[i] == ")") {
      brackR = i;
      //ARRAY IS CREATED TO PERFORM EDMAS ON THE VALUES INSIDE THE BRACKETS UNTIL IT'S REDUCED TO SINGLE VALUE
      tempArray = calcMemory.slice(brackL + 1, brackR);
      let deleteLength = brackR - brackL + 1
      let finVal = doEDMAS(tempArray);

      calcMemory.splice(brackL, deleteLength, finVal);

      //STARTS SEARCH FOR BRACKETS AGAINT FROM ZERO
      i = -1;
    }

    //DISPLAYS ERROR WHEN THERE'S AN INFITE LOOP
    if (i > 99) {
      errorPresent = true;
    }
  }

  //DISPLAYS FLOAT OR INTEGER
  if (doEDMAS(calcMemory).includes(".") == true) {
    currDisplay.innerHTML = parseFloat(Number(doEDMAS(calcMemory)).toFixed(9));
  } else {
    currDisplay.innerHTML = doEDMAS(calcMemory);
  }

  //IF A NON-NUMBER IS PRODUCED, ERROR IS SHOWN
  if (isNaN(currDisplay.innerHTML) == true) {
    currDisplay.innerHTML = "ERROR"
  }

  wipeable = true;
  return wipeable;
}

export function clearDisplay() {
  document.getElementById("display").innerHTML = "0";
}

export function backspace(wipeable) {
  let currDisplay = document.getElementById("display");

  //GETS LAST CHAR
  let trimmedDisplay = currDisplay.innerHTML.replace(/\s/g, '');
  let lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

  //TRIMS DISPLAY IF THERE'S A SPACE
  if (lastChar = " ") {
    currDisplay.innerHTML = currDisplay.innerHTML.trim();
  }
  //WIPES DISPLAY
  if (wipeable == true) {
    clearDisplay();
    wipeable = false;
  }

  //WIPES DISPLAY
  if (wipeList.includes(currDisplay.innerHTML)) {
    currDisplay.innerHTML = "0";
  }

  //REMOVES LAST CHARACTER
  let str = currDisplay.innerHTML 
  if (str.length == 1) {
    currDisplay.innerHTML = "0";
  } else if (possibleOperators.includes(str.charAt(str.length - 1))) {
    currDisplay.innerHTML = str.substring(0, str.length - 2);
  } else if (currDisplay.innerHTML != "0") {
    currDisplay.innerHTML = str.substring(0, str.length - 1);
  }
  return wipeable;
}


