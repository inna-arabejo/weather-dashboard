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
  }
})