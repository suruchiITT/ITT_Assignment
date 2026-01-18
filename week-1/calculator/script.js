let display = document.querySelector("input[name='display']");
let buttons = document.querySelectorAll("input[type='button']");

buttons.forEach(function(btn) {
    btn.addEventListener("click", function () {
        let value = btn.value;

        if (value === "AC") {
            display.value = "";
        } 
        else if (value === "DE") {
            display.value = display.value.toString().slice(0, -1);
        } 
        else if (value === "=") {
            display.value = eval(display.value);
        } 
        else {
            display.value += value;
        }
    });
});
