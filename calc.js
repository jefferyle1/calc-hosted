// A Project by Jeffery Le

//FUNCTIONS/
function add(a, b) {
  a = Number(a);
  b = Number(b);
  return a + b;
}

function subtract(a, b) {
  a = Number(a);
  b = Number(b);
  return a - b;
}

function multiply(a, b) {
  a = Number(a);
  b = Number(b);
  return a * b;
}

function divide(a, b) {
  a = Number(a);
  b = Number(b);
  return a / b;
}

function power(a, b) {
  a = Number(a);
  b = Number(b);
  return Math.pow(a, b);
}

function doEDMAS(arr) {

  let tempValue = 0;

  //EXPONENT
  while (arr.indexOf("^") != -1) {
    let i = arr.indexOf("^");
    tempValue = operate(arr[i - 1], arr[i], arr[i + 1]);
    arr.splice(i - 1, 3, tempValue);
  }

  //DIVISION AND MULTIPLICATION
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == "x" || arr[i] == "÷") {
      tempValue = operate(arr[i - 1], arr[i], arr[i + 1]);
      arr.splice(i - 1, 3, tempValue);
      i = i - 1;
    }
  }

  //ADDITION AND SUBTRACTION
  while (arr.length != 1) {
    tempValue = operate(arr[0], arr[1], arr[2]);
    arr.splice(0, 3, tempValue);
  }

  return arr[0].toString();

}

function operate(a, operator, b) {
  return (operator == "+") ? add(a, b) :
    (operator == "-") ? subtract(a, b) :
      (operator == "x") ? multiply(a, b) :
        (operator == "÷") ? divide(a, b) :
          (operator == "^") ? power(a, b) :
            "Error";
}


//DECLARATIONS AND ASSIGNMENTS
let possibleOperators = ["+", "-", "x", "÷", "^", "("]
let nonNumExceptions = [".", ")", "("]
let wipeList = ["0", "ERROR"];

let wipeable = false;

// CODE FOR KEYBOARD INPUT
document.addEventListener("keypress", function (event) {
  var keyC = event.keyCode;
  var inp = String.fromCharCode(keyC);
  let disp = document.getElementById("display").innerHTML
  if (event.key == "Enter" || inp == "=") {
    eval();
  }
  else if (inp == ")" || inp == "(") {
    brackInp(inp);
  } else if (possibleOperators.includes(inp) == true) {
    operator(inp);
  } else if (inp == "X" || inp == "*") {
    operator("x");
  } else if (inp == "/") {
    operator("÷");
  } else if (isNaN(inp) == false || inp == ".") {
    numberInp(inp);
  } else if (event.keyCode == 127) { 
    clearDisplay();
  }
});

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

function numberInp(num) {
  currDisplay = document.getElementById("display");

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
  lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

  //ADDS NUMBER TO DISPLAY
  if (!(num == "." && lastChar == ".")) {
    currDisplay.innerHTML = currDisplay.innerHTML + num;
  }
}

function operator(op) {
  currDisplay = document.getElementById("display");

  wipeable = false;

  //WIPES DISPLAY
  if (wipeList.includes(currDisplay.innerHTML) && op == "-") {
    currDisplay.innerHTML = "";
  }

  //GETS LAST CHARACTER
  let trimmedDisplay = currDisplay.innerHTML.replace(/\s/g, '');
  lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

  //ADDS OPERATOR TO DISPLAY
  if ((op == "-") && ((possibleOperators.includes(lastChar) || currDisplay.innerHTML == ""))) {
    currDisplay.innerHTML = currDisplay.innerHTML + " " + op;
  } else if ((isNaN(lastChar) == false || nonNumExceptions.includes(lastChar)) && currDisplay.innerHTML != "") {
    currDisplay.innerHTML = currDisplay.innerHTML + " " + op + " ";
  }
}

// EVENT LISTENER FOR OPERATORS
document.querySelectorAll('.operator').forEach(opButt => {
  opButt.addEventListener("click", event => {
    operator(opButt.innerHTML);
  })
})


function brackInp (brack) { 
  currDisplay = document.getElementById("display");

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
}

// EVENT LISTENER FOR BRACKETS
document.querySelectorAll('.bracket').forEach(brButt => {
  brButt.addEventListener("click", event => {
    brackInp(brButt.innerHTML);
  })
})

// EVENT LISTENER FOR EQUALS
document.querySelector('.equals').addEventListener("click", event => {
  eval();
})

function eval() {
  currDisplay = document.getElementById("display");

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
}

function clearDisplay() {
  document.getElementById("display").innerHTML = "0";
}

// EVENT LISTENER FOR CLEAR
document.querySelector('.clear').addEventListener("click", event => {
  clearDisplay();
})


function backspace() {
  let currDisplay = document.getElementById("display");

  //GETS LAST CHAR
  let trimmedDisplay = currDisplay.innerHTML.replace(/\s/g, '');
  lastChar = trimmedDisplay.charAt(trimmedDisplay.length - 1);

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
  console.log(currDisplay.innerlength)
  if (currDisplay.innerHTML.length == 1) {
    currDisplay.innerHTML = "0";
  } else if (currDisplay.innerHTML != "0") {
    currDisplay.innerHTML = currDisplay.innerHTML.slice(0, currDisplay.innerHTML.length - 1);
  }

}

// EVENT LISTENER FOR BACKSPACE
document.querySelector('.backspace').addEventListener("click", event => {
  backspace();
})
