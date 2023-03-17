const mainTableBody = document.querySelector(".main-table-body");
const refreshButton = document.querySelector(".refresh-button");
const infoPageButton = document.querySelector(".info-page-button");
const mainPage = document.querySelector(".main-page");  

refreshButton.addEventListener("click", loadMainWeather);
addEventListener("load", loadMainWeather);
infoPageButton.addEventListener("click", loadInfoPage)

function loadMainWeather() {
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
        console.log(type);
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

function loadInfoPage() {
  mainPage.classList.add("hidden");
}