const refreshButton = document.querySelector(".refresh-button");
const infoPageButton = document.querySelector(".info-page-button");
const mainTableBody = document.querySelector(".main-table-body");
const temperatureTableBody = document.querySelector(".temperature-table-body");
refreshButton.addEventListener("click", loadMainWeather);
addEventListener("load", loadMainWeather);

function loadMainWeather() {
  const mainTableBody = document.querySelector(".main-table-body");

  mainTableBody.innerHTML = "";
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather")
    .then((response) => response.json())
    .then((data) => {
      let latestData = data.slice(0, 30);
      latestData = latestData.reverse();
      latestData.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        let type = Object.keys(item.data).join();
        const value = Object.values(item.data);
        index += 1;
        if (index < 10) index = `0${index}`;
        if (type === "Air_pres_1") {
          type = "Air pressure";
        }
        if (type.includes("_")) {
          type = type.replace("_", " ");
        }

        const tr = `
            <td>${index}</td>
            <td class="capitalize">${type}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td>${value}</td>
            `;
        mainTableBody.innerHTML += tr;
      });
    });
}

function showPage(page) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((item) => {
    item.style.display = "none";
  });
  const selectedPage = document.querySelector(`.${page}`);
  selectedPage.style.display = "block";
  if (page === "temperature") {
    loadTemperature();
  }
}

function loadTemperature() {
  temperatureTableBody.innerHTML = "";
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature")
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const temperature = Object.values(item.temperature);
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td>${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${temperature}</td>
        `;
        temperatureTableBody.innerHTML += tr;
      });
    });
}
