import { temples } from "../data/temples.js";
//console.log(temples)

import { url } from "../data/temples.js";
//console.log(url)

const showHere = document.querySelector("#showHere");
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myclose = document.querySelector("#mydialog button");
const myinfo = document.querySelector("#mydialog p");
myclose.addEventListener("click", () => {
    mydialog.close();
})

function displayItem(data) {
    data.forEach(item => {
        console.log(item)
        const photo = document.createElement("img")
        photo.src = `${url}${item.path}`
        photo.alt = item.name;
        photo.addEventListener("click", () => showStuff(item));

        showHere.appendChild(photo)
    });
}

function showStuff(item) {
    mytitle.textContent = item.name;
    
    mydialog.showModal();
}

displayItem(temples)