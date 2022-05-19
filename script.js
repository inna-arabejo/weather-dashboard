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
})