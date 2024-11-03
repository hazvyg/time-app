const cityData = {
  "America/Los_Angeles": { name: "Los Angeles", flag: "🇺🇸" },
  "Australia/Sydney": { name: "Sydney", flag: "🇦🇺" },
  "Asia/Tokyo": { name: "Tokyo", flag: "🇯🇵" },
  "Europe/Paris": { name: "Paris", flag: "🇫🇷" },
  "Europe/London": { name: "London", flag: "🇬🇧" },
  "Asia/Dubai": { name: "Dubai", flag: "🇦🇪" },
  "Asia/Singapore": { name: "Singapore", flag: "🇸🇬" },
  "Europe/Moscow": { name: "Moscow", flag: "🇷🇺" },
  "America/New_York": { name: "New York", flag: "🇺🇸" },
  "America/Toronto": { name: "Toronto", flag: "🇨🇦" },
};

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
const select = document.querySelector("select");
select.innerHTML = '<option value="">Choose city</option>';
Object.entries(cityData).forEach(([timezone, data]) => {
  const option = document.createElement("option");
  option.value = timezone;
  option.textContent = `${data.name} ${data.flag}`;
  select.appendChild(option);
});

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
let selectedCityIndex = 0;
select.addEventListener("change", (event) => {
  if (!event.target.value) return;

  const timezone = event.target.value;
  const cityInfo = cityData[timezone];

  
  const cityElement = cities[selectedCityIndex].element;
  cityElement.querySelector(
    ".city-name"
    ).textContent = `${cityInfo.name} ${cityInfo.flag}`;
    
  cities[selectedCityIndex].timezone = timezone;

  
  selectedCityIndex = (selectedCityIndex + 1) % 4;

  
  select.value = "";

  
  updateTime();
});

updateTime();
setInterval(updateTime, 1000);
