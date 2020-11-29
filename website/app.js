/* Global Variables / API Structure */
/* Example : weather?zip=10001&units=imperial&appid=b717d3... for the temperature in NY, US in fahrenheit */
const url = "http://api.openweathermap.org/data/2.5/weather?zip=";
const tempUnit = "&units=";
const apiKey = ""; /* Enter your API key here */

/* Create a new date instance dynamically with JS */
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
////// The month function is 0 indexed for some stupid reason so I had to fix it by incrementation. //////

/* Event Listeners */
document.getElementById("generate").addEventListener("click", addJournal);

/* Event Listeners Functions */
function addJournal() {
  const zip = document.getElementById("zip").value;
  document.getElementById("zip").value = ""; // Reset the zip code field.
  const feelings = document.getElementById("feelings").value;
  document.getElementById("feelings").value = ""; // Reset the journal field.
  let temp = tempUnit + "imperial";
  let tempAbbrv = "°F";
  if (document.getElementById("celsius").checked) {
    temp = tempUnit + "metric";
    tempAbbrv = "°C";
  } // Call The Weather Function
  getWeatherData(url, zip, temp, apiKey)
    .then(function (requestFeed) {
      const fullTemp = Math.round(requestFeed.main.temp) + tempAbbrv;
      const city = requestFeed.name;
      const condition = requestFeed.weather[0].main;
      postData("/add", { date: newDate, city: city, condition: condition, temp: fullTemp, feelings: feelings });
    }).then(() => {
      updateUI();
    });
}

/* Async API Call */
const getWeatherData = async (url, zip, tempunit, key) => {
  const response = await fetch(url + zip + tempunit + key);
  try {
    const requestFeed = await response.json();
    return requestFeed;
  } catch (error) {
    console.log("An error occurred ", error);
  }
};

/* Async POST Function */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Async Fetch From Backend And Update The UI */
const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    if (Object.keys(allData).length === 0) {
      return;
    } //If no entries exist it will skip trying to load the last entry.
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("city").innerHTML = allData.city;
    document.getElementById("condition").src = `images/${allData.condition}.png`; // Dynamically load the image.
    document.getElementById("temp").innerHTML = allData.temp;
    let feelings = allData.feelings;
    if (allData.feelings.length > 90) // Limit how much of the journal to show to not ruin formatting.
      feelings = allData.feelings.substring(0, 90) + "...";
    document.getElementById("content").innerHTML = feelings;
  } catch (error) {
    console.log("error", error);
  }
}
updateUI(); // Call the method when opening the page to load the last entry.