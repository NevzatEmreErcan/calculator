const keys_div = document.querySelectorAll(".key");
const prevInput_div = document.querySelector(".prev-input");
const currInput_div = document.querySelector(".curr-input");

let input = "";

for (let key of keys_div) {
    const value = key.dataset.key;
    
    key.addEventListener("click", () => {
        if (value == "clear") {

            input = "";

            prevInput_div.innerHTML = "";
            currInput_div.innerHTML = "";

        } else if (value == "backspace") {

            input = input.slice(0, -1)
            currInput_div.innerHTML = cleanInput(input);

        }   else if (value == "brackets") {

            if (
                input.indexOf("(") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") < input.lastIndexOf(")")
            ) {
                input += "("
            } else if (
                input.indexOf("(") != -1 &&
                input.indexOf(")") == -1 ||
                input.indexOf("(") != -1 &&
                input.indexOf(")") != -1 &&
                input.lastIndexOf("(") > input.lastIndexOf(")")
            ) {
                input += ")"
            }
            currInput_div.innerHTML = cleanInput(input);

        }  else if (value == "=") {

            let result = eval(input);
            
            prevInput_div.innerHTML = cleanInput(input);
            currInput_div.innerHTML = result;
            input = result;

        } else {

            if (validateValue(value)) {
                input += value;
                currInput_div.innerHTML = cleanInput(input);
            }

        }
    })
}

function cleanInput(input) {
    const inputArr = input.split("");

    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i] == "*") {
            inputArr[i] = `<span class="operator"> x </span>`
        } else  if (inputArr[i] == "/") {
            inputArr[i] = `<span class="operator"> ÷ </span>`
        } else  if (inputArr[i] == "+") {
            inputArr[i] = `<span class="operator"> + </span>`
        } else  if (inputArr[i] == "-") {
            inputArr[i] = `<span class="operator"> - </span>`
        } else  if (inputArr[i] == "(") {
            inputArr[i] = `<span class="brackets">(</span>`
        } else  if (inputArr[i] == ")") {
            inputArr[i] = `<span class="brackets">)</span>`
        } else  if (inputArr[i] == "%") {
            inputArr[i] = `<span class="percent">%</span>`
        }
    }

    return inputArr.join("");
}

function validateValue(value) {
    
    lastValue = input.toString().slice(-1)
    let operators = ["+", "-", "*", "/", ""]

    if (value == "." && lastValue == ".") {
        return false;
    }

    if(operators.includes(value) && operators.includes(lastValue)) {
        return false;
    }
    return true;
}