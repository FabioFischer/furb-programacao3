/*
    Fábio Fischer
    Programação III
    Exercício 02
*/

window.sessionStorage.clear;

function submitLogin() {
    let userValue = document.getElementById("authentication-user-input") ? document.getElementById("authentication-user-input").value : undefined;
    let passwordValue = document.getElementById("authentication-password-input") ? document.getElementById("authentication-password-input").value : undefined;

    if (userValue && passwordValue) {
        window.sessionStorage.setItem('local-session', userValue);
        window.location.replace("./dashboard.html");
    } else {
        alert('Preencha os campos para entrar no sistema')
    }
}
