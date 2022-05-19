var searchHistory = JSON.parse(localStorage.getItem('history')) ?? []
$(document).ready(function () {
  var searchBtn = $('#citySearch');
  var apiKey = 'bdf7503b42372231b8c0d6e9048c045d';
  const prevList = document.getElementById("list")


  searchBtn.on("click", function (e) {
    e.preventDefault()
    var searchValue = $("#search").val()
    searchHistory.push(searchValue)
    localStorage.setItem("history", JSON.stringify(searchHistory))
    $("#currentWeather").empty()
    $("#fiveDayWeather").empty()
    getCurrentWeather(searchValue)

    searchHistory.forEach((item => {
      let historyList = document.createElement('li');
      historyList.textContent = `City: ${item}`;
      prevList.appendChild(historyList)
    }))
  })

  async function getCurrentWeather(searchValue) {
    var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}&units=imperial`;
    console.log('requestUrl', requestUrl)
    let data = await (await fetch(requestUrl)).json()
    const coords = {
        lat: data.coord.lat,
        lon: data.coord.lon
    };

    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`
    let data5Day = await (await fetch(fiveDayUrl)).json()

    console.log("data from api", data)

    let cityName = data.name;
    let temp = data.main.temp;
    let wind = data.wind.speed;
    let humiditiy = data.main.humidity;
    let uvi = data5Day.daily[0].uvi

    let card = $("<div class='card'>");
    let cardHeader = $("<div class='card-header'>");
    let cardBody = $("<div class='card-body'>");
    let currentIcon = $("<img>").attr("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    let tempEl = $("<p class='card-text'>").text("Temperature: " + temp)
    let windEl = $("<p class='card-text'>").text("Wind Speed: " + wind + " MPH")
    let humidEl = $("<p class='card-text'>").text("Humidity: " + humiditiy + "%")
    let nameEl = $("<p class='card-title'>").text(cityName)
    let bgColor = "green"
    if (uvi >= 6 && uvi <= 10) bgColor = "yellow"
    if (uvi >= 11) bgColor = "red"
    let uviEl = $("<p class='card-text'>")
        .text(`UV Index: ${uvi}`)
        .css({
            "color": bgColor,
            "background-color": "black"
        })
  }
})