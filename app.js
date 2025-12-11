const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const displayElement = document.getElementById('current-operand');

numberButtons.forEach(button=> {
    button.addEventListener('click',()=> {

        const number = button.innerText;

        if (displayElement.innerText ==='0') {
            displayElement.innerText=number;
        } else {
        displayElement.innerText=displayElement.innerText + number;
        }
    });
});

allClearButton.addEventListener('click',() => {
displayElement.innerText = '0';
});
