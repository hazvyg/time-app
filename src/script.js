// First, add these CDN links to your HTML head section:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.43/moment-timezone-with-data.min.js"></script>

const cities = [
  {
    element: document.querySelector(".city-time:nth-child(3)"),
    timezone: "America/Los_Angeles",
  },
  {
    element: document.querySelector(".city-time:nth-child(4)"),
    timezone: "Australia/Sydney",
  },
  {
    element: document.querySelector(".city-time:nth-child(5)"),
    timezone: "Asia/Tokyo",
  },
  {
    element: document.querySelector(".city-time:nth-child(6)"),
    timezone: "Europe/Paris",
  },
];

function updateTime() {
  cities.forEach((city) => {
    const time = moment().tz(city.timezone);
    city.element.querySelector(".time").innerHTML =
      time.format("h:mm:ss") +
      ' <span class="am-pm">' +
      time.format("A") +
      "</span>";
    city.element.querySelector(".date").textContent =
      time.format("MMMM Do YYYY");
  });
}

updateTime();
setInterval(updateTime, 1000);
