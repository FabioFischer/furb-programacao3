/*
    Fábio Fischer
    Programação III
    Exercício 02
*/

if (!window.sessionStorage.getItem('local-session')) {
    window.location.replace("./index.html");
    alert('Sua sessão não esta ativa');
}

function goBack() {
    window.sessionStorage.clear;
    window.location.replace("./index.html");
}