{
    let result = document.getElementById("result");
    let input = ""
    function updateView(value) {
        input += value;
        result.innerHTML = input;
    }
    function calculate() {
        try {
            const calculatedResult = eval(input)
            result.innerHTML = calculatedResult;
            input = calculatedResult;
        } catch (error) {
            result.innerHTML = "Error";
            input = "";
        }
    }
    function clearResult() {
        result.innerHTML = "0";
        input = "";
    }
}   