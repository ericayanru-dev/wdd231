
const themeToggle = document.querySelector("#theme-toggle");
const hamBtn = document.querySelector("#ham-btn");
const nav = document.querySelector("#nav");
const grid = document.querySelector("#grid");
const list = document.querySelector("#list");
const displayInfo = document.querySelector("#display");
const year = document.querySelector("#year");
const lastmodified = document.querySelector("#lastmodified")


if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
        }
        else {
            themeToggle.textContent = "🌙";
        }
    })
}

if (hamBtn) {
    hamBtn.addEventListener("click", () => {
        nav.classList.toggle("show");
        hamBtn.classList.toggle("show");
    })
}

if (grid) {
    grid.addEventListener("click", () => {
        displayInfo.classList.add("grid");
        displayInfo.classList.remove("list");
    })
}

if (list) {
    list.addEventListener("click", () => {
        displayInfo.classList.add("list");
        displayInfo.classList.remove("grid");
    })
}

async function getData() {
    const respond = await fetch("data/members.json");
    const data = await respond.json()

    displayData(data);
}

if (displayInfo) { getData(); }

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


const currentWeather = document.querySelector("#current-weather");
const weatherForecast = document.querySelector("#weather-forecast");
const advertisementCards = document.querySelector("#advertisement-cards");

async function openWeather() {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=49.77&lon=6.63&units=imperial&appid=4f53f7c5a95d5a43840fed0e2a1c880a")
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        }
        else {
            throw Error(await response.text());
        }
        const forecastRes = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=49.77&lon=6.63&units=imperial&appid=4f53f7c5a95d5a43840fed0e2a1c880a");
        if (forecastRes.ok) {
            const forecastData = await forecastRes.json();
            displayForecast(forecastData);
        }
    }
    catch (error) {
        console.log(error)
    }
}
openWeather();



const displayWeather = (data) =>{
    let image = document.createElement("img");
    let aside = document.createElement("aside");
    let temperature = document.createElement("p");
    let description = document.createElement("p");
    let high = document.createElement("p");
    let low = document.createElement("p");
    let humidity = document.createElement("p");
    let sunrise = document.createElement("p");
    let sunset = document.createElement("p");
    let url = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

    image.setAttribute("src",url)
    image.setAttribute("alt", `Portrait of ${data.weather[0].description}`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "100");
    image.setAttribute("height", "100");
    aside.setAttribute("class", "set");

    temperature.textContent = `Temperature: ${data.main.temp} °F`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    high.textContent = `High: ${data.main.temp_max} °F`;
    low.textContent = `Low: ${data.main.temp_min} °F`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    sunrise.textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    sunset.textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
        
    aside.append(temperature, description, high, low, humidity, sunrise, sunset);
        
    currentWeather.append(image, aside);
}

const displayForecast = (forecastData) => {
    // Pick forecasts at 12:00:00 for each day
    const daily = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

    // Take the first 3 days
    const firstThree = daily.slice(0, 3);

    firstThree.forEach(day => {
        let card = document.createElement("div");
        let date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long" });
        let temp = document.createElement("p");

        temp.textContent = `Temp: ${day.main.temp} °F`;

        card.append(date, temp);
        weatherForecast.append(card);
    });
};


async function getTag() {
    try {
        const response = await fetch("data/members.json");
        
        if (response.ok) {
            const data = await response.json()
            const tag = data.filter(item => item.membershipLevel == "silver" || item.membershipLevel == "gold");
            displayTag(tag)
        }
        else {
            throw Error(await response.text());
        }
        
    } catch (error) {
        console.log(error)
    }
}

function shuffle(tag) {
    for (let i = tag.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [tag[i], tag[j]] = [tag[j], tag[i]];
    }
    return tag;
}

const displayTag = (tag) => {

    const shuffled = shuffle(tag)
    const firstThree = shuffled.slice(0, 3);
    firstThree.forEach(item => {
        let name = document.createElement("h2");
        let logo = document.createElement("img");
        let phone = document.createElement("p");
        let address = document.createElement("p");
        let website = document.createElement("p");
        let membership = document.createElement("p");
        let div = document.createElement("div");
        let div2 = document.createElement("div");
        let aside = document.createElement("aside");
        let div3 = document.createElement("div");
        
        logo.setAttribute("src", item.image)
        logo.setAttribute("alt", `Logo of ${item.name}`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "200");
        logo.setAttribute("height", "200");

        div.setAttribute("class", "info");
        div2.setAttribute("class", "image");
        div3.setAttribute("class", "image-info")
        aside.setAttribute("class", "name-div")
        
        name.textContent = item.name;
        phone.textContent = item.phone;
        address.textContent = item.address;
        website.textContent = item.website;
        membership.textContent = item.membershipLeve;


        div.append(phone, address, website, membership);
        div2.append(logo);
        div3.append(div2, div)
        aside.append(name,div3);

        advertisementCards.append(aside)

        
    })
}

getTag()