// the assistant will make the app.js file for the calculator app.
function calculate() {
    var num1 = parseFloat(document.getElementById("num1").value);
    var num2 = parseFloat(document.getElementById("num2").value);
    var operator = document.getElementById("operator").value;
    var result;
    if (operator === "+") {
        result = num1 + num2;
    } else if (operator === "-") {

        result = num1 - num2;
    } else if (operator === "*") {
        result = num1 * num2;
    } else if (operator === "/") {
        result = num1 / num2;

    }
    document.getElementById("result").innerHTML = "Result: " + result;
}
