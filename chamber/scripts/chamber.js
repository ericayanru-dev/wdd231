const themeToggle = document.querySelector("#theme-toggle");
const hamBtn = document.querySelector("#ham-btn");
const nav = document.querySelector("#nav");
const grid = document.querySelector("#grid");
const list = document.querySelector("#list");
const displayInfo = document.querySelector("#display");
const year = document.querySelector("#year");
const lastmodified = document.querySelector("#lastmodified")


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode"))
    {
        themeToggle.textContent = "☀️";
    }
    else
    {
        themeToggle.textContent = "🌙";
    }
})

hamBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
    hamBtn.classList.toggle("show");
})

grid.addEventListener("click", () => {
    displayInfo.classList.add("grid");
    displayInfo.classList.remove("list");
})

list.addEventListener("click", () => {
    displayInfo.classList.add("list");
    displayInfo.classList.remove("grid");
})

async function getData() {
    const respond = await fetch("data/members.json");
    const data = await respond.json()

    displayData(data);
}

getData();

const displayData = (data) => {
    data.forEach(item => 
    {
    
        let article = document.createElement("article");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p")
        let website = document.createElement("a");
        let image = document.createElement("img");
        let level = document.createElement("p");

        article.setAttribute("class", "entry")

        name.textContent = item.name;
        address.textContent = item.address;
        phone.textContent = item.phone;
        level.textContent = `Membership Level: ${item.membershipLevel}`;
        website.textContent = `Link`;
        website.setAttribute("href", item.website);
        website.setAttribute("target", "_blank")
        image.setAttribute("src", item.image);
        image.setAttribute("alt", `Portrait of ${item.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "340");
        image.setAttribute("height", "440");

        article.append(name, address, phone, website, level, image);
        
        displayInfo.appendChild(article)
    })
}

year.textContent = new Date().getFullYear();
lastmodified.textContent = document.lastModified;
