'use strict'

const buttonsContainer = document.querySelector(".buttons");
const inputDisplay = document.querySelector(".input");
const outputDisplay = document.querySelector(".output");


let equation = '';


function input() {
    buttonsContainer.addEventListener('click', (event) => {
        let target = event.target;
        switch (target.id) {
            case 'zero':
            case 'one':
            case 'two':
            case 'three':
            case 'four':
            case 'five':
            case 'six':
            case 'seven':
            case 'eight':
            case 'nine':
            case 'decimal':
            case 'plus':
            case 'minus':
            case 'divide':
            case 'multiply':
            case 'opening-bracket':
            case 'closing-bracket':
                equation += target.textContent;
                inputDisplay.textContent = equation;
                console.log(equation);
                break;
            case 'clear':
                equation = '';
                inputDisplay.textContent = equation;
                console.log(equation);
                break;
            case 'backspace':
                equation = equation.slice(0, -1);
                inputDisplay.textContent = equation;
                console.log(equation);
                break;
            case 'equal':
                /* function for calculation */
                break;
            default:
                console.error("clicked unhandled button of id:", target.id);
        }
    })
}

input()