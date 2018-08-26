/*
    Fábio Fischer
    Programação III
    Exercício 02
*/

let heroesStorageKey = 'my-heroes'
let localSessionStorageKey = 'local-session'

window.onload = function () { 
    if (!window.sessionStorage.getItem(localSessionStorageKey)) {
        alert('Sua sessão não esta ativa');
        window.location.replace("./index.html");
    } else {
        refreshResultData();
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = ", expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + ", path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
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

function onSelectMenu(menuId) {
    if (!menuId) return;

    for (let defaultMenu of ['menu-01', 'menu-02', 'menu-03', 'menu-04', 'menu-05']) {
        let element = document.getElementById(defaultMenu);

        if (defaultMenu == menuId) {
            element.className = 'top-menu-selected';
        } else {
            element.className = undefined;
        }
    }
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

function buildTableHeaders(tableBody) {
    row = document.createElement("tr");

    let cell = document.createElement("th")
    cell.appendChild(
        document.createTextNode('Nome')
    );
    row.appendChild(cell);

    cell = document.createElement("th")
    cell.appendChild(
        document.createTextNode('Genero')
    );
    row.appendChild(cell);

    cell = document.createElement("th")
    cell.appendChild(
        document.createTextNode('Idade')
    );
    row.appendChild(cell);

    cell = document.createElement("th")
    cell.appendChild(
        document.createTextNode('Poderes')
    );
    row.appendChild(cell);

    cell = document.createElement("th")
    cell.appendChild(
        document.createTextNode('História')
    );
    row.appendChild(cell);
    
    tableBody.appendChild(row);
}

function addDataRow(tableBody, data) {
    if (!data || !document.getElementsByTagName) return;

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

    if (heroes && heroes.length > 0) {
        let oldTableBody = document.getElementsByTagName("tbody").item(0);

        if (!oldTableBody) return;

        let newTableBody = document.createElement('tbody');

        buildTableHeaders(newTableBody);

        for (let hero of heroes) {
            addDataRow(newTableBody, hero);
        }
        oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody);
    }
}