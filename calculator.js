const   display = document.querySelector("#display"),
        numbers = document.querySelectorAll(".numbers"),
        operators = document.querySelectorAll(".operators"),
        equal = document.querySelector("#equal"),
        clear = document.querySelector("#clear");
let savedNumber, actualNumber, shouldResetScreen, savedOperator;

// Eventos
numbers.forEach( button => button.addEventListener("click", () => addNumber(button.innerHTML)));
operators.forEach(button => button.addEventListener("click", () => evaluate(button.innerHTML, savedNumber, actualNumber)));
clear.addEventListener("click",clearAll);
equal.addEventListener("click",() => operation (savedOperator, savedNumber, actualNumber));

// Al precionar un numero se añade en la pantalla.
function addNumber(newNumber){
    if (shouldResetScreen || display.innerHTML == 0) resetScreen();
    display.innerHTML += `${newNumber}`;
    if(display.innerHTML.length>10){
        actualNumber = actualNumber * 10;
        display.innerHTML = actualNumber.toPrecision(8);
    } else{
        actualNumber = display.innerHTML;
    }
}

// Evalua si se han añadido dos numeros para realizar una operación entre a y b.
function evaluate(operator, a, b){
    if (!display.innerHTML && operator == "-") {
        display.innerHTML = "-";
        return;
    }
    if(actualNumber){
        if(!savedNumber){
            savedNumber = actualNumber;
            actualNumber = NaN;
            shouldResetScreen = true;
        } else {
            operation (savedOperator, a, b);
            }
        }
    if(!savedOperator) savedOperator = operator; // Guardamos el operador.
    }

function operation(operator, a, b){
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            savedNumber = add (a,b);
            result(savedNumber);
            break;
        case "-":
            if(!actualNumber){
                display.innerHTML = "-"
                break;
            }
            savedNumber = subtract (a,b);
            result(savedNumber);
            break;
        case "x":
            savedNumber = multiply (a,b);
            result(savedNumber);
            break;
        case "/":
            if (b === 0){
                alert("No se puede realizar una division entre 0, elija otro numero.");
                result(savedNumber);
                savedOperator = "/"; //mantenemos el operador.
                break;
            }
            savedNumber = divide (a,b);
            result(savedNumber);
            break;
    }
}

function result(savedNumber){
    if (savedNumber.toString().length>10) {
        savedNumber = savedNumber.toPrecision(8);
    }
    display.innerHTML = savedNumber;
    actualNumber = NaN; // borramos la variable.
    shouldResetScreen = true; // habilitamos reseto de la pantalla.
    savedOperator = null; // borramos el operador.
}

function add(a,b) {
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

// Funciones de limpieza
function clearAll(){
    display.innerHTML= null; // borro pantalla
    actualNumber= NaN; // reinicio variables.
    savedNumber = NaN;
    savedOperator = null;
    shouldResetScreen = false;
}

function resetScreen() {
    display.innerHTML="";
    shouldResetScreen = false;
}