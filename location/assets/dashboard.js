// 🔑 CONFIG
const API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.WEATHER_API_KEY : "";
const BASE_URL = "https://api.weatherapi.com/v1/current.json";

// 🚀 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  setupCitySelector();
  // Load default
  fetchCityAQI(CITIES_DATA[0].name);
});

let radarChartInstance = null;
let barChartInstance = null;

// 🏙️ DROPDOWN SETUP
function setupCitySelector() {
  const select = document.getElementById("citySelect");
  CITIES_DATA.forEach(city => {
    const option = document.createElement("option");
    option.value = city.name;
    option.textContent = city.name;
    select.appendChild(option);
  });

  select.addEventListener("change", (e) => {
    fetchCityAQI(e.target.value);
  });
}

// 🌍 FETCH REAL AQI DATA
async function fetchCityAQI(cityName) {
  if (!API_KEY || API_KEY.includes("YOUR")) {
    console.warn("Using Mock Data (No API Key)");
    simulateData(cityName);
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}&q=${cityName}&aqi=yes`);
    const data = await res.json();

    if (data.error) {
      alert("Error fetching data: " + data.error.message);
      return;
    }

    updateDashboard(data);

  } catch (err) {
    console.error("Fetch Error:", err);
    alert("Failed to fetch data.");
  }
}

// 🎨 UPDATE UI
function updateDashboard(data) {
  const aqiData = data.current.air_quality;

  // WeatherAPI returns UK Defra Index (1-10) or US EPA Index (1-6)
  // We'll use US EPA Index for Risk Level
  const epaIndex = aqiData["us-epa-index"];
  const pm25 = Math.round(aqiData.pm2_5);
  const pm10 = Math.round(aqiData.pm10);
  const no2 = Math.round(aqiData.no2);
  const so2 = Math.round(aqiData.so2);
  const co = Math.round(aqiData.co);
  const o3 = Math.round(aqiData.o3);

  // 1. UPDATE STATS
  // We can map PM2.5 roughly to AQI scale for display if needed, 
  // or just show the EPA Index as the main "Score".
  // For visual impact, let's use PM2.5 as the "Main Number" users often associate with AQI in India/Global.
  document.getElementById("aqiValue").innerText = pm25;
  document.getElementById("riskLevel").innerText = getRiskLabel(epaIndex);
  document.getElementById("riskLevel").style.color = getRiskColor(epaIndex);

  // Find Dominant
  const pollutants = { "PM2.5": pm25, "PM10": pm10, "NO2": no2, "SO2": so2, "CO": co };
  const dominant = Object.keys(pollutants).reduce((a, b) => pollutants[a] > pollutants[b] ? a : b);
  document.getElementById("dominantPollutant").innerText = dominant;

  // 2. UPDATE HEALTH & PROS/CONS
  updateHealthStats(epaIndex);
  updateProsCons(epaIndex);

  // 3. UPDATE CHARTS
  updateCharts({ pm25, pm10, no2, so2, o3 });
}

// 🚦 HELPERS
function getRiskLabel(epaIndex) {
  // 1:Good, 2:Moderate, 3:Unhealthy for sensitive, 4:Unhealthy, 5:Very Unhealthy, 6:Hazardous
  switch (epaIndex) {
    case 1: return "Good 🟢";
    case 2: return "Moderate 🟡";
    case 3: return "Sensitive 🟠";
    case 4: return "Unhealthy 🔴";
    case 5: return "Very Unhealthy 🟣";
    case 6: return "Hazardous ☠️";
    default: return "Unknown";
  }
}

function getRiskColor(epaIndex) {
  switch (epaIndex) {
    case 1: return "#4ade80";
    case 2: return "#facc15";
    case 3: return "#fb923c";
    case 4: return "#f87171";
    case 5: return "#c084fc";
    case 6: return "#881337";
    default: return "#fff";
  }
}

function updateHealthStats(epaIndex) {
  const highRisk = epaIndex >= 4;
  const modRisk = epaIndex >= 2;

  document.getElementById("asthmaRisk").innerText = highRisk ? "High ⚠️" : (modRisk ? "Moderate ⚠️" : "Low ✅");
  document.getElementById("copdRisk").innerText = highRisk ? "Critical 🚨" : (modRisk ? "Moderate ⚠️" : "Low ✅");
  document.getElementById("outdoorRec").innerText = highRisk ? "Avoid 🏠" : "Safe 🏃‍♂️";

  const rec = highRisk
    ? "Warning: Air quality is critical. Wear a mask and stay indoors."
    : (modRisk ? "Sensitive individuals should limit prolonged outdoor exertion." : "Air quality is good. Perfect for outdoor activities.");
  document.getElementById("healthRec").innerText = rec;
}

function updateProsCons(epaIndex) {
  const pros = document.getElementById("prosList");
  const cons = document.getElementById("consList");
  pros.innerHTML = "";
  cons.innerHTML = "";

  if (epaIndex <= 2) {
    pros.innerHTML = "<li>Clear visibility</li><li>Safe for exercise</li><li>Low respiratory risk</li>";
    cons.innerHTML = "<li>UV might be high</li>";
  } else {
    pros.innerHTML = "<li>Industrial monitoring active</li>";
    cons.innerHTML = "<li>Haze and poor visibility</li><li>Respiratory irritation risk</li><li>Eye irritation likely</li>";
  }
}

// 📊 CHARTS
function updateCharts(data) {
  updateRadar(data);
  updateBar(data);
}

function updateRadar(data) {
  const ctx = document.getElementById("radarChart").getContext("2d");
  if (radarChartInstance) radarChartInstance.destroy();

  radarChartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Pollutants (µg/m³)',
        data: Object.values(data),
        backgroundColor: 'rgba(56, 189, 248, 0.4)',
        borderColor: '#38bdf8',
        pointBackgroundColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: 'rgba(255,255,255,0.1)' },
          grid: { color: 'rgba(255,255,255,0.1)' },
          pointLabels: { color: '#cbd5e1' },
          ticks: { display: false }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updateBar(data) {
  const ctx = document.getElementById("barChart").getContext("2d");
  if (barChartInstance) barChartInstance.destroy();

  barChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Concentration',
        data: Object.values(data),
        backgroundColor: ['#f87171', '#fb923c', '#facc15', '#4ade80', '#38bdf8'],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#cbd5e1' } },
        x: { grid: { display: false }, ticks: { color: '#cbd5e1' } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

// 🤡 MOCK SIMULATION (Fallback)
function simulateData(cityName) {
  const city = CITIES_DATA.find(c => c.name === cityName);
  if (!city) return;
  const baseVal = city.aqi * 100; // rough mapping

  updateDashboard({
    current: {
      air_quality: {
        "us-epa-index": baseVal > 150 ? 5 : (baseVal > 100 ? 3 : 1),
        pm2_5: baseVal * 0.8,
        pm10: baseVal,
        no2: baseVal * 0.4,
        so2: baseVal * 0.2,
        co: baseVal * 0.1,
        o3: baseVal * 0.3
      }
    }
  });
}
