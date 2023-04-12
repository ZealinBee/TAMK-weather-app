const refreshButtons = document.querySelectorAll(".refresh-button");
const infoPageButton = document.querySelector(".info-page-button");
const mainTableBody = document.querySelector(".main-table-body");
const temperatureTableBody = document.querySelector(".temperature-table-body");
const windSpeedTableBody = document.querySelector(".wind-speed-table-body");
const rainTableBody = document.querySelector(".rain-table-body");
const windDirectionTableBody = document.querySelector(
  ".wind-direction-table-body"
);
const lightTableBody = document.querySelector(".light-table-body");
let interval = "20";
let currentPage = "main-page";
let tempCanva;
let windSpeedCanva;
let rainCanva;
let windDirectionCanva;
let lightCanva;
const intervalSelect = document.getElementById("table-filter");

addEventListener("load", loadMainWeather);

const defaultChartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: "#FFF",
      },
    },
    x: {
      ticks: {
        color: "#FFF",
      },
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
        const value = Object.values(item.data)[0].toFixed(2);

        index += 1;
        if (index < 10) index = `0${index}`;
        if (type === "Air_pres_1") {
          type = "Air pressure";
        }
        if (type === "BMP_temp_1") {
          type = "temperature";
        }
        if (type === "DHT11_hum_1") {
          type = "humidity";
        }
        if (type === "DHT11_temp_1") {
          type = "temperature";
        }
        if (type === "DS1820_temp_1") {
          type = "temperature";
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
  const filter = document.querySelector("#table-filter");

  filter.style.display = "block";
  pages.forEach((item) => {
    item.style.display = "none";
  });
  const selectedPage = document.querySelector(`.${page}`);
  selectedPage.style.display = "block";
  currentPage = page;
  if (page === "temperature") {
    loadTemperature();
  } else if (page === "wind-speed") {
    loadWindSpeed();
  } else if (page === "rain") {
    loadRain();
  } else if (page === "wind-direction") {
    loadWindDirection();
  } else if (page === "light") {
    loadLight();
  } else if (page === "authors-info") {
    filter.style.display = "none";
  } else if (page === "main-page") {
    filter.style.display = "none";
  }
  intervalSelect.value = "now";
}

function loadTemperature() {
  temperatureTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];

  fetch(
    `http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/${interval}`
  )
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
      if (tempCanva) tempCanva.destroy();
      let temperatureChart = document.getElementById("temperature-chart");
      tempCanva = new Chart(temperatureChart, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Temperature",
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
  interval = "20";
}
function loadWindSpeed() {
  windSpeedTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];
  fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/${interval}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const wind_speed = Object.values(item.wind_speed).join("");
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
  if (windSpeedCanva) windSpeedCanva.destroy();
  windSpeedCanva = new Chart(windSpeedChart, {
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
  interval = "20";
}
function loadRain() {
  rainTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];
  fetch(`https://webapi19sa-1.course.tamk.cloud/v1/weather/rain/${interval}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const rain = Object.values(item.rain).join("");
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td class="bold">${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${rain}</td>
        `;
        rainTableBody.innerHTML += tr;
        labels.push(time);
        dataset.push(rain);
      });
    });
  const rainChart = document.getElementById("rain-chart");
  if (rainCanva) rainCanva.destroy();
  rainCanva = new Chart(rainChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Rain",
          data: dataset,
          backgroundColor: ["rgba(226, 146, 177, 0.5)"],
          borderColor: ["rgba(226, 146, 177, 0.8)"],
          borderWidth: 2,
        },
      ],
    },
    options: defaultChartOptions,
  });
  interval = "20";
}
async function loadWindDirection() {
  windDirectionTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];
  await fetch(
    `https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/${interval}`
  )
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const wind_direction = Object.values(item.wind_direction).join("");
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td class="bold">${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${wind_direction}</td>
        `;
        windDirectionTableBody.innerHTML += tr;
        labels.push(time);
        dataset.push(wind_direction);
      });
    });
  const windDirectionChart = document.getElementById("wind-direction-chart");
  if (windDirectionCanva) windDirectionCanva.destroy();
  windDirectionCanva = new Chart(windDirectionChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Wind Direction",
          data: dataset,
          backgroundColor: ["rgba(226, 146, 177, 0.5)"],
          borderColor: ["rgba(226, 146, 177, 0.8)"],
          borderWidth: 2,
        },
      ],
    },
    options: defaultChartOptions,
  });
  interval = "20";
}
function loadLight() {
  lightTableBody.innerHTML = "";
  const labels = [];
  const dataset = [];
  fetch(`https://webapi19sa-1.course.tamk.cloud/v1/weather/light/${interval}`)
    .then((response) => response.json())
    .then((data) => {
      data.map((item, index) => {
        const date = item.date_time.slice(0, 10);
        const time = item.date_time.slice(11, 19);
        const light = Object.values(item.light).join("");
        index += 1;
        if (index < 10) index = `0${index}`;
        const tr = `
        <td class="bold">${index}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${light}</td>
        `;
        lightTableBody.innerHTML += tr;
        labels.push(time);
        dataset.push(light);
      });
    });

  const lightChart = document.getElementById("light-chart");
  if (lightCanva) lightCanva.destroy();

  lightCanva = new Chart(lightChart, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Light",
          data: dataset,
          backgroundColor: ["rgba(226, 146, 177, 0.5)"],
          borderColor: ["rgba(226, 146, 177, 0.8)"],
          borderWidth: 2,
        },
      ],
    },
    options: defaultChartOptions,
  });
  interval = "20";
}

refreshButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const refreshTarget = button.getAttribute("data-refresh");
    switch (refreshTarget) {
      case "main-table":
        loadMainWeather();
        break;
      case "temperature-table":
        loadTemperature();
        break;
      case "wind-speed-table":
        loadWindSpeed();
        break;
      case "rain-table":
        loadRain();
        break;
      case "wind-direction-table":
        loadWindDirection();
        break;
    }
  });
});

intervalSelect.addEventListener("change", function () {
  const option = intervalSelect.value;
  switch (option) {
    case "now":
      if (currentPage === "temperature" || currentPage === "wind-speed") {
        interval = "20";
      } else if (currentPage === "rain" || currentPage === "wind-direction") {
        interval = "25";
      }
      break;
    case "24-hours":
      interval = "24h";
      break;
    case "48-hours":
      interval = "48h";
      break;
    case "72-hours":
      interval = "72h";
      break;
    case "1-week":
      interval = "1w";
      break;
  }
  switch (currentPage) {
    case "temperature":
      loadTemperature();
      break;
    case "wind-speed":
      loadWindSpeed();
      break;
    case "rain":
      loadRain();
      break;
    case "wind-direction":
      loadWindDirection();
      break;
    case "light":
      loadLight();
      break;
  }
});
