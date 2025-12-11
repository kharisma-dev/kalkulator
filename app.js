const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.getElementById('previous-operand');
const displayElementTextElement = document.getElementById('current-operand');

// numberButtons.forEach(button=> {
//     button.addEventListener('click',()=> {

//         const number = button.innerText;

//         if (displayElement.innerText ==='0') {
//             displayElement.innerText=number;
//         } else {
//         displayElement.innerText=displayElement.innerText + number;
//         }
//     });
// });

// allClearButton.addEventListener('click',() => {
// displayElement.innerText = '0';
// });

let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function clear() {
    currentOperand ='0';
    previousOperand= '';
    operation = undefined;
    updateDisplay();
}

function updateDisplay() {
    currentOperandTextElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandTextElement.innerText = '$ {previousOperand} ${operation}';
    } else {
        previousOperandTextElement.innerText='';
    }
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number;
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}
    
function deleteNumber() {
    currentOperand = currentOperand.toString().slice(0,-1);
    if (currentOperand === '') {
        currentOperand='0';
    }
    updateDisplay ();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
    compute();
    }

    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';

    updateDisplay();
}


function compute(){
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation){
        case '+':computation = prev + current; break;
        case '-':computation = prev - current; break;
        case '*':computation = prev * current; break;
        case '/':computation = prev / current; break;
        case '%':computation = prev % current; break; //Modulo 
        default: return;
    }

    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

allClearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
    
numberButtons.forEach(button => {
    button.addEventListener('click',()=> {
        appendNumberButton(button.innerText);
    });
});
  
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});
