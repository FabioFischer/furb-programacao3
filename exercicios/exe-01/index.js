/*
    Alunos: Fábio Fischer, Andrey Bauler
    Programação III
    Exercício 01
*/

let buttonSelectorClass = 'body-right-col-selected';

$(document).ready(function(){
    document.getElementById('right-nav-button-01').className = buttonSelectorClass;

    $('#right-nav-button-01').click(function() {
        document.getElementById('right-nav-button-01').className = buttonSelectorClass;
        document.getElementById('right-nav-button-02').className = '';
    });
    $('#right-nav-button-02').click(function() {
        document.getElementById('right-nav-button-02').className = buttonSelectorClass;
        document.getElementById('right-nav-button-01').className = '';
    });

    $('#search-form-button').click(function() {
        let inputValue = document.getElementById("search-form-input").value;

        if (inputValue && inputValue.length > 3) {
            alert('Busca realizada com sucesso')
        } else {
            alert('preencha o campo busca')
        }
    });
});