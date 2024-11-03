const cityData = {
 
     "America/Los_Angeles": { 
        name: "Los Angeles", 
        flag: "🇺🇸",
        link: "https://www.timeanddate.com/worldclock/usa/los-angeles"
    },
    "Australia/Sydney": { 
        name: "Sydney", 
        flag: "🇦🇺",
        link: "https://www.timeanddate.com/worldclock/australia/sydney"
    },
    "Asia/Tokyo": { 
        name: "Tokyo", 
        flag: "🇯🇵",
        link: "https://www.timeanddate.com/worldclock/japan/tokyo"
    },
    "Europe/Paris": { 
        name: "Paris", 
        flag: "🇫🇷",
        link: "https://www.timeanddate.com/worldclock/france/paris"
    },
    "Europe/London": { 
        name: "London", 
        flag: "🇬🇧",
        link: "https://www.timeanddate.com/worldclock/uk/london"
    },
    "Asia/Dubai": { 
        name: "Dubai", 
        flag: "🇦🇪",
        link: "https://www.timeanddate.com/worldclock/uae/dubai"
    },
    "Asia/Singapore": { 
        name: "Singapore", 
        flag: "🇸🇬",
        link: "https://www.timeanddate.com/worldclock/singapore/singapore"
    }
};
  const container = document.querySelector(".container");
const currentLocationHTML = `
    <div class="city-time current-location">
        <div class="city-info">
            <div>
                <h2 class="city-name">Your Location 📍</h2>
                <p class="date"></p>
            </div>
        </div>
        <div class="time"></div>
    </div>
`;
container.insertBefore(
    document.createRange().createContextualFragment(currentLocationHTML),
    container.querySelector(".city-time")
);

const cities = [
  {
    element: document.querySelector(".current-location"),
    timezone: moment.tz.guess(), // Gets user's timezone
  },
  {
    element: document.querySelector(".city-time:nth-child(4)"),
    timezone: "America/Los_Angeles",
  },
  {
    element: document.querySelector(".city-time:nth-child(5)"),
    timezone: "Australia/Sydney",
  },
  {
    element: document.querySelector(".city-time:nth-child(6)"),
    timezone: "Asia/Tokyo",
  },
  {
    element: document.querySelector(".city-time:nth-child(7)"),
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
  cities.forEach((city, index) => {
    const time = moment().tz(city.timezone);
    const element = city.element;

    
    element.querySelector(".time").innerHTML =
      time.format("h:mm:ss") +
      ' <span class="am-pm">' +
      time.format("A") +
      "</span>";

    
    element.querySelector(".date").textContent = time.format("MMMM Do YYYY");

    
    if (index !== 0 && cityData[city.timezone]) {
      const cityName = element.querySelector(".city-name");
      const cityInfo = cityData[city.timezone];
      cityName.innerHTML = `<a href="${cityInfo.link}" target="_blank">${cityInfo.name} ${cityInfo.flag}</a>`;
    }
  });
}


let selectedCityIndex = 1; 
select.addEventListener("change", (event) => {
  if (!event.target.value) return;

  const timezone = event.target.value;
  const cityInfo = cityData[timezone];

  
  const cityElement = cities[selectedCityIndex].element;
  cityElement.querySelector(
    ".city-name"
  ).innerHTML = `<a href="${cityInfo.link}" target="_blank">${cityInfo.name} ${cityInfo.flag}</a>`;

 
  cities[selectedCityIndex].timezone = timezone;

  
  selectedCityIndex = (selectedCityIndex % 4) + 1;

  
  select.value = "";

  
  updateTime();
});


const style = document.createElement("style");
style.textContent = `
    .city-name a {
        text-decoration: none;
        color: inherit;
        transition: opacity 0.2s;
    }
    .city-name a:hover {
        opacity: 0.7;
    }
    .current-location {
        background: linear-gradient(to right, rgba(110, 142, 251, 0.1), rgba(167, 119, 227, 0.1));
        border-left: 3px solid #6e8efb;
    }
`;
document.head.appendChild(style);
