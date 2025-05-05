'use strict'

const buttonsContainer = document.querySelector(".buttons");
const inputDisplay = document.querySelector(".input");
const outputDisplay = document.querySelector(".output");


let equation = '';


function cleanEquation(equation){
    equation = equation + '@';
    let cleanEquation = [];
    const singleDigitOrDecimalRegex = /^[\d.]$/;
    const singleSymbolRegex = /[+−÷×]/;
    let prev = '';
    for (let i = 0; i < equation.length; i++) {
        if (singleDigitOrDecimalRegex.test(equation[i])) {
            prev += equation[i];
        } else if (singleSymbolRegex.test(equation[i])) {
            if (prev !== '') {
                cleanEquation.push(+prev);
            }
            cleanEquation.push(equation[i]);
            prev = '';
        } else if (equation[i] === '(') {
            cleanEquation.push(equation[i]);
            prev = '';
        } else if (equation[i] === ')') {
            cleanEquation.push(+prev);
            cleanEquation.push(equation[i]);
            prev = '';
        } else if (equation[i] === '@') {
            if (prev !== '') {
                cleanEquation.push(+prev);
            }
            prev = '';
        }
    }
    return cleanEquation;
}

function postfixConversion(cleanEquation) {
    let stack = [];
    let postfix = [];
    const singleSymbolRegex = /[+−÷×]/;

    const priority = {
        '×': 2,
        '÷': 2,
        '−': 1,
        '+': 1,
        '(': 0,
        ')': 0
    }

    for (let token of cleanEquation) {

        if (typeof token === 'number') {
            postfix.push(token);
        } else if (singleSymbolRegex.test(token)) {
            let lastSymbolPriority = stack.length === 0 ? 0 : priority[stack.at(-1)];
            let currSymbolPriority = priority[token];

            if (currSymbolPriority > lastSymbolPriority) stack.push(token);
            else if (currSymbolPriority <= lastSymbolPriority) {
                while (currSymbolPriority <= lastSymbolPriority) {
                    let symbol = stack.pop();
                    postfix.push(symbol);
                    lastSymbolPriority = stack.length === 0 ? 0 : priority[stack.at(-1)];
                }
                stack.push(token);
            }
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            let symbol = stack.pop();
            while (symbol !== '(') {
                postfix.push(symbol);
                symbol = stack.pop();
            }
        } else {
            console.warn('Unexpected token in cleaned equation:', token);
        }
    }

    while (stack.length > 0) {
        let symbol = stack.pop();
        if (singleSymbolRegex.test(symbol)) {
            postfix.push(symbol);
        }
    }
    return postfix;
}

function calculate(postfixEquation) {
    const singleSymbolRegex = /[+−÷×]/;
    let stack = [];

    while (postfixEquation.length !== 0) {
        let token = postfixEquation.shift();
        if (typeof token === 'number') stack.push(token);
        else if (singleSymbolRegex.test(token)) {
            let num1 = stack.pop();
            let num2 = stack.pop();
            let result = processBinaryEquation(num1, num2, token);
            stack.push(result);
        }
    }
    return stack.pop();
}

function processBinaryEquation(num1, num2, operator){
    if (operator === '+') return num2 + num1;
    else if (operator === '−') return num2 - num1;
    else if (operator === '÷') return num2 / num1;
    else if (operator === '×') return num2 * num1;
    else console.warn('Unexpected operator: ', operator);
}


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
                break;
            case 'clear':
                equation = '';
                inputDisplay.textContent = equation;
                outputDisplay.textContent = '';
                break;
            case 'backspace':
                equation = equation.slice(0, -1);
                inputDisplay.textContent = equation;
                break;
            case 'equal':
                let cleanerEquation = cleanEquation(equation);
                let postfix = postfixConversion(cleanerEquation);
                let result = calculate(postfix);
                outputDisplay.textContent = result;
                break;
            default:
                console.error("clicked unhandled button of id:", target.id);
        }
    })
}

input();