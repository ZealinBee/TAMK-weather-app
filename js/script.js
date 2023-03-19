const refreshButton = document.querySelector(".refresh-button");
const infoPageButton = document.querySelector(".info-page-button");
const mainTableBody = document.querySelector(".main-table-body");
const temperatureTableBody = document.querySelector(".temperature-table-body");
const windSpeedTableBody = document.querySelector(".wind-speed-table-body");
refreshButton.addEventListener("click", loadMainWeather);
addEventListener("load", loadMainWeather);

const defaultChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      labels: {
        font: {
          family: "'Poppins', 'sans-serif'",
          size: 14,
        },
        color: "white",
      },
    },
  },
};
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
            <td class="bold">${index}</td>
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
  } else if (page === "wind-speed") {
    loadWindSpeed();
  }
}

function loadTemperature() {
  temperatureTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];

  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature")
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const temperature = Object.values(item.temperature).join("");
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td class="bold">${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${temperature}</td>
        `;
        temperatureTableBody.innerHTML += tr;
        labels.push(time);
        dataset.push(temperature);
      });

      const temperatureChart = document.getElementById("temperature-chart");
      new Chart(temperatureChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature in Celsius",
              data: dataset,
              backgroundColor: ["rgba(226, 146, 177, 0.5)"],
              borderColor: ["rgba(226, 146, 177, 0.8)"],
              borderWidth: 2,
            },
          ],
        },
        options: defaultChartOptions,
      });
    });
}
function loadWindSpeed() {
  windSpeedTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];
  fetch("http://webapi19sa-1.course.tamk.cloud/v1/weather/latest/wind_speed")
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const wind_speed = Object.values(item.wind_speed);
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td class="bold">${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${wind_speed}</td>
        `;
        windSpeedTableBody.innerHTML += tr;
        labels.push(time);
        dataset.push(wind_speed);
      });
    });
    const windSpeedChart = document.getElementById("wind-speed-chart");
      new Chart(windSpeedChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Wind Speed",
              data: dataset,
              backgroundColor: ["rgba(226, 146, 177, 0.5)"],
              borderColor: ["rgba(226, 146, 177, 0.8)"],
              borderWidth: 2,
            },
          ],
        },
        options: defaultChartOptions,
      });
}
