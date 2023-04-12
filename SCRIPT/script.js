// API KEY AND OPENWEATHER URL 
const apiKey = "869de0f81d33914bddbbba5aa7b02780"; // PUT YOUR KEY
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// SELECTING THE INPUT QUERY
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");

// MAIN FUCNTION
async function weathercheck(city) {
    const response = await fetch(apiurl + city + `&appid=${apiKey}`)

    // IF THE ENTERED VALUE IS INVALID
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    // IF THE ENTERED VALUE IS VALID
    else {
        var data = await response.json();

        console.log(data);

        // CHANGING THE SHOWCASE DATA
        document.querySelector(".city").innerHTML = data.name + ", " + data.sys.country;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
        document.querySelector(".pressure").innerHTML = data.main.pressure + "bar";
        document.querySelector(".type").innerHTML = data.weather[0].main;

        // SELECTING THE TYPE OF IMAGE TO SHOW
        // ACCORDING TO THE WEATHER
        if (data.weather[0].main == "Clear") {
            icon.src = "images/clear.png";
        }
        else if (data.weather[0].main == "Clouds") {
            icon.src = "images/clouds.png";
        }
        else if (data.weather[0].main == "Rain") {
            icon.src = "images/rain.png";
        }
        else if (data.weather[0].main == "Mist") {
            icon.src = "images/mist.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            icon.src = "images/drizzle.png";
        }

        // FOR DISPLAYING TIME AND DAY OF THE ENTERED AREA
        time = new Date();
        a = time.getHours();
        b = time.getMinutes();

        let yesterday = new Date();
        let tomorrow = new Date();
        if (b > 30) {
            a = a - 5;
        }
        else if (b <= 30) {
            a = a - 6;
        }
        a = Math.ceil(a + (data.timezone / 3600));

        let options = { weekday: 'long' }
        if (a < 0) {
            a = a + 24;
            meridian = "PM";
            yesterday.setDate(time.getDate() - 1);
            // options++;
            document.getElementById("date").innerHTML = yesterday.toLocaleDateString(undefined, options) + ", " + a + " " + meridian;
        }
        else if (a > 23) {
            a = a - 24;
            meridian = "AM";
            tomorrow.setDate(time.getDate() + 1);
            document.getElementById("date").innerHTML = tomorrow.toLocaleDateString(undefined, options) + ", " + a + " " + meridian;
        }
        else if (a >= 12) {
            a = a - 12;
            meridian = "PM";
            document.getElementById("date").innerHTML = time.toLocaleDateString(undefined, options) + ", " + a + " " + meridian;
        }
        else if (a < 12) {
            meridian = "AM";
            document.getElementById("date").innerHTML = time.toLocaleDateString(undefined, options) + ", " + a + " " + meridian;
        }
        console.log(time);

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
        document.querySelector(".card").style.paddingBottom = "15px";

        // FOR DYNAMIC BACKGROUND IMAGE
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + data.weather[0].main + "')"
    }
}

// CALLING THE FUNCTION WHEN SEARCH IS CLICKED
searchBtn.addEventListener("click", () => {
    let city = searchBox.value;
    weathercheck(city);
})