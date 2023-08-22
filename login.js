const inputCode = document.querySelector(".input-code");
const loginButton = document.querySelector(".login-btn");
const correctCode = 2333694;

loginButton.addEventListener('click', function() {
    const enteredCode = parseInt(inputCode.value.trim());
    if (enteredCode === correctCode) {
        window.location = "logged_in.html"
    } else {
        alert("Incorrect Code");
    }
});