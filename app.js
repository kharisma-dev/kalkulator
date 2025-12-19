const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

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

// Fungsi untuk format angka Indonesia (titik untuk ribuan, koma untuk desimal)
function formatAngkaIndonesia(angka) {
    const parts = angka.toString().split('.');
    const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const decimalPart = parts[1] ? ',' + parts[1] : '';
    return integerPart + decimalPart;
}

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

function formatDisplayNumber(numberString) {
    if (numberString === 'Error') return 'Error';
    const stringNumber = numberString.toString();
    const [integerDigits, decimalDigits] = stringNumber.split('.');
    const integer = parseFloat(integerDigits);
    
    let formattedInteger;
    if (isNaN(integer)) {
        formattedInteger = '0';
    } else {

        formattedInteger = integer.toLocaleString('en-US');
    }
    if (decimalDigits != null) {
        return `${formattedInteger}.${decimalDigits}`;
    } else {
        return formattedInteger;
    }
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
    
    if (!isFinite(computation)) {
        currentOperand ='Error';
        operation = undefined;
        previousOperand = '';
        updateDisplay();
        return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

// Event listeners untuk tombol angka
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    });
});

// Event listeners untuk tombol operator
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        chooseOperation(button.innerText);
    });
});

allClearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
equalsButton.addEventListener('click', compute);
