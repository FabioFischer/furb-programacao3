/*
    Fábio Fischer
    Programação III
    Exercício 02
*/

let heroesStorageKey = 'my-heroes'
let localSessionStorageKey = 'local-session'

if (!window.sessionStorage.getItem(localSessionStorageKey)) {
    alert('Sua sessão não esta ativa');
    window.location.replace("./index.html");
}

function Hero(name, gender, age, powers, background) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.powers = powers;
    this.background = background;
}

function goBack() {
    window.location.replace("./index.html");
}

function newHero() {
    let rawJson = window.localStorage.getItem(heroesStorageKey);
    let heroes = rawJson ? JSON.parse(rawJson) : [];

    heroes.push(
        new Hero(
            document.getElementById("hero-name") ? document.getElementById("hero-name").value : undefined,
            document.getElementById("hero-gender") ? document.getElementById("hero-gender").value : undefined,
            document.getElementById("hero-age") ? document.getElementById("hero-age").value : undefined,
            document.getElementById("hero-powers") ? document.getElementById("hero-powers").value : undefined,
            document.getElementById("hero-background") ? document.getElementById("hero-background").value : undefined
        )
    );
    window.localStorage.setItem(heroesStorageKey, JSON.stringify(heroes))
    refreshResultData();
}

function clearData() {
    tableBody = document.getElementsByTagName("tbody").item(0);

    if (!tableBody) return;

    var new_tbody = document.createElement('tbody');
    populate_with_new_rows(new_tbody);
    old_tbody.parentNode.replaceChild(new_tbody, old_tbody)
}

function addDataRow(data) {
    if (!data || !document.getElementsByTagName) return;

    tableBody = document.getElementsByTagName("tbody").item(0);
    row = document.createElement("tr");
    
    for (let key of Object.getOwnPropertyNames(new Hero())) {
        let cell = document.createElement("td"), value = data[key];
        if (!value) value = '';

        cell.appendChild(
            document.createTextNode(value)
        );
        row.appendChild(cell);
    }
    tableBody.appendChild(row);
}

function refreshResultData() {
    let rawJson = window.localStorage.getItem(heroesStorageKey);
    let heroes = rawJson ? JSON.parse(rawJson) : [];

    console.log(heroes)

    if (heroes && heroes.length > 0) {
        for (let hero of heroes) {
            addDataRow(hero);
        }
    }
}