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

function operate(a, operator, b) {
  return (operator == "+") ? add(a, b) :
    (operator == "-") ? subtract(a, b) :
      (operator == "x") ? multiply(a, b) :
        (operator == "÷") ? divide(a, b) :
          (operator == "^") ? power(a, b) :
            "Error";
}


export function doEDMAS(arr) {

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

