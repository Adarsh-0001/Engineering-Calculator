var buttons = document.getElementsByClassName("button");
var display = document.getElementById("display");

// display.textContent = 0;
var operand1 = 0;
var operand2 = null;
var operator = null;

function isOperator(value) {
    return value == "+" || value == "-" || value == "*" || value == "/";
}

// ... (previous JavaScript code)

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {

        var value = this.getAttribute('data-value');
        var text = display.textContent.trim();

        if (isOperator(value)) {
            operator = value;
            operand1 = parseFloat(text);
            display.textContent = "";
        } else if (value == "ac") {
            display.textContent = "";
        } else if (value == "sign") {
            operand1 = parseFloat(text);
            operand1 = -1 * operand1;
            display.textContent = operand1;
        } else if (value == ".") {
            if (text.length && !text.includes('.')) {
                display.textContent = text + '.';
            }
        } else if (value == "%") {
            operand1 = parseFloat(text);
            operand1 = operand1 / 100;
            display.textContent = operand1;
        } else if (value == "=") {
            operand2 = parseFloat(text);
            var result = evaluateResult(operand1, operator, operand2);
            if (result) {
                display.textContent = result;
                operand1 = result;
                operand2 = null;
                operator = null;
            }
        } else if (value == "backspace") {
            display.textContent = text.slice(0, -1);
        } else if (value == "sqrt") {
            operand1 = parseFloat(text);
            display.textContent = Math.sqrt(operand1);
        } else if (value == "square") {
            operand1 = parseFloat(text);
            display.textContent = Math.pow(operand1, 2);
        } else if (value == "^") {
            operator = "^";
            operand1 = parseFloat(text);
            display.textContent = "";
        } else if (value == "sin" || value == "cos" || value == "tan") {
            operator = value;
            operand1 = parseFloat(text);
            var result = evaluateResult(operand1, operator, operand2);
            if (result) {
                display.textContent = result;
                operand1 = result;
                operand2 = null;
                operator = null;
            }
        } else {
            display.textContent += value;
        }
    });
}

function evaluateResult(operand1, operator, operand2) {
    switch (operator) {
        case "^":
            return Math.pow(operand1, operand2);
        case "sin":
            return Math.sin(operand1);
        case "cos":
            return Math.cos(operand1);
        case "tan":
            return Math.tan(operand1);
        default:
            return eval(operand1 + ' ' + operator + ' ' + operand2);
    }
}
