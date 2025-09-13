const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");
const getProphetData = async () => {
    try {
        const response = await fetch("https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json")
        const data = await response.json();
        //console.table(data.prophets);
        displayProphets(data.prophets);
    }
    catch (error)
    {
        console.error(error)
    }
}
getProphetData();

const displayProphets = (prophets) =>
{
    prophets.forEach((prophet) =>
    {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let Portrait = document.createElement("img");
        let dob = document.createElement("p");
        let pob = document.createElement("p");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        dob.textContent = `Date of birth: ${prophet.birthdate}`
        pob.textContent = `Place of birth ${prophet.birthplace}`
        card.setAttribute("class", "section")
        Portrait.setAttribute("src", prophet.imageurl);
        Portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        Portrait.setAttribute("loading", "lazy");
        Portrait.setAttribute("width", "340");
        Portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(pob);
        card.appendChild(Portrait);

        cards.appendChild(card);
    })
}