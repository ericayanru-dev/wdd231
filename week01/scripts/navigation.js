const navButton = document.querySelector("#ham-btn");
const navBar = document.querySelector("#nav-bar");
const year = document.querySelector("#year")
const lastmodified = document.querySelector("#lastmodified")

navButton.addEventListener("click",() => {
    navButton.classList.toggle("show")
    navBar.classList.toggle("show")
})

year.innerHTML = new Date().getFullYear();

lastmodified.innerHTML = `Last Modified: ${document.lastModified}`;